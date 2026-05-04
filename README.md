# Sistem Autentikasi Sederhana

Sistem login dan registrasi menggunakan HTML, CSS (Tailwind), dan JavaScript.

## Fitur

- Login dengan data dummy dari `js/data.js`
- Registrasi akun baru (disimpan di localStorage) menggunakan modal
- Tampilan menggunakan Tailwind CSS untuk desain yang modern

## Cara Menjalankan

1. Buka `index.html` di browser (gunakan server lokal untuk localStorage berfungsi dengan baik, misalnya dengan Python: `python -m http.server` atau ekstensi VS Code Live Server).

## Data Dummy

Pengguna dummy tersedia di `js/data.js`:

- rina@ut.ac.id / rina123
- agus@ut.ac.id / agus123
- siti@ut.ac.id / siti123
- doni@ut.ac.id / doni123
- admin@ut.ac.id / admin123

## File

- `index.html`: Struktur HTML
- `style.css`: Styling
- `auth.js`: Logika autentikasi
- `js/data.js`: Data dummy pengguna
