Landing Page & Admin Dashboard Baso Yen 🍜

Repositori ini berisi kode sumber untuk landing page resmi Baso Yen, lengkap dengan fitur formulir kemitraan B2B dan Dashboard Admin untuk manajemen data produk serta prospek bisnis.
📋 Fitur Utama
🌐 Landing Page (User Side)

    Endpoint = '/'

    Katalog Produk: Menampilkan daftar produk unggulan Baso Yen.

    Formulir Kemitraan B2B: Calon mitra bisnis dapat mengirimkan permintaan kerja sama secara langsung.

    WhatsApp Integration: Tombol bantuan yang terhubung langsung ke layanan pelanggan.

🔐 Admin Dashboard (Restricted)

    Endpoint = '/admin'

    Sistem Autentikasi: Login aman untuk akses administrator.

    Manajemen Produk (CRUD): Tambah, lihat, edit, dan hapus data produk dari database.

    Manajemen Permintaan B2B:

        Pemantauan semua pesan masuk dari calon mitra.

        Update status proses (Baru, Diproses, Selesai, Diabaikan).

        Fitur hapus data permintaan.

        Detail pesan kebutuhan melalui modal pop-up.

        Akses cepat ke WhatsApp calon mitra.

🛠️ Teknologi yang Digunakan
Frontend

    React.js (Library utama)

    React Bootstrap (Framework UI & Styling)

    React Router Dom (Sistem Navigasi)

    Fetch API (Komunikasi Data)

Backend

    Node.js (Runtime environment)

    Express.js (Framework web server)

    MySQL2 (Sistem Manajemen Database)

    Cors & Body-Parser (Middleware)
    
    Multer

🚀 Instalasi & Persiapan
1. Prasyarat

Pastikan Anda sudah menginstal:

    Node.js

    MySQL

2. Setup Database

Buat database baru di MySQL dan buat tabel yang diperlukan (contoh: permintaan_b2b dan produk).
SQL

CREATE DATABASE IF NOT EXISTS Basoyen;
USE Basoyen;

-- 1. Tabel Admin (Untuk Login)
CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Simpan hash password di sini
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Produk
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,         -- Harga final setelah diskon
    original_price DECIMAL(12, 2) NOT NULL, -- Harga asli sebelum diskon
    discount INT DEFAULT 0,                 -- Persentase diskon
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel B2B (Data Kontak)
CREATE TABLE IF NOT EXISTS permintaan_b2b (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tanggal_kirim TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nama_lengkap VARCHAR(100) NOT NULL,
    nama_perusahaan VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    whatsapp_number VARCHAR(20) NOT NULL,
    jenis_usaha VARCHAR(50) NOT NULL,
    pesan_kebutuhan TEXT NOT NULL,
    status_proses ENUM('Baru', 'Diproses', 'Selesai', 'Diabaikan') DEFAULT 'Baru'
);

-- Insert User Admin Default (Password: admin123 - Harap dihash jika produksi)
INSERT INTO admin (username, password) VALUES ('admin', 'admin123');

3. Konfigurasi Backend

    Masuk ke direktori server: cd backend

    Instal dependensi: npm install

    Sesuaikan koneksi database di server.js atau file konfigurasi .env.

    Jalankan server: node server.js (Running di port 5000)

4. Konfigurasi Frontend

    Masuk ke direktori utama: cd frontend

    Instal dependensi: npm install

    Jalankan aplikasi: npm start (Running di port 3000)

📸 Tampilan Dashboard Admin

Dashboard dirancang dengan sidebar navigation yang responsif untuk memudahkan admin berpindah antar fungsi:

    📦 Daftar Produk: Manajemen katalog.

    ➕ Tambah Produk: Input data baru.

    🤝 Permintaan B2B: Tabel leads pelanggan yang rapi dengan indikator status berbasis warna (Badge).


Project oleh Fiksian Dibuat untuk kebutuhan Tugas OJT.
