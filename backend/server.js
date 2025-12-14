const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Menggunakan mysql2 dengan promises
require('dotenv').config(); // Untuk memuat variabel dari .env

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// ======================================
// 1. SETUP MIDDLEWARE
// ======================================

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

app.use(cors({
    origin: function (origin, callback) {
        // Izinkan permintaan tanpa origin (seperti aplikasi mobile, atau permintaan yang sama asalnya)
        if (!origin) return callback(null, true); 
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            // callback(new Error(msg), false); // Opsional: mengembalikan error
            callback(null, false);
        } else {
            callback(null, true);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Pastikan POST diizinkan
    credentials: true,
    optionsSuccessStatus: 204 // Status yang diharapkan untuk preflight OPTIONS request
}));

// Middleware untuk parsing JSON body
app.use(express.json());

// ======================================
// 2. KONEKSI DATABASE
// ======================================

// Buat pool koneksi database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Tes koneksi database
pool.getConnection()
    .then(connection => {
        console.log('✅ Koneksi database MySQL berhasil!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Gagal koneksi ke database:', err.message);
        // Hentikan aplikasi jika koneksi database gagal
        process.exit(1); 
    });


// ======================================
// 3. ENDPOINT API
// ======================================

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

// Endpoint default
app.get('/', (req, res) => {
    res.send(`Server Express Baso Yen berjalan di port ${PORT}. Status: OK`);
});


// ======================================
// 6. START SERVER
// ======================================

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`   (Pastikan Anda menjalankan database MySQL)`);
});