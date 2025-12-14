import os
import re

# --- FUNGSI PEMBANTU ---

def to_camel_case(snake_str):
    """
    Membersihkan string dan mengonversinya menjadi camelCase.
    Juga menambahkan prefix 'a' jika string dimulai dengan angka, agar valid sebagai variabel JS.
    """
    clean_str = re.sub(r'[^a-zA-Z0-9_]', '_', snake_str)
    components = [c for c in clean_str.split('_') if c]

    if not components:
        return ""

    first_part = components[0]
    if first_part and first_part[0].isdigit():
        first_part = 'a' + first_part
        
    return first_part.lower() + ''.join(x.title() for x in components[1:])


# --- FUNGSI UTAMA ---

def generate_js_assets_file_grouped(image_folder, output_file, additional_exports=None):
    """
    Memindai folder gambar dan semua subfolder, menghasilkan file JavaScript 
    dengan aset yang diimpor, dibersihkan namanya, dan dikelompokkan berdasarkan nama subfolder.
    """
    
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.jfif')
    import_lines = []
    grouped_assets = {} 
    
    # Ambil nama dasar dari folder gambar (misalnya 'Photo')
    base_folder_name = os.path.basename(image_folder.rstrip(os.sep))

    if additional_exports is None:
        additional_exports = []

    try:
        if not os.path.isdir(image_folder):
            raise FileNotFoundError(f"Folder '{image_folder}' tidak ditemukan.")

        for root, dirs, files in os.walk(image_folder):
            
            # Tentukan jalur relatif (misalnya: '.' atau 'subfolder/subfolder2')
            relative_path_to_root = os.path.relpath(root, image_folder)
            
            # --- LOGIKA PENAMAAN GRUP (BERDASARKAN SUBFOLDER) ---
            if relative_path_to_root == '.':
                folder_group_name = base_folder_name or 'rootAssets'
            else:
                folder_group_name = relative_path_to_root.replace(os.sep, '_')
            
            folder_group_name = re.sub(r'[^a-zA-Z0-9_]', '', folder_group_name)
            folder_group_name = to_camel_case(folder_group_name)

            if folder_group_name not in grouped_assets:
                grouped_assets[folder_group_name] = []

            for filename in files:
                if filename.lower().endswith(image_extensions):
                    
                    # 1. Tentukan Nama Variabel JS yang Bersih dan Aman
                    base_name = os.path.splitext(filename)[0]
                    clean_name = base_name.replace('-', '_').replace(' ', '_')
                    variable_name = to_camel_case(clean_name)
                    
                    # 2. Tentukan Jalur Impor
                    # Gabungkan IMAGE_DIRECTORY + relative_path + filename
                    # Contoh: 'Photo' + '.' + 'Shopee.png' -> 'Photo/Shopee.png'
                    # Contoh: 'Photo' + 'Icons/' + 'menu.svg' -> 'Photo/Icons/menu.svg'
                    
                    # os.path.join akan menangani jika relative_path_to_root adalah '.'
                    full_import_path_segments = [base_folder_name]
                    if relative_path_to_root and relative_path_to_root != '.':
                        full_import_path_segments.append(relative_path_to_root)
                    full_import_path_segments.append(filename)
                    
                    # Gunakan os.path.join untuk membangun path dan replace \ dengan /
                    # Path yang diimpor harus relatif dari lokasi file JS ke folder aset
                    import_path = './' + os.path.join(*full_import_path_segments).replace('\\', '/')

                    # 3. Buat Baris Import
                    import_line = f"import {variable_name} from '{import_path}'"
                    import_lines.append(import_line)
                    
                    # 4. Tambahkan ke Grup
                    grouped_assets[folder_group_name].append(variable_name)

        grouped_assets = {k: v for k, v in grouped_assets.items() if v}
        
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return
    except Exception as e:
        print(f"Terjadi kesalahan saat memproses file: {e}")
        return

    # --- BAGIAN PEMBUATAN KONTEN JS (Tidak Berubah) ---
    
    imports_content = "\n".join(import_lines)

    # ... (Logika additional_exports_content sama) ...
    additional_exports_content = ""
    for export_item in additional_exports:
        export_name = export_item.get('name')
        files = export_item.get('files', [])
        
        files_js_array = ',\n  '.join(files)
        
        exports_block = f"""

export const {export_name} = [
  {files_js_array},
]
"""
        additional_exports_content += exports_block
        
    assets_object_items = []
    for group_name, variables in grouped_assets.items():
        variables_list = ',\n    '.join(variables)
        group_block = f"""  {group_name}: {{
    {variables_list}
  }}"""
        assets_object_items.append(group_block)
    
    assets_list_content = ',\n'.join(assets_object_items)
    
    assets_object_content = f"""

const assets = {{
{assets_list_content}
}}

export default assets
"""
    final_content = (
        imports_content +
        additional_exports_content +
        assets_object_content
    )

    with open(output_file, 'w') as f:
        f.write(final_content.strip())

    print(f"✅ File aset JavaScript berhasil dibuat: {output_file}")
    print(f"Total {len(import_lines)} aset diimpor dan dikelompokkan.")


# --- KONFIGURASI DAN EKSEKUSI ---

# 1. Tentukan folder root aset Anda
IMAGE_DIRECTORY = 'Photo' 

# 2. Tentukan nama file output JS Anda
OUTPUT_FILENAME = 'produk.js'

# 3. Konfigurasi export const tambahan
ADDITIONAL_EXPORTS_CONFIG = []


if __name__ == "__main__":
    generate_js_assets_file_grouped(
        image_folder=IMAGE_DIRECTORY, 
        output_file=OUTPUT_FILENAME,
        additional_exports=ADDITIONAL_EXPORTS_CONFIG
    )