CREATE DATABASE IF NOT EXISTS Basoyen;

USE Basoyen;

-- Skrip SQL untuk membuat tabel yang menampung data dari Formulir Kontak/B2B
-- Nama tabel: permintaan_b2b

CREATE TABLE permintaan_b2b (
    -- Kolom Identifikasi & Waktu
    id INT PRIMARY KEY AUTO_INCREMENT, -- ID unik untuk setiap permintaan (Primary Key)
    tanggal_kirim TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Waktu saat data dimasukkan

    -- Data Pribadi & Perusahaan (Input Formulir)
    nama_lengkap VARCHAR(100) NOT NULL, -- Nama Lengkap pengirim (dari 'Nama Lengkap')
    nama_perusahaan VARCHAR(150) NOT NULL, -- Nama perusahaan/usaha (dari 'Nama Perusahaan')
    
    -- Data Kontak
    email VARCHAR(100) NOT NULL, -- Alamat email (dari 'Email')
    whatsapp_number VARCHAR(20) NOT NULL, -- Nomor WhatsApp (dari 'No. WhatsApp')

    -- Detail Bisnis
    jenis_usaha VARCHAR(50) NOT NULL, -- Jenis usaha (dari 'Jenis Usaha', menggunakan nilai yang dipilih)
    
    -- Pesan / Kebutuhan
    pesan_kebutuhan TEXT NOT NULL, -- Detail kebutuhan produk/pesan (dari 'Pesan / Kebutuhan Produk')

    -- Status Internal (Opsional, untuk melacak proses tindak lanjut)
    status_proses ENUM('Baru', 'Diproses', 'Selesai', 'Diabaikan') DEFAULT 'Baru'
);

-- Contoh Indeks (Opsional, untuk mempercepat pencarian)
CREATE INDEX idx_perusahaan_email ON permintaan_b2b (nama_perusahaan, email);