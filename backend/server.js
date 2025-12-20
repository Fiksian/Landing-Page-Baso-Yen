const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================================
// 1. SETUP MIDDLEWARE & UPLOADS
// ======================================

// Pastikan folder uploads tersedia secara fisik
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'https://unsaturable-neoma-sheathy.ngrok-free.dev'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());
// Membuat folder uploads dapat diakses via URL (e.g. localhost:5000/uploads/file.jpg)
app.use('/uploads', express.static(uploadPath));

// ======================================
// 2. KONEKSI DATABASE
// ======================================

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('✅ Koneksi database MySQL berhasil!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Gagal koneksi ke database:', err.message);
        process.exit(1); 
    });

// ======================================
// 3. KONFIGURASI MULTER
// ======================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Nama file unik: timestamp-namafileasli
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Batas 10MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) return cb(null, true);
        cb(new Error("Hanya file gambar (JPG, PNG, WEBP) yang diizinkan!"));
    }
});

// ======================================
// 4. API PRODUK (DENGAN MULTER)
// ======================================

// GET: Ambil semua produk (Public)
app.get('/api/public/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST: Tambah Produk Baru
app.post('/api/products', (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });

        try {
            const { name, description, price, original_price, discount } = req.body;
            const image_url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

            const [result] = await pool.query(
                'INSERT INTO products (name, description, price, original_price, discount, image_url) VALUES (?, ?, ?, ?, ?, ?)',
                [name, description, price, original_price, discount, image_url]
            );
            res.status(201).json({ success: true, id: result.insertId });
        } catch (dbErr) {
            res.status(500).json({ success: false, message: dbErr.message });
        }
    });
});

// PUT: Update Produk & Hapus Gambar Lama jika ada yang baru
app.put('/api/products/:id', (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });

        try {
            const { id } = req.params;
            const { name, description, price, original_price, discount } = req.body;

            const [rows] = await pool.query('SELECT image_url FROM products WHERE id = ?', [id]);
            let current_image = rows[0]?.image_url;

            if (req.file) {
                // Jika user upload gambar baru, hapus gambar lama dari folder
                if (current_image) {
                    const oldFileName = current_image.split('/').pop();
                    const oldPath = path.join(uploadPath, oldFileName);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }
                current_image = `http://localhost:5000/uploads/${req.file.filename}`;
            }

            await pool.query(
                'UPDATE products SET name=?, description=?, price=?, original_price=?, discount=?, image_url=? WHERE id=?',
                [name, description, price, original_price, discount, current_image, id]
            );
            res.json({ success: true, message: 'Produk berhasil diperbarui' });
        } catch (error) { res.status(500).json({ error: error.message }); }
    });
});

// DELETE: Hapus Produk & File Gambarnya
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT image_url FROM products WHERE id = ?', [id]);
        
        if (rows.length > 0 && rows[0].image_url) {
            const fileName = rows[0].image_url.split('/').pop();
            const filePath = path.join(uploadPath, fileName);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ success: true, message: 'Produk dihapus' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Endpoint untuk menerima data dari formulir Kontak B2B
app.post('/api/b2b-request', async (req, res) => {
    const { 
        nama_lengkap, 
        nama_perusahaan, 
        email, 
        whatsapp_number, 
        jenis_usaha, 
        pesan_kebutuhan 
    } = req.body;

    // Validasi dasar
    if (!nama_lengkap || !email || !pesan_kebutuhan) {
        return res.status(400).json({ 
            success: false, 
            message: 'Data nama, email, dan pesan harus diisi.' 
        });
    }

    // Query SQL untuk INSERT data
    const sql = `
        INSERT INTO permintaan_b2b 
        (nama_lengkap, nama_perusahaan, email, whatsapp_number, jenis_usaha, pesan_kebutuhan) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        nama_lengkap, 
        nama_perusahaan, 
        email, 
        whatsapp_number, 
        jenis_usaha, 
        pesan_kebutuhan
    ];

    try {
        const [result] = await pool.query(sql, values);
        
        console.log(`Permintaan B2B baru diterima. ID: ${result.insertId}`);
        
        return res.status(201).json({ 
            success: true, 
            message: 'Permintaan Anda berhasil dikirim!',
            requestId: result.insertId
        });

    } catch (error) {
        console.error('Gagal menyimpan data B2B:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server saat menyimpan data.' 
        });
    }
});

// ======================================
// 4. ENDPOINT ADMIN: MENGAMBIL DATA (READ)
// ======================================

app.get('/api/b2b-data', async (req, res) => {
    try {
        // Hanya mengambil kolom yang relevan
        const [rows] = await pool.query('SELECT id, tanggal_kirim, nama_lengkap, nama_perusahaan, email, whatsapp_number, jenis_usaha, pesan_kebutuhan, status_proses FROM permintaan_b2b ORDER BY id DESC');
        
        return res.status(200).json({ 
            success: true, 
            data: rows 
        });

    } catch (error) {
        console.error('Gagal mengambil data B2B:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server saat mengambil data.' 
        });
    }
});


// ======================================
// 5. ENDPOINT ADMIN: MEMPERBARUI DATA (UPDATE)
// ======================================

app.put('/api/b2b-data/:id', async (req, res) => {
    const { id } = req.params;
    const { status_proses, notes } = req.body; // Contoh hanya mengizinkan update status dan notes

    if (!status_proses) {
        return res.status(400).json({ success: false, message: 'Status proses harus diisi.' });
    }

    // Query untuk update (Tambahkan kolom notes jika ada di tabel Anda)
    const sql = `
        UPDATE permintaan_b2b
        SET status_proses = ?
        WHERE id = ?
    `;
    const values = [status_proses, id];

    try {
        const [result] = await pool.query(sql, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'ID permintaan tidak ditemukan.' });
        }
        
        return res.status(200).json({ 
            success: true, 
            message: `Permintaan ID ${id} berhasil diperbarui.`
        });

    } catch (error) {
        console.error('Gagal memperbarui data B2B:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan pada server saat memperbarui data.' 
        });
    }
});

// Endpoint untuk menghapus data B2B berdasarkan ID
app.delete('/api/b2b-data/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM permintaan_b2b WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
        }
        
        res.json({ success: true, message: `Data ID ${id} berhasil dihapus.` });
    } catch (error) {
        console.error('Gagal menghapus data B2B:', error);
        res.status(500).json({ success: false, message: 'Gagal menghapus data dari server.' });
    }
});

// ======================================
// 6. LOGIN & DEFAULT ROUTE
// ======================================

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            res.json({ success: true, token: 'fake-jwt-token' });
        } else {
            res.status(401).json({ message: 'Username atau Password salah' });
        }
    } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/', (req, res) => {
    res.send(`Server Express Baso Yen berjalan di port ${PORT}. Status: OK`);
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});