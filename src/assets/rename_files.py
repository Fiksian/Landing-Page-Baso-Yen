import os

def rename_files_with_prefix(directory, prefix, method='prefix'):
    """
    Menambahkan awalan (prefix) atau akhiran (suffix) ke semua nama file di dalam direktori.

    Args:
        directory (str): Jalur ke folder tempat file berada.
        prefix (str): String yang ingin ditambahkan ke nama file.
        method (str): 'prefix' untuk menambahkan di awal, atau 'suffix' untuk menambahkan di akhir.
    """
    # Pastikan direktori ada
    if not os.path.isdir(directory):
        print(f"Error: Direktori '{directory}' tidak ditemukan.")
        return

    print(f"Memulai proses penamaan ulang di: {directory}")
    
    count = 0
    
    # Iterasi melalui semua item di direktori
    for filename in os.listdir(directory):
        # Abaikan subfolder, hanya proses file
        old_file_path = os.path.join(directory, filename)
        
        if os.path.isfile(old_file_path):
            try:
                # Pisahkan nama file dari ekstensi
                name, ext = os.path.splitext(filename)
                
                new_filename = ""
                
                # Tentukan nama file baru berdasarkan metode
                if method == 'prefix':
                    # Contoh: 'nama_anda_filelama.jpg'
                    new_filename = f"{prefix}_{name}{ext}"
                elif method == 'suffix':
                    # Contoh: 'filelama_nama_anda.jpg'
                    new_filename = f"{name}_{prefix}{ext}"
                else:
                    print(f"Error: Metode '{method}' tidak valid. Gunakan 'prefix' atau 'suffix'.")
                    return

                # Buat jalur file baru
                new_file_path = os.path.join(directory, new_filename)
                
                # Pastikan nama file baru tidak sama dengan yang lama (walaupun seharusnya tidak)
                if old_file_path != new_file_path:
                    # Ganti nama file
                    os.rename(old_file_path, new_file_path)
                    print(f"Diubah: '{filename}' -> '{new_filename}'")
                    count += 1
                
            except Exception as e:
                print(f"Gagal memproses file {filename}: {e}")

    print(f"\n✅ Selesai. Total {count} file berhasil diubah namanya.")


# --- KONFIGURASI PENGGUNA ---

# 1. Tentukan folder target Anda
# Contoh: Jika Anda ingin memproses folder bernama 'gambar' di direktori yang sama
FOLDER_TARGET = 'foto baru'

# 2. Tentukan kata/string yang ingin ditambahkan
NAMA_TAMBAHAN = 'foto'

# 3. Pilih metode: 'prefix' (di awal) atau 'suffix' (di akhir)
METODE_PENEMPATAN = 'prefix' 

# --- JALANKAN FUNGSI ---
if __name__ == "__main__":
    rename_files_with_prefix(
        directory=FOLDER_TARGET, 
        prefix=NAMA_TAMBAHAN, 
        method=METODE_PENEMPATAN
    )
