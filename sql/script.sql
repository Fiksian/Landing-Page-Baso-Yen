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