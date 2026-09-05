// Indonesian tool pages. Slugs follow the most searched Indonesian phrase; ids
// mirror the English slugs, or "<kind>:<word>" for a locale-only variant.
// Decisions are in NOTES.md.

import type { ToolFaq } from "@/lib/tools";
import type { LocalePage } from "../types";

const PRIVACY_FAQ: ToolFaq = {
  q: "Apakah file saya diunggah ke server?",
  a: "Tidak. PDF Anvil berjalan sepenuhnya di browser Anda. File dibuka oleh JavaScript di perangkat Anda sendiri, dan hasilnya juga dibuat di sana. Tidak ada yang dikirim kepada kami. Anda bisa mematikan koneksi internet setelah halaman dimuat, dan alat tetap bekerja.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "Apakah ada batas ukuran file atau batas harian?",
  a: "Tidak. Tidak ada batas jumlah halaman, batas jumlah file, atau kuota harian. Satu-satunya batas adalah memori perangkat Anda. File di atas 100 MB menampilkan peringatan, tetapi tetap bisa diproses di kebanyakan komputer.",
};

const FREE_FAQ: ToolFaq = {
  q: "Apakah benar-benar gratis? Apakah saya perlu akun?",
  a: "Ya, gratis, dan tidak perlu akun. Tanpa pendaftaran, tanpa email, tanpa watermark, dan tanpa paket premium. PDF Anvil adalah proyek sampingan KafLabs yang dibuat agar bermanfaat.",
};

const IMAGE_STEPS: [string, string, string] = [
  "Seret satu atau beberapa gambar ke kotak, atau klik untuk memilihnya.",
  "Seret gambar untuk mengatur urutan, lalu pilih ukuran halaman.",
  "Klik Buat PDF. File langsung terunduh.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: 'Apa arti "Sesuai gambar"?',
  a: "Setiap halaman mendapat ukuran yang persis sama dengan gambarnya, tanpa margin. Cocok untuk hasil scan dan tangkapan layar. Pilih A4 atau Letter jika Anda ingin halaman cetak biasa dengan gambar di tengah.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Bisakah saya memasukkan banyak gambar ke dalam satu PDF?",
  a: "Bisa. Tambahkan gambar sebanyak yang Anda mau. Setiap gambar menjadi satu halaman sesuai urutan daftar. Seret gambar ke atas atau ke bawah untuk mengubah urutan.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Seret PDF ke kotak, atau klik untuk memilihnya.",
  "Pilih format gambar dan resolusi yang Anda butuhkan.",
  "Klik Ubah ke gambar. ZIP berisi semua gambar langsung terunduh. Anda juga bisa mengunduh setiap gambar satu per satu.",
];

const DPI_FAQ: ToolFaq = {
  q: "Resolusi mana yang sebaiknya saya pilih?",
  a: "72 DPI berukuran kecil dan cocok untuk web. 150 DPI adalah pilihan yang baik untuk layar dan presentasi. 300 DPI untuk cetak. DPI yang lebih tinggi menghasilkan file lebih besar dan butuh waktu lebih lama.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Bisakah saya mengubah satu halaman saja?",
  a: "Bisa. Setelah file dimuat, klik halaman yang Anda inginkan di kisi. Hanya halaman yang dipilih yang diubah.",
};

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "Apakah PDF atau password saya diunggah?",
  a: "Tidak. File dan password tetap di browser Anda. Alat ini menjalankan program open-source qpdf sebagai WebAssembly di perangkat Anda sendiri. Tidak ada permintaan jaringan yang membawa file atau password Anda. Anda bisa mematikan koneksi internet setelah halaman dimuat, dan alat tetap bekerja.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "Apa perbedaan password pengguna dan password pemilik?",
  a: "PDF bisa memiliki dua password. Password pengguna membuka file. Password pemilik memberi akses penuh dan menghapus batasan untuk mencetak, menyalin, dan mengedit. Penampil PDF menerapkan izin hanya untuk orang yang membuka file dengan password pengguna.",
};

export const pages: readonly LocalePage[] = [
  // ---- gabung ----
  {
    id: "merge-pdf",
    slug: "gabung-pdf",
    kind: "merge",
    nav: true,
    priority: 1,
    name: "Gabung PDF",
    navLabel: "Gabung",
    title: "Gabung File PDF Online – Gratis, Privat, Tanpa Unggah",
    description:
      "Gabungkan beberapa file PDF menjadi satu dokumen di browser Anda. Seret untuk mengatur urutan. Gratis, tanpa unggah, tanpa akun, tanpa batas, tanpa watermark.",
    h1: "Gabung file PDF",
    intro: "Gabungkan dua PDF atau lebih menjadi satu file. Seret file ke urutan yang Anda mau. Semua diproses di browser Anda.",
    actionLabel: "Gabungkan PDF",
    steps: [
      "Seret dua file PDF atau lebih ke kotak, atau klik untuk memilihnya.",
      "Seret file ke urutan yang Anda inginkan.",
      "Klik Gabungkan PDF. File hasil gabungan langsung terunduh.",
    ],
    faq: [
      {
        q: "Bagaimana cara mengubah urutan file?",
        a: "Seret file ke atas atau ke bawah di daftar, atau gunakan tombol panah. PDF hasil gabungan mengikuti urutan daftar dari atas ke bawah.",
      },
      {
        q: "Apakah menggabungkan PDF mengubah kualitas halaman?",
        a: "Tidak. Halaman disalin apa adanya. Font, gambar, dan grafik vektor tetap persis sama. Alat ini tidak merender ulang atau mengompresi apa pun.",
      },
      {
        q: "Bisakah saya menggabungkan PDF yang dilindungi password?",
        a: "Tidak secara langsung. Hapus password-nya dulu dengan alat Buka Kunci PDF, lalu gabungkan salinannya. Anda perlu tahu password file tersebut.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "jpg-to-pdf"],
    keywords: [
      "gabung pdf",
      "gabungkan pdf",
      "menggabungkan pdf",
      "cara gabung pdf",
      "gabung file pdf",
      "satukan pdf",
      "gabung pdf online",
      "gabung pdf gratis",
    ],
  },

  // ---- pisahkan ----
  {
    id: "split-pdf",
    slug: "pisahkan-pdf",
    kind: "split",
    nav: true,
    priority: 6,
    name: "Pisahkan PDF",
    navLabel: "Pisahkan",
    title: "Pisahkan PDF Online – Ambil Halaman atau Pisahkan per Rentang",
    description:
      "Pisahkan PDF menjadi beberapa file, satu per halaman, atau ambil rentang halaman seperti 1-3, 5, 8-. Berjalan di browser. Gratis, privat, tanpa unggah, tanpa batas.",
    h1: "Pisahkan PDF",
    intro:
      "Ubah satu PDF menjadi banyak file. Simpan setiap halaman sebagai file sendiri, atau ketik rentang halaman yang Anda butuhkan. File tetap di perangkat Anda.",
    actionLabel: "Pisahkan PDF",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya.",
      'Pilih "Setiap halaman" atau ketik rentang halaman seperti 1-3, 5, 8-.',
      "Klik Pisahkan PDF. ZIP berisi semua bagian langsung terunduh. Anda juga bisa mengunduh setiap bagian satu per satu.",
    ],
    faq: [
      {
        q: "Bagaimana cara memisahkan PDF menjadi beberapa file?",
        a: 'Tambahkan PDF dan pilih "Setiap halaman". Klik Pisahkan PDF. Setiap halaman menjadi file PDF sendiri. Anda mendapat semua file dalam satu ZIP, atau mengunduhnya satu per satu.',
      },
      {
        q: "Bagaimana cara menulis rentang halaman?",
        a: 'Pisahkan setiap bagian dengan koma. "3" berarti satu halaman. "1-3" berarti halaman 1 sampai 3. "8-" berarti halaman 8 sampai akhir. Setiap bagian menjadi file PDF sendiri. Contoh: 1-3, 5, 8- menghasilkan tiga file.',
      },
      {
        q: "Bagaimana cara mengambil beberapa halaman saja dari PDF?",
        a: 'Pilih "Rentang halaman" dan ketik halaman yang Anda inginkan, misalnya 2, 7-9. Hanya halaman itu yang disimpan. File aslinya tidak berubah.',
      },
      {
        q: "Mengapa saya mendapat file ZIP?",
        a: "Saat pemisahan menghasilkan lebih dari satu file, browser tidak bisa menyimpan banyak file sekaligus tanpa bertanya setiap kali. ZIP menampung semuanya. Anda juga bisa mengunduh setiap file satu per satu dari daftar hasil.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "pisahkan pdf",
      "pisah pdf",
      "memisahkan pdf",
      "cara pisahkan pdf",
      "ambil halaman pdf",
      "pisahkan halaman pdf",
      "pisahkan pdf online",
      "pisahkan pdf gratis",
    ],
  },
  {
    // Locale-only variant of "split" for the query "pecah pdf".
    id: "split:pecah",
    slug: "pecah-pdf",
    kind: "split",
    nav: false,
    priority: 15,
    name: "Pecah PDF",
    navLabel: "Pecah",
    title: "Pecah PDF Menjadi Beberapa File Online – Gratis, Tanpa Unggah",
    description:
      "Pecah satu PDF menjadi beberapa file, per halaman atau per bagian, langsung di browser Anda. Tanpa unggah, tanpa akun, tanpa batas halaman, tanpa watermark.",
    h1: "Pecah PDF menjadi beberapa file",
    intro:
      "Pecah PDF yang panjang menjadi beberapa file yang lebih kecil. Tentukan halaman untuk setiap bagian, klik sekali, dan unduh. PDF tidak keluar dari perangkat Anda.",
    actionLabel: "Pecah PDF",
    steps: [
      "Tambahkan PDF Anda. Seret ke kotak, atau klik untuk memilihnya.",
      'Pilih "Setiap halaman" agar setiap halaman menjadi file sendiri, atau pilih "Rentang halaman" dan ketik bagiannya, misalnya 1-10, 11-20, 21-.',
      "Klik Pecah PDF. Setiap bagian menjadi satu PDF. Anda mendapat ZIP, atau unduh setiap file satu per satu.",
    ],
    faq: [
      {
        q: "Bagaimana cara memecah PDF menjadi beberapa bagian?",
        a: 'Tambahkan PDF dan pilih "Rentang halaman". Ketik bagiannya, dipisahkan dengan koma, misalnya 1-10, 11-20, 21-. Klik Pecah PDF. Setiap bagian menjadi satu file PDF baru. File aslinya tidak berubah.',
      },
      {
        q: "Bisakah saya memecah PDF per 10 halaman?",
        a: "Bisa. Ketik rentangnya secara manual: 1-10, 11-20, 21-30, dan seterusnya. Tanda strip di akhir, misalnya 31-, berarti sampai halaman terakhir. Setiap rentang menjadi satu file.",
      },
      {
        q: "Bisakah saya memecah PDF besar agar bisa dikirim lewat email?",
        a: "Bisa. Pecah file menjadi beberapa bagian dan kirim setiap bagian sebagai lampiran terpisah. Coba juga alat Kompres PDF dulu. Sering kali file yang sudah dikompresi tidak perlu dipecah lagi.",
      },
      {
        q: "Apakah kualitas halaman berubah setelah dipecah?",
        a: "Tidak. Halaman disalin apa adanya ke file baru. Teks, gambar, dan grafik vektor tidak dirender ulang dan tidak dikompresi.",
      },
      {
        q: "Apa bedanya pecah PDF dan pisahkan PDF?",
        a: "Tidak ada bedanya. Pecah, pisahkan, dan bagi semuanya berarti hal yang sama: membuat beberapa file dari satu PDF. Halaman ini dan halaman Pisahkan PDF memakai alat yang sama.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "compress-pdf", "merge-pdf"],
    keywords: [
      "pecah pdf",
      "memecah pdf",
      "cara pecah pdf",
      "pecah file pdf",
      "pecah pdf per halaman",
      "bagi pdf",
      "pecah pdf online gratis",
    ],
  },

  // ---- putar ----
  {
    id: "rotate-pdf",
    slug: "putar-pdf",
    kind: "rotate",
    nav: true,
    priority: 10,
    name: "Putar PDF",
    navLabel: "Putar",
    title: "Putar Halaman PDF Online – Perbaiki Halaman Miring, Gratis",
    description:
      "Putar semua halaman atau halaman tertentu dari PDF sebesar 90, 180, atau 270 derajat dan simpan hasilnya. Berjalan di browser. Gratis, tanpa unggah, tanpa watermark.",
    h1: "Putar halaman PDF",
    intro:
      "Perbaiki halaman yang miring atau terbalik. Putar seluruh dokumen atau hanya halaman yang Anda pilih, lalu simpan sebagai PDF baru.",
    actionLabel: "Simpan PDF",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya.",
      "Putar semua halaman dengan tombol di atas, atau arahkan kursor ke satu halaman dan putar halaman itu saja.",
      "Klik Simpan PDF. File langsung terunduh.",
    ],
    faq: [
      {
        q: "Apakah rotasinya permanen?",
        a: "Ya. Berbeda dengan tombol putar di penampil PDF yang hanya mengubah tampilan, alat ini menulis rotasi ke dalam file. Halaman terbuka dengan orientasi baru di setiap penampil dan di setiap perangkat.",
      },
      {
        q: "Bisakah saya memutar satu halaman saja?",
        a: "Bisa. Arahkan kursor ke thumbnail halaman dan gunakan tombol putarnya. Setiap halaman bisa punya rotasi sendiri. Tombol di atas memutar semua halaman sekaligus.",
      },
      {
        q: "Apakah memutar halaman menurunkan kualitas?",
        a: "Tidak. Alat ini hanya mengubah satu properti halaman. Isinya tidak dirender ulang dan tidak dikompresi, jadi kualitasnya tetap sama persis.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["putar pdf", "memutar pdf", "putar halaman pdf", "cara putar pdf", "rotasi pdf", "putar pdf dan simpan", "putar pdf online gratis"],
  },

  // ---- atur halaman ----
  {
    id: "organize-pdf",
    slug: "atur-halaman-pdf",
    kind: "organize",
    nav: true,
    priority: 11,
    name: "Atur Halaman PDF",
    navLabel: "Atur halaman",
    title: "Atur Halaman PDF – Ubah Urutan dan Hapus Halaman Online",
    description:
      "Seret halaman PDF ke urutan baru, hapus halaman yang tidak Anda perlukan, dan unduh hasilnya. Berjalan di browser. Gratis, privat, tanpa unggah, tanpa batas.",
    h1: "Atur halaman PDF",
    intro:
      "Ubah urutan halaman dengan menyeretnya, hapus halaman yang tidak perlu, dan simpan sebagai PDF baru yang rapi. Tidak ada yang keluar dari perangkat Anda.",
    actionLabel: "Simpan PDF baru",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya.",
      "Seret halaman ke urutan baru. Arahkan kursor ke halaman untuk menghapus atau memutarnya.",
      "Klik Simpan PDF baru. File langsung terunduh.",
    ],
    faq: [
      {
        q: "Bagaimana cara menghapus halaman dari PDF?",
        a: "Arahkan kursor ke halaman dan klik ikon tempat sampah. Halaman itu dikeluarkan dari hasil. Halaman yang dihapus tidak ada sama sekali di file yang disimpan, jadi ukuran file menjadi lebih kecil.",
      },
      {
        q: "Bisakah saya mengubah urutan halaman di ponsel?",
        a: "Bisa. Tekan dan tahan halaman, lalu seret ke posisi barunya. Pengguna keyboard bisa memfokuskan halaman, menekan Spasi, memindahkannya dengan tombol panah, lalu menekan Spasi lagi.",
      },
      {
        q: "Saya salah menghapus halaman. Bisakah dibatalkan?",
        a: "Bisa. Gunakan tombol Urungkan yang muncul setelah menghapus, atau klik Atur ulang untuk kembali ke urutan asli dengan semua halaman.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: [
      "atur halaman pdf",
      "urutkan halaman pdf",
      "hapus halaman pdf",
      "ubah urutan halaman pdf",
      "menghapus halaman pdf",
      "susun halaman pdf",
      "mengatur halaman pdf",
    ],
  },

  // ---- gambar ke PDF: satu komponen, empat halaman ----
  {
    id: "jpg-to-pdf",
    slug: "jpg-ke-pdf",
    kind: "images-to-pdf",
    nav: true,
    priority: 3,
    name: "JPG ke PDF",
    navLabel: "JPG ke PDF",
    title: "JPG ke PDF – Ubah Foto JPG Menjadi PDF Online, Gratis",
    description:
      "Ubah foto dan hasil scan JPG menjadi satu PDF di browser Anda. Pilih halaman A4, Letter, atau sesuai gambar. Gratis, tanpa unggah, tanpa akun, tanpa watermark.",
    h1: "Ubah JPG ke PDF",
    intro:
      "Ubah satu JPG atau sekumpulan foto menjadi satu PDF. Pilih ukuran halaman dan seret gambar untuk mengatur urutan. Foto Anda tidak pernah keluar dari perangkat Anda.",
    actionLabel: "Buat PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Apakah PDF mempertahankan kualitas penuh JPG saya?",
        a: "Ya. Data JPG dimasukkan ke PDF persis apa adanya, tanpa kompresi ulang. Foto 12 megapiksel tetap foto 12 megapiksel. Ukuran PDF kira-kira sama dengan jumlah ukuran semua gambar.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Foto dari ponsel saya jadi miring. Mengapa?",
        a: "Sebagian ponsel menyimpan rotasi sebagai tag tersembunyi, bukan memutar pikselnya. Versi ini belum membaca tag itu. Buka foto di aplikasi editor apa pun, simpan sekali, lalu tambahkan lagi.",
      },
      {
        q: "Bisakah saya mencampur JPG dengan file PNG atau WebP?",
        a: "Bisa. Alat yang sama menerima JPG, PNG, dan WebP sekaligus. Setiap gambar menjadi satu halaman.",
      },
      PRIVACY_FAQ,
      {
        q: "Apakah mengubah JPG ke PDF di sini gratis?",
        a: "Ya. Gratis, tanpa batas jumlah gambar, dan tanpa watermark. PDF dibuat di browser Anda, jadi foto Anda tidak diunggah. Anda tidak perlu akun.",
      },
    ],
    related: ["image-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: [
      "jpg ke pdf",
      "ubah jpg ke pdf",
      "jpg to pdf",
      "convert jpg ke pdf",
      "foto ke pdf",
      "jpeg ke pdf",
      "cara mengubah jpg ke pdf",
      "jpg ke pdf online gratis",
    ],
  },
  {
    id: "image-to-pdf",
    slug: "gambar-ke-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 14,
    name: "Gambar ke PDF",
    navLabel: "Gambar ke PDF",
    title: "Gambar ke PDF – Ubah JPG, PNG, WebP Menjadi PDF Gratis",
    description:
      "Ubah gambar apa pun menjadi satu PDF: JPG, PNG, dan WebP, bisa dicampur. Pilih ukuran halaman dan urutan. Gratis, privat, berjalan di browser, tanpa unggah.",
    h1: "Ubah gambar ke PDF",
    intro:
      "Gabungkan gambar JPG, PNG, dan WebP menjadi satu PDF. Campur format dengan bebas, pilih ukuran halaman, dan seret gambar untuk mengatur urutan. Tidak ada yang keluar dari perangkat Anda.",
    actionLabel: "Buat PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Format gambar apa yang didukung?",
        a: "JPG, PNG, dan WebP. JPG dan PNG disematkan langsung. WebP didekode dan diubah ke PNG sebelum ditambahkan. Anda bisa mencampur ketiganya dalam satu PDF.",
      },
      {
        q: "Bisakah saya membuat PDF dari foto di ponsel?",
        a: "Bisa. Buka halaman ini di ponsel Anda, ketuk kotak, lalu pilih foto dari galeri. PDF dibuat di ponsel dan disimpan ke folder unduhan.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Apakah PDF mempertahankan resolusi penuh gambar saya?",
        a: "Ya. Data gambar disematkan tanpa diubah ukurannya. Itu juga berarti ukuran PDF kira-kira sama dengan jumlah ukuran semua gambar.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: [
      "gambar ke pdf",
      "ubah gambar ke pdf",
      "gambar jadi pdf",
      "cara mengubah gambar ke pdf",
      "buat pdf dari gambar",
      "foto jadi pdf",
      "gambar ke pdf online gratis",
    ],
  },
  {
    id: "png-to-pdf",
    slug: "png-ke-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 18,
    name: "PNG ke PDF",
    navLabel: "PNG ke PDF",
    title: "PNG ke PDF – Ubah Gambar PNG Menjadi PDF Online, Gratis",
    description:
      "Ubah tangkapan layar, diagram, dan grafik PNG menjadi satu PDF tanpa penurunan kualitas. Transparansi tetap ada. Gratis, di browser, tanpa unggah, tanpa watermark.",
    h1: "Ubah PNG ke PDF",
    intro:
      "Ubah gambar PNG menjadi PDF tanpa penurunan kualitas. Tangkapan layar, grafik, dan logo dengan latar transparan semuanya bisa. Semua berjalan di browser Anda.",
    actionLabel: "Buat PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Apakah kualitas PNG tetap utuh?",
        a: "Ya. PNG adalah format tanpa penurunan kualitas, dan PDF menyematkan data PNG tanpa mengubahnya. Teks di tangkapan layar tetap tajam, dan warnanya tidak bergeser.",
      },
      {
        q: "Bagaimana dengan latar transparan?",
        a: "PDF mempertahankan saluran alfa. Bagian yang transparan menampilkan latar halaman, yang berwarna putih di kebanyakan penampil. Tidak ada yang diratakan atau diisi.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Ukuran halaman mana yang terbaik untuk tangkapan layar?",
        a: 'Pilih "Sesuai gambar" agar setiap halaman berukuran persis sama dengan piksel tangkapan layar, tanpa margin. Pilih A4 atau Letter jika Anda ingin mencetak halamannya.',
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png ke pdf", "ubah png ke pdf", "png to pdf", "screenshot ke pdf", "tangkapan layar ke pdf", "png ke pdf online gratis"],
  },
  {
    id: "scan-to-pdf",
    slug: "scan-ke-pdf",
    kind: "images-to-pdf",
    nav: false,
    priority: 17,
    name: "Scan ke PDF",
    navLabel: "Scan ke PDF",
    title: "Scan Dokumen ke PDF Online – Pakai Kamera Ponsel, Gratis",
    description:
      "Scan dokumen kertas menjadi PDF dengan kamera ponsel atau foto yang sudah ada. Urutkan halaman dan pilih A4 atau Letter. Gratis, privat, tidak ada yang diunggah.",
    h1: "Scan dokumen ke PDF",
    intro:
      "Foto setiap halaman dengan kamera ponsel Anda, atau tambahkan foto yang sudah ada. Urutkan halaman dan dapatkan satu PDF. Tidak ada yang diunggah.",
    actionLabel: "Buat PDF",
    steps: [
      "Ketuk Ambil foto dan potret halaman pertama. Atau ketuk kotak untuk menambahkan foto yang sudah ada.",
      "Ulangi untuk setiap halaman. Seret halaman untuk mengatur urutan dan pilih ukuran halaman.",
      "Ketuk Buat PDF. File langsung terunduh.",
    ],
    faq: [
      {
        q: "Bagaimana cara scan dokumen dengan ponsel?",
        a: "Buka halaman ini di ponsel Anda. Ketuk Ambil foto. Kamera terbuka. Potret halaman pertama dan konfirmasi. Ketuk Ambil foto lagi untuk halaman berikutnya. Setelah semua halaman ada di daftar, ketuk Buat PDF. PDF disimpan di ponsel Anda.",
      },
      {
        q: "Bisakah saya memakainya di komputer desktop?",
        a: "Bisa. Di desktop, tombol Ambil foto membuka pemilih file biasa. Pilih foto atau hasil scan yang sudah ada di komputer, urutkan, lalu buat PDF-nya.",
      },
      {
        q: "Apakah foto saya diunggah ke server?",
        a: "Tidak. Foto dari kamera masuk langsung ke halaman di browser Anda. PDF juga dibuat di sana. Tidak ada yang dikirim kepada kami. Anda bisa mematikan koneksi internet setelah halaman dimuat, dan alat tetap bekerja.",
      },
      {
        q: "Bagaimana agar hasilnya lurus dan mudah dibaca?",
        a: "Letakkan dokumen di permukaan datar dengan latar polos. Pakai cahaya yang cukup dan hindari bayangan tangan atau ponsel. Pegang ponsel sejajar dengan halaman dan isi bingkai dengan halaman itu. Ketuk layar untuk fokus sebelum memotret. Alat ini tidak memotong atau meluruskan foto.",
      },
      {
        q: "Ukuran halaman mana yang sebaiknya dipilih?",
        a: 'Pilih A4 atau Letter untuk halaman cetak biasa dengan foto di tengah. A4 adalah pilihan bawaan. Pilih "Sesuai gambar" agar setiap halaman berukuran persis sama dengan fotonya, tanpa margin.',
      },
      {
        q: "Bisakah saya scan banyak halaman ke dalam satu PDF?",
        a: "Bisa. Ambil satu foto per halaman. Setiap foto menjadi satu halaman sesuai urutan daftar. Tidak ada batas halaman. Seret halaman ke atas atau ke bawah untuk mengubah urutan.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: [
      "scan ke pdf",
      "scan dokumen ke pdf",
      "cara scan dokumen ke pdf",
      "scan pdf dengan hp",
      "kamera ke pdf",
      "scan dokumen jadi pdf",
      "pindai ke pdf",
    ],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF ke gambar: satu komponen, tiga halaman ----
  {
    id: "pdf-to-jpg",
    slug: "pdf-ke-jpg",
    kind: "pdf-to-images",
    nav: true,
    priority: 4,
    name: "PDF ke JPG",
    navLabel: "PDF ke JPG",
    title: "PDF ke JPG – Ubah Halaman PDF Menjadi Gambar JPG Online",
    description:
      "Simpan setiap halaman PDF sebagai gambar JPG pada 72, 150, atau 300 DPI. Berjalan di browser. Gratis, privat, tanpa unggah, tanpa watermark, tanpa batas.",
    h1: "Ubah PDF ke JPG",
    intro:
      "Simpan setiap halaman PDF sebagai gambar JPG. Pilih resolusi, pilih halaman, dan unduh satu gambar atau semuanya dalam ZIP.",
    actionLabel: "Ubah ke gambar",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Bagaimana cara menyimpan PDF sebagai JPG?",
        a: "Tambahkan PDF ke halaman ini. Biarkan format JPG dan pilih resolusi. Klik Ubah ke gambar. Setiap halaman disimpan sebagai file JPG. Unduh satu per satu atau semuanya sekaligus dalam ZIP.",
      },
      DPI_FAQ,
      {
        q: "Kapan sebaiknya memilih JPG daripada PNG?",
        a: "JPG lebih kecil dan cocok untuk foto dan halaman hasil scan. Pilih PNG untuk teks, diagram, dan tangkapan layar yang membutuhkan tepi yang tajam.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Apakah JPG memuat seluruh halaman?",
        a: "Ya. Seluruh halaman dirender, termasuk gambar, grafik vektor, dan teks, persis seperti yang ditampilkan penampil PDF. Kolom formulir dan anotasi ikut disertakan sebagaimana tampilannya.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-image", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: [
      "pdf ke jpg",
      "ubah pdf ke jpg",
      "pdf to jpg",
      "convert pdf ke jpg",
      "cara mengubah pdf ke jpg",
      "pdf ke jpeg",
      "pdf jadi jpg",
      "pdf ke jpg online gratis",
    ],
  },
  {
    id: "pdf-to-image",
    slug: "pdf-ke-gambar",
    kind: "pdf-to-images",
    nav: false,
    priority: 16,
    name: "PDF ke Gambar",
    navLabel: "PDF ke Gambar",
    title: "PDF ke Gambar – Ubah Halaman PDF Menjadi JPG atau PNG Online",
    description:
      "Ubah halaman PDF menjadi gambar. Pilih JPG atau PNG dan 72, 150, atau 300 DPI. Pilih halaman yang Anda butuhkan. Gratis, di browser, tanpa unggah, tanpa batas.",
    h1: "Ubah PDF ke gambar",
    intro:
      "Ubah halaman PDF menjadi file gambar. Pilih JPG untuk foto dan hasil scan atau PNG untuk teks dan diagram, tentukan resolusi, dan unduh halaman yang Anda butuhkan.",
    actionLabel: "Ubah ke gambar",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG atau PNG?",
        a: "JPG lebih kecil dan cocok untuk foto dan halaman hasil scan. PNG tanpa penurunan kualitas dan cocok untuk teks, diagram, dan tangkapan layar yang membutuhkan tepi yang tajam.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Bisakah saya mendapat satu gambar untuk seluruh dokumen?",
        a: "Setiap halaman menjadi gambar sendiri. Jika Anda butuh satu gambar memanjang, ubah halamannya lalu satukan di aplikasi editor gambar.",
      },
      {
        q: "Bisakah saya mengubah PDF ke gambar di ponsel?",
        a: "Bisa. Buka halaman ini di browser ponsel Anda, ketuk kotak, dan pilih PDF. Gambar dibuat di ponsel dan disimpan ke folder unduhan, satu per satu atau dalam ZIP.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf ke gambar", "ubah pdf ke gambar", "pdf jadi gambar", "pdf ke foto", "cara mengubah pdf ke gambar", "pdf ke gambar online gratis"],
  },
  {
    id: "pdf-to-png",
    slug: "pdf-ke-png",
    kind: "pdf-to-images",
    nav: false,
    priority: 19,
    name: "PDF ke PNG",
    navLabel: "PDF ke PNG",
    title: "PDF ke PNG – Ubah Halaman PDF Menjadi Gambar PNG Online",
    description:
      "Simpan halaman PDF sebagai gambar PNG tanpa penurunan kualitas pada 72, 150, atau 300 DPI. Teks dan diagram tetap tajam. Gratis, di browser, tanpa unggah.",
    h1: "Ubah PDF ke PNG",
    intro:
      "Simpan halaman PDF sebagai gambar PNG tanpa penurunan kualitas. Teks, diagram, dan tangkapan layar tetap tajam. Pilih resolusi dan halaman, lalu unduh.",
    actionLabel: "Ubah ke gambar",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Mengapa memilih PNG, bukan JPG?",
        a: "PNG tidak menurunkan kualitas. Tepi teks, garis tipis, dan warna rata tetap persis, tanpa artefak kompresi. PNG adalah pilihan yang tepat untuk slide, diagram, formulir, dan apa pun yang akan Anda edit lagi.",
      },
      DPI_FAQ,
      {
        q: "Apakah latar PNG-nya transparan?",
        a: "Tidak. Halaman PDF memiliki latar putih secara bawaan, dan PNG mempertahankannya. Gunakan aplikasi editor gambar jika Anda perlu menghapusnya.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Apakah file PNG lebih besar daripada JPG?",
        a: "Biasanya ya. PNG menyimpan setiap piksel tanpa kehilangan data, jadi halaman dengan foto bisa beberapa kali lebih besar daripada versi JPG. Untuk halaman teks dan diagram, selisihnya kecil.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf ke png", "ubah pdf ke png", "pdf to png", "pdf jadi png", "pdf ke png resolusi tinggi", "pdf ke png online gratis"],
  },

  // ---- kompres: satu komponen, dua halaman ----
  {
    id: "compress-pdf",
    slug: "kompres-pdf",
    kind: "compress",
    nav: true,
    priority: 2,
    name: "Kompres PDF",
    navLabel: "Kompres",
    title: "Kompres PDF Online – Perkecil Ukuran PDF Gratis, Tanpa Unggah",
    description:
      "Kompres PDF di browser Anda. Pilih tanpa penurunan kualitas, seimbang, atau terkecil. Foto besar dikompresi ulang, teks tetap tajam. Gratis, tanpa unggah.",
    h1: "Kompres PDF",
    intro:
      "Perkecil ukuran PDF. Pilih tingkat kompresi, klik sekali, dan unduh. Teks dan grafik vektor tetap tajam. File tidak pernah keluar dari perangkat Anda.",
    actionLabel: "Kompres PDF",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya.",
      "Pilih tingkat kompresi. Tanpa penurunan kualitas mempertahankan setiap piksel. Seimbang adalah pilihan terbaik untuk kebanyakan file. Terkecil menghasilkan file paling kecil.",
      "Klik Kompres PDF. Alat menampilkan ukuran lama dan ukuran baru, dan file langsung terunduh.",
    ],
    faq: [
      {
        q: "Seberapa kecil PDF saya nanti?",
        a: "Tergantung isi filenya. PDF yang penuh foto besar atau hasil scan bisa menyusut 50 sampai 90 persen dengan tingkat Seimbang. PDF yang hanya berisi teks dan grafik vektor menyusut jauh lebih sedikit, sering kali 5 sampai 20 persen, karena tidak ada gambar besar yang bisa dikompresi ulang. Alat menampilkan ukuran lama dan ukuran baru setiap kali dijalankan.",
      },
      {
        q: "Tingkat mana yang sebaiknya saya pilih?",
        a: "Seimbang adalah pilihan terbaik untuk kebanyakan file. Tingkat ini membatasi gambar hingga 1600 piksel pada sisi terpanjang, yang tetap tajam di layar dan cukup untuk cetak biasa. Pilih Terkecil untuk lampiran email dan batas unggahan. Tingkat ini membatasi gambar hingga 1100 piksel dan memakai kompresi JPEG yang lebih kuat. Pilih Tanpa penurunan kualitas jika gambar harus tetap persis seperti aslinya. Tingkat ini hanya membersihkan struktur file dan menghapus data yang tidak terpakai.",
      },
      {
        q: "Apakah kompresi menurunkan kualitas teks?",
        a: "Tidak. Teks, font, garis, dan grafik vektor tidak diubah pada tingkat mana pun. Hanya foto besar dan hasil scan yang dikompresi ulang, dan hanya pada tingkat Seimbang dan Terkecil. Jika gambar baru tidak lebih kecil dari gambar lama, gambar lama yang dipertahankan.",
      },
      {
        q: "Mengapa file saya tidak mengecil?",
        a: "Sebagian file memang sudah sekecil mungkin. Gambar di dalamnya sudah berupa JPEG kecil, atau file itu tidak berisi gambar sama sekali, hanya teks dan bentuk vektor. File yang sudah dikompresi alat lain juga hanya berubah sedikit. Dalam kasus itu, alat memberi tahu bahwa file sudah ringkas.",
      },
      {
        q: "Gambar mana yang dikompresi alat ini?",
        a: "Gambar JPEG serta gambar RGB dan skala abu-abu yang tidak terkompresi atau terkompresi Flate, dengan ukuran minimal 64 KB dan lebar atau tinggi minimal 200 piksel. Gambar dengan transparansi, warna terindeks, CMYK, atau ruang warna yang tidak umum dibiarkan apa adanya agar warnanya tidak berubah.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "kompres pdf",
      "kompresi pdf",
      "mengompres pdf",
      "cara kompres pdf",
      "kecilkan pdf",
      "kompres file pdf",
      "kompres pdf online gratis",
    ],
  },
  {
    // Variant of "compress" for the query "perkecil ukuran pdf".
    id: "reduce-pdf-size",
    slug: "perkecil-ukuran-pdf",
    kind: "compress",
    nav: false,
    priority: 13,
    name: "Perkecil Ukuran PDF",
    navLabel: "Perkecil ukuran",
    title: "Perkecil Ukuran File PDF Online – Gratis, Tanpa Unggah",
    description:
      "Perkecil ukuran PDF agar muat untuk email dan unggahan. Berjalan di browser Anda. Tiga tingkat, ukuran sebelum dan sesudah ditampilkan. Tanpa unggah, tanpa akun.",
    h1: "Perkecil ukuran file PDF",
    intro:
      "Buat PDF muat di bawah batas email atau unggahan. Pilih seberapa kecil hasilnya, klik sekali, dan lihat ukuran lama dan baru. PDF tetap di perangkat Anda.",
    actionLabel: "Perkecil ukuran",
    steps: [
      "Tambahkan PDF Anda. Seret ke kotak, atau klik untuk memilihnya.",
      "Pilih tingkat kompresi. Mulai dengan Seimbang. Jika file masih terlalu besar, jalankan lagi dengan Terkecil.",
      "Klik Perkecil ukuran. Alat menampilkan berapa persen yang dihemat, dan file yang lebih kecil langsung terunduh.",
    ],
    faq: [
      {
        q: "Bagaimana cara memperkecil ukuran PDF?",
        a: "Tambahkan PDF ke halaman ini dan pilih tingkat kompresi. Klik Perkecil ukuran. Alat menulis ulang file, menghapus data yang tidak terpakai, dan memperkecil foto besar. PDF baru langsung terunduh, dan halaman menampilkan ukuran lama dan baru.",
      },
      {
        q: "Bagaimana cara membuat PDF di bawah 1 MB atau di bawah 5 MB?",
        a: "Jalankan file dengan tingkat Seimbang dan lihat ukuran barunya. Jika masih di atas batas, jalankan lagi dengan Terkecil. Jika file masih terlalu besar, berarti file itu berisi banyak halaman gambar. Pecah menjadi beberapa bagian dengan alat Pisahkan PDF dan kirim setiap bagian.",
      },
      {
        q: "Apakah memperkecil ukuran mengubah teks?",
        a: "Tidak. Teks dan grafik vektor disalin apa adanya. Hanya foto besar dan hasil scan yang diperkecil. Teks tetap tajam di layar dan saat dicetak.",
      },
      {
        q: "Mengapa PDF saya begitu besar?",
        a: "Dalam kebanyakan kasus, file itu berisi foto atau halaman hasil scan dengan resolusi sangat tinggi. Satu halaman scan pada 600 DPI bisa memakan beberapa megabyte. Tingkat Seimbang membatasi gambar hingga 1600 piksel pada sisi terpanjang, yang sudah cukup untuk dibaca dan dicetak biasa.",
      },
      {
        q: "Apakah alat perkecil ukuran PDF ini gratis?",
        a: "Ya. Tanpa biaya, tanpa akun, tanpa watermark, dan tanpa batas jumlah file. PDF diproses di browser Anda dan tidak pernah diunggah.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "perkecil ukuran pdf",
      "memperkecil ukuran pdf",
      "cara memperkecil ukuran pdf",
      "perkecil pdf",
      "mengecilkan ukuran pdf",
      "pdf di bawah 1 mb",
      "perkecil pdf online gratis",
    ],
  },

  // ---- password: qpdf sebagai WebAssembly ----
  {
    id: "unlock-pdf",
    slug: "buka-kunci-pdf",
    kind: "unlock",
    nav: true,
    priority: 8,
    name: "Buka Kunci PDF",
    navLabel: "Buka kunci",
    title: "Buka Kunci PDF – Hapus Password PDF Online, Gratis, Tanpa Unggah",
    description:
      "Hapus password dari PDF yang Anda ketahui password-nya. Ketik password, klik sekali, dan dapatkan salinan tanpa password. Gratis, di browser, tanpa unggah.",
    h1: "Buka kunci PDF",
    intro:
      "Hapus password dari PDF. Ketik password yang Anda ketahui, klik sekali, dan unduh salinan yang terbuka tanpa password. File tetap di perangkat Anda.",
    actionLabel: "Buka kunci PDF",
    steps: [
      "Seret PDF yang dilindungi password ke kotak, atau klik untuk memilihnya.",
      "Ketik password file. Password yang membuka file maupun password pemilik sama-sama bisa dipakai.",
      "Klik Buka kunci PDF. Salinan tanpa password dan tanpa batasan langsung terunduh.",
    ],
    faq: [
      {
        q: "Saya lupa password. Bisakah dihapus?",
        a: "Tidak. Alat ini membutuhkan password. Alat ini tidak menebak, membobol, atau melewati password. PDF dengan enkripsi AES tidak bisa dibuka tanpa password yang benar. Jika Anda tidak mengetahuinya, tanyakan kepada pembuat file.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Password mana yang saya ketik di sini?",
        a: "Salah satunya. Jika Anda hanya tahu password untuk membuka file, ketik itu. Jika Anda tahu password pemilik, ketik itu. Hasilnya tidak memiliki password dan tidak ada batasan.",
      },
      {
        q: "Mengapa PDF saya tidak bisa dibuka di sini?",
        a: "Ada tiga penyebab umum. Password salah: periksa huruf besar dan spasi, lalu coba lagi. File rusak: buka di penampil PDF untuk memeriksanya. File memakai sertifikat atau sistem hak digital, bukan password: alat ini tidak bisa membuka file seperti itu.",
      },
      {
        q: "Bisakah saya menghapus batasannya saja dan mempertahankan password pembuka?",
        a: "Tidak. Hasilnya tidak memiliki password sama sekali. Untuk memasang password baru, buka hasilnya di alat Proteksi PDF.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: [
      "buka kunci pdf",
      "hapus password pdf",
      "cara membuka pdf yang terkunci",
      "buka password pdf",
      "menghapus password pdf",
      "unlock pdf",
      "hilangkan password pdf",
      "buka kunci pdf online gratis",
    ],
  },
  {
    id: "protect-pdf",
    slug: "proteksi-pdf",
    kind: "protect",
    nav: true,
    priority: 9,
    name: "Proteksi PDF",
    navLabel: "Proteksi",
    title: "Proteksi PDF – Kunci PDF dengan Password Online, Gratis, Tanpa Unggah",
    description:
      "Tambahkan password ke PDF dengan enkripsi AES-256 di browser Anda. Atur siapa yang boleh mencetak, menyalin, atau mengedit file. Gratis, tanpa unggah, tanpa akun.",
    h1: "Proteksi PDF dengan password",
    intro:
      "Tambahkan password ke PDF. File dienkripsi dengan AES-256 di browser Anda, dan hanya orang yang memiliki password yang bisa membukanya. Tidak ada yang diunggah.",
    actionLabel: "Proteksi PDF",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya.",
      "Ketik password untuk membuka file. Atur password pemilik dan izin jika Anda memerlukannya.",
      "Klik Proteksi PDF. File terenkripsi langsung terunduh.",
    ],
    faq: [
      {
        q: "Enkripsi apa yang dipakai alat ini?",
        a: "AES-256, enkripsi terkuat dalam standar PDF (PDF 2.0). Setiap penampil PDF modern bisa membukanya: Adobe Reader, Chrome, Edge, Firefox, Safari, dan Preview di Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "Apa yang terjadi jika password pemilik dikosongkan?",
        a: "Alat memakai password pembuka file untuk keduanya. Akibatnya, izin tidak membatasi orang yang tahu password itu. Atur password pemilik yang berbeda jika izin harus berlaku.",
      },
      {
        q: "Apa fungsi izin?",
        a: "Izin memberi tahu penampil PDF apa yang boleh dilakukan orang yang memakai password pengguna: mencetak file, menyalin teks dan gambar, dan mengedit file. Orang dengan password pemilik bisa melakukan semuanya. Kebanyakan penampil mematuhi izin, tetapi izin hanya sinyal, bukan gembok. Password adalah perlindungan yang sesungguhnya.",
      },
      {
        q: "Bisakah password dihapus nanti?",
        a: "Bisa. Buka file di alat Buka Kunci PDF dan ketik password-nya. Anda mendapat salinan tanpa password. Simpan password di tempat yang aman. Tanpa password, file tidak bisa dibuka.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "Seberapa panjang password yang sebaiknya dipakai?",
        a: "Gunakan minimal 12 karakter dengan huruf, angka, dan simbol. AES-256 kuat, tetapi program bisa menebak password yang pendek. Jangan kirim password di email yang sama dengan filenya.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: [
      "proteksi pdf",
      "kunci pdf",
      "password pdf",
      "memberi password pdf",
      "cara mengunci pdf",
      "enkripsi pdf",
      "kasih password pdf",
      "proteksi pdf online gratis",
    ],
  },

  // ---- penampil: hanya menampilkan file ----
  {
    id: "pdf-viewer",
    slug: "baca-pdf",
    kind: "view",
    nav: true,
    priority: 7,
    name: "Baca PDF",
    navLabel: "Baca",
    title: "Buka File PDF Online – PDF Reader Gratis, Tanpa Unggah",
    description:
      "Buka dan baca file PDF di browser Anda. Gulir halaman, perbesar, dan cetak. PDF reader gratis tanpa unggah, tanpa akun, dan tanpa perlu memasang Adobe.",
    h1: "Buka dan baca PDF",
    intro: "Buka file PDF dan baca di browser Anda. Gulir halaman, perbesar, dan cetak. File tetap di perangkat Anda.",
    actionLabel: "Cetak",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya.",
      "Gulir halaman. Gunakan bilah alat untuk pindah ke halaman tertentu, memperbesar, memperkecil, atau menyesuaikan halaman dengan lebar jendela.",
      "Klik Cetak untuk membuka file di tab baru dan mencetaknya dari browser Anda. Klik tanda X di samping nama file untuk membuka file lain.",
    ],
    faq: [
      {
        q: "Bagaimana cara membuka file PDF tanpa Adobe?",
        a: "Seret file ke halaman ini, atau klik kotak dan pilih filenya. Anda tidak perlu Adobe Acrobat atau Adobe Reader. Halaman ini menggambar PDF dengan mesin open-source yang sama dengan yang dipakai Firefox. Berfungsi di Chrome, Edge, Firefox, dan Safari. Tidak ada yang perlu dipasang.",
      },
      {
        q: "Apa itu PDF reader?",
        a: "PDF reader adalah program yang membuka file PDF dan menampilkan halamannya di layar Anda. Adobe Reader adalah salah satu contohnya. Kebanyakan browser juga punya PDF reader bawaan. Halaman ini adalah PDF reader yang berjalan sebagai halaman web. Setiap halaman digambar di browser Anda dan file tidak dikirim ke mana pun.",
      },
      {
        q: "Apakah PDF saya diunggah saat dibuka?",
        a: "Tidak. File dibaca oleh JavaScript di perangkat Anda sendiri dan digambar di layar Anda di sana juga. Tidak ada yang dikirim ke server. Anda bisa memeriksanya di panel jaringan browser: tidak ada permintaan yang membawa file Anda.",
      },
      {
        q: "Apakah penampil ini bisa dipakai offline?",
        a: "Sebagian besar bisa. File dibuka di browser Anda, dan tidak ada data yang dikirim ke server. Kode penampil dan beberapa font dimuat dari situs kami saat pertama kali dibutuhkan. Buka halaman ini dan satu file saat Anda online. Setelah itu, Anda bisa membuka file lain tanpa koneksi sampai tab ditutup.",
      },
      {
        q: "Bisakah saya mencetak PDF?",
        a: "Bisa. Klik Cetak di bilah alat. File terbuka di tab baru dalam penampil PDF browser Anda. Tekan Ctrl+P (Cmd+P di Mac) di sana untuk mencetaknya. Browser mencetak file asli, jadi teks tetap tajam di kertas.",
      },
      {
        q: "Bisakah saya memperbesar tampilan?",
        a: "Bisa. Gunakan tombol plus dan minus di bilah alat, atau klik Sesuaikan lebar agar halaman selebar jendela. Setiap halaman digambar ulang pada ukuran baru, jadi teks tetap tajam pada setiap tingkat perbesaran.",
      },
      {
        q: "Bisakah saya mengedit PDF di sini?",
        a: "Tidak. Alat ini hanya menampilkan file. Untuk menambahkan teks, penutup putih, gambar, atau tanda tangan di atas halaman, gunakan alat Edit PDF. Untuk memutar, mengurutkan, menghapus, memisahkan, menggabungkan, atau mengubah halaman, gunakan alat lain di situs ini.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "baca pdf",
      "buka pdf",
      "buka file pdf",
      "pdf reader online",
      "pembaca pdf online",
      "lihat pdf online",
      "buka pdf tanpa adobe",
      "cara membuka file pdf",
    ],
  },

  // ---- edit: satu komponen, dua halaman ----
  {
    id: "edit-pdf",
    slug: "edit-pdf",
    kind: "edit",
    nav: true,
    priority: 5,
    name: "Edit PDF",
    navLabel: "Edit",
    title: "Edit PDF Online – Tambah Teks, Penutup Putih, Gambar, Gratis, Tanpa Unggah",
    description:
      "Edit PDF di browser Anda: tambah teks, tutup bagian dengan penutup putih, beri stabilo, sisipkan gambar, dan gambar tanda tangan. Gratis, tanpa unggah, tanpa akun.",
    h1: "Edit PDF",
    intro:
      "Tambahkan teks, penutup putih, stabilo, gambar, dan tanda tangan di atas halaman PDF. Alat ini tidak mengubah teks yang sudah ada di file; alat ini menempatkan konten baru di atasnya. Semua berjalan di browser Anda.",
    actionLabel: "Simpan PDF",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya. Pilih halaman di deretan sebelah kiri.",
      "Pilih alat di bilah alat. Klik halaman untuk menambahkan kotak teks, seret untuk membuat penutup putih atau stabilo, tambahkan gambar, atau gambar bebas dengan alat Pena. Seret item untuk memindahkannya, tarik sudutnya untuk mengubah ukuran, dan tekan Delete untuk menghapusnya.",
      "Klik Simpan PDF. File hasil edit langsung terunduh.",
    ],
    faq: [
      {
        q: "Apa saja yang bisa saya edit di PDF dengan alat ini?",
        a: "Anda bisa menempatkan konten baru di atas halaman mana pun: kotak teks, kotak putih (penutup putih), stabilo kuning, gambar (PNG atau JPG), dan coretan bebas dengan mouse atau jari. Anda bisa memindahkan, mengubah ukuran, dan menghapus setiap item sebelum menyimpan. Isi halaman asli tetap ada di bawahnya.",
      },
      {
        q: "Bisakah saya mengubah teks yang sudah ada di PDF?",
        a: "Tidak. Alat ini tidak mengedit teks yang sudah ada. Alat ini menambahkan konten baru di atas halaman. Untuk mengganti kata atau angka, buat kotak penutup putih di atasnya lalu tambahkan kotak teks di atas kotak itu. Teks lama tertutup di layar dan di kertas, tetapi tetap ada di dalam file, jadi program yang menyalin teks dari PDF masih bisa menemukannya.",
      },
      {
        q: "Bagaimana cara menandatangani PDF?",
        a: "Pilih alat Pena dan gambar tanda tangan Anda di halaman dengan mouse, stylus, atau jari. Atau pilih Gambar dan masukkan foto tanda tangan Anda dalam format PNG atau JPG. Pindahkan tanda tangan ke tempat yang tepat, ubah ukurannya, lalu klik Simpan PDF. Halaman Tanda Tangan PDF langsung dimulai dengan alat Pena.",
      },
      {
        q: "Apakah PDF saya diunggah ke server?",
        a: "Tidak. File dibuka oleh JavaScript di perangkat Anda sendiri. Hasil edit digambar ke dalam file dengan pustaka open-source pdf-lib di browser Anda. Tidak ada yang dikirim kepada kami. Anda bisa mematikan koneksi internet setelah halaman dimuat, dan alat tetap bekerja.",
      },
      {
        q: "Font apa yang bisa saya pakai?",
        a: "Helvetica, Times, dan Courier. Ketiganya adalah font standar PDF, jadi file tetap kecil dan setiap penampil PDF menampilkannya tanpa file font tambahan. Anda bisa mengatur ukuran dan warna setiap kotak teks.",
      },
      {
        q: "Mengapa karakter khusus muncul sebagai tanda tanya?",
        a: "Font standar PDF hanya berisi karakter Latin dari bahasa-bahasa Eropa Barat (set WinAnsi). Karakter di luar set itu, seperti aksara Tionghoa, emoji, atau beberapa simbol, tidak bisa dikodekan, jadi alat menulis tanda tanya sebagai gantinya. Ketik teks dengan huruf Latin, atau tambahkan sebagai gambar.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["sign-pdf", "organize-pdf", "pdf-viewer"],
    keywords: [
      "edit pdf",
      "mengedit pdf",
      "cara edit pdf",
      "edit pdf online",
      "edit pdf gratis",
      "pdf editor gratis",
      "tambah teks ke pdf",
      "edit pdf tanpa aplikasi",
    ],
  },
  {
    id: "sign-pdf",
    slug: "tanda-tangan-pdf",
    kind: "edit",
    nav: false,
    priority: 12,
    name: "Tanda Tangan PDF",
    navLabel: "Tanda tangan",
    title: "Tanda Tangan PDF Online – Gambar atau Pakai Foto Tanda Tangan, Gratis",
    description:
      "Tanda tangani PDF di browser Anda. Gambar tanda tangan dengan mouse atau jari, atau pakai foto tanda tangan, tempatkan, dan simpan. Gratis, tanpa unggah, tanpa akun.",
    h1: "Tanda tangani PDF",
    intro:
      "Gambar tanda tangan Anda di halaman, atau pakai foto tanda tangan Anda. Pindahkan ke posisi yang tepat, ubah ukurannya, dan simpan file. PDF tidak keluar dari perangkat Anda.",
    actionLabel: "Simpan PDF",
    steps: [
      "Seret PDF ke kotak, atau klik untuk memilihnya. Pilih halaman yang perlu ditandatangani di deretan sebelah kiri.",
      "Alat Pena sudah terpilih. Gambar tanda tangan Anda di halaman dengan mouse, stylus, atau jari. Atau klik Gambar dan masukkan file PNG atau JPG tanda tangan Anda. Seret ke tempatnya dan tarik sudutnya untuk mengubah ukuran. Gunakan alat Teks untuk menambahkan tanggal atau nama Anda.",
      "Klik Simpan PDF. File yang sudah ditandatangani langsung terunduh.",
    ],
    faq: [
      {
        q: "Bagaimana cara tanda tangan PDF tanpa mencetaknya?",
        a: "Tambahkan PDF dan gambar tanda tangan Anda di halaman dengan alat Pena. Anda bisa memakai mouse, stylus, atau jari di layar sentuh. Pindahkan dan ubah ukuran tanda tangan, lalu klik Simpan PDF. Tanda tangan menjadi bagian dari halaman. Tidak perlu printer dan tidak perlu scanner.",
      },
      {
        q: "Bisakah saya memakai foto tanda tangan saya?",
        a: "Bisa. Tanda tangani selembar kertas putih, foto atau scan, lalu simpan sebagai PNG atau JPG. Klik Gambar, pilih filenya, dan tempatkan di halaman. PNG dengan latar transparan tampak paling bagus. Gambar disematkan ke PDF dengan kualitas penuh.",
      },
      {
        q: "Apakah ini tanda tangan elektronik yang sah?",
        a: "Alat ini menggambar gambar tanda tangan Anda ke dalam halaman. Alat ini tidak menambahkan sertifikat digital dan tidak memeriksa siapa yang menandatangani. Banyak perjanjian menerima tanda tangan yang digambar, tetapi aturannya berbeda di setiap negara dan setiap kontrak. Jika pihak lain memerlukan tanda tangan berbasis sertifikat, gunakan layanan yang menerbitkannya.",
      },
      {
        q: "Bisakah saya tanda tangan di ponsel?",
        a: "Bisa. Halaman ini berfungsi di browser ponsel atau tablet. Gambar dengan jari atau stylus. Cubit untuk memperbesar browser jika kolomnya kecil. File tetap di ponsel.",
      },
      {
        q: "Bisakah saya menambahkan tanggal di samping tanda tangan?",
        a: "Bisa. Pilih alat Teks, klik halaman, lalu ketik tanggalnya. Anda bisa mengatur ukuran font dan warnanya. Seret kotak teks ke samping tanda tangan.",
      },
      {
        q: "Apakah dokumen yang saya tanda tangani diunggah?",
        a: "Tidak. PDF dan tanda tangan tetap di browser Anda. Tanda tangan digambar ke dalam file oleh JavaScript di perangkat Anda sendiri. Tidak ada yang dikirim kepada kami.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["edit-pdf", "protect-pdf", "merge-pdf"],
    keywords: [
      "tanda tangan pdf",
      "tanda tangan di pdf",
      "cara tanda tangan pdf",
      "tanda tangan digital pdf",
      "ttd pdf",
      "menambahkan tanda tangan ke pdf",
      "tanda tangan pdf online gratis",
    ],
    defaults: { tool: "draw" },
  },
];
