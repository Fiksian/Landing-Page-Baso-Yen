// src/data/produkList.js
// Daftar produk yang akan dirender, mereferensikan kunci-kunci di file assets (produk.js)
// Data Dummmy
const productList = [
    // Contoh dari grup BAKSO
    { 
        id: 1, 
        name: "Bakso Keju Premium", 
        price: 75000, 
        description: "Bakso daging sapi dengan lelehan keju mozarella.", 
        image_group: 'logoyenBakso', 
        image_key: 'baksoKeju' 
    },
    { 
        id: 2, 
        name: "Bakso Mercon Super Pedas", 
        price: 85000, 
        description: "Bakso isi cabai rawit super pedas, tantangan rasa!", 
        image_group: 'logoyenBakso', 
        image_key: 'baksoMercon' 
    },
    { 
        id: 3, 
        name: "Baso Ikan Tenggiri", 
        price: 70000, 
        description: "Baso ikan murni dari tenggiri, kenyal dan gurih.", 
        image_group: 'logoyenBakso', 
        image_key: 'basoIkan' 
    },
    { 
        id: 4, 
        name: "Baso Urat Jumbo", 
        price: 90000, 
        description: "Baso urat dengan tekstur kasar dan kuah kaldu sapi.", 
        image_group: 'logoyenBakso', 
        image_key: 'basoUrat' 
    },
    // Contoh dari grup MIE
    { 
        id: 5, 
        name: "Mie Hijau Sayuran", 
        price: 45000, 
        description: "Mie sehat dibuat dari ekstrak sayuran hijau alami.", 
        image_group: 'logoyenMie', 
        image_key: 'mieHijau' 
    },
    { 
        id: 6, 
        name: "Mie Ramen Instan", 
        price: 55000, 
        description: "Mie khas Jepang, siap disajikan dengan kuah kental.", 
        image_group: 'logoyenMie', 
        image_key: 'mieRamen' 
    },
    // Contoh dari grup KULIT PANGSIT
    { 
        id: 7, 
        name: "Kulit Pangsit Dimsum Putih", 
        price: 30000, 
        description: "Kulit pangsit tipis untuk membuat dimsum dan siomay.", 
        image_group: 'logoyenKulitpangsit', 
        image_key: 'kpDimsumPutih' 
    },
    // Contoh dari grup SOSIS
    { 
        id: 8, 
        name: "Sosis Beef Breakfast", 
        price: 60000, 
        description: "Sosis sapi cepat saji untuk sarapan keluarga.", 
        image_group: 'logoyenSosis', 
        image_key: 'beefBreakfast' 
    },
    // ... Tambahkan produk lain di sini (total 27 produk agar ada paginasi)
    { id: 9, name: "Baso Tahu Kuah", price: 50000, description: "Tahu isi baso dengan bumbu kuah spesial.", image_group: 'logoyenPelengkap', image_key: 'basoTahu' },
    { id: 10, name: "Batagor Kuah/Goreng", price: 48000, description: "Batagor renyah siap goreng atau kuah.", image_group: 'logoyenPelengkap', image_key: 'batagor' },
    { id: 11, name: "Siomay Basah", price: 65000, description: "Siomay ayam bumbu klasik siap kukus.", image_group: 'logoyenPelengkap', image_key: 'siomayBasah' },
    { id: 12, name: "Sambal Bawang Ekstra Pedas", price: 25000, description: "Sambal bawang level dewa.", image_group: 'logoyenPelengkap', image_key: 'sambalBawangBesar' },
    { id: 13, name: "Mie Keriting", price: 40000, description: "Mie dengan tekstur keriting khas.", image_group: 'logoyenMie', image_key: 'mieKeriting' },
    { id: 14, name: "Baso Mini", price: 55000, description: "Baso sapi ukuran mini, cocok untuk sate.", image_group: 'logoyenBakso', image_key: 'basoMini' },
    // Tambahkan 13 produk lagi agar total 27 dan paginasi berfungsi
    { id: 15, name: "Miyuki Original", price: 95000, description: "Bumbu Miyuki kaldu original.", image_group: 'logoyenMiyuki', image_key: 'miyukiOriginal' },
    { id: 16, name: "Sosis Blackpepper", price: 78000, description: "Sosis dengan rasa lada hitam pedas.", image_group: 'logoyenSosis', image_key: 'blackpepper' },
    { id: 17, name: "Kulit Gyoza", price: 35000, description: "Kulit khusus untuk membuat gyoza panggang.", image_group: 'logoyenKulitpangsit', image_key: 'kulitGyozaProdukBasoyenBandungNew' },
    { id: 18, name: "Mie Pelangi Buah", price: 50000, description: "Mie warna-warni dari buah dan sayur.", image_group: 'logoyenMie', image_key: 'miePelangi' },
    { id: 19, name: "Baso Standar", price: 60000, description: "Baso sapi standar, serbaguna.", image_group: 'logoyenBakso', image_key: 'basoStandar' },
    { id: 20, name: "Bockwurst Sosis", price: 82000, description: "Sosis khas Jerman tebal dan juicy.", image_group: 'logoyenSosis', image_key: 'bockwurst' },
    { id: 21, name: "Otak-Otak Ikan", price: 45000, description: "Otak-otak ikan siap bakar/goreng.", image_group: 'logoyenPelengkap', image_key: 'otakOtak1' },
    { id: 22, name: "Mie Ungu Buah Bit", price: 47000, description: "Mie berwarna ungu dari buah bit.", image_group: 'logoyenMie', image_key: 'mieUnguBuahBit' },
    { id: 23, name: "Ekado Telur", price: 58000, description: "Ekado dengan isi telur puyuh.", image_group: 'logoyenPelengkap', image_key: 'ekadoTelur2' },
    { id: 24, name: "Mie Udon", price: 52000, description: "Mie tebal khas Jepang.", image_group: 'logoyenMie', image_key: 'mieUdon' },
    { id: 25, name: "Kuah Bakso Instan", price: 30000, description: "Kuah kaldu instan siap pakai.", image_group: 'logoyenPelengkap', image_key: 'kemasanKuahBaksoBaru' },
    { id: 26, name: "Kulit Pangsit Goreng Garlic", price: 32000, description: "Kulit pangsit untuk goreng dengan rasa bawang putih.", image_group: 'logoyenKulitpangsit', image_key: 'kpGorengGarlic' },
    { id: 27, name: "Sosis Mini Cocktail", price: 50000, description: "Sosis ukuran kecil untuk camilan.", image_group: 'logoyenSosis', image_key: 'miniCocktail' },

];

export default productList;