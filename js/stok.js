// ========== STOK.JS - VERSI DIPERBAIKI ==========

// Header user
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (user && document.getElementById("headerUserName")) {
  document.getElementById("headerUserName").innerHTML = user.nama;
}

// Cek login, jika belum login redirect ke index.html
if (!user) {
  window.location.href = "index.html";
}

// Tampilkan data stok dengan tombol View
function renderStok() {
  const tbody = document.getElementById("stokTableBody");
  if (!tbody) return;

  if (dataBahanAjar.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="7" style="text-align:center;">Belum ada data bahan ajar</td></tr>';
    return;
  }

  tbody.innerHTML = dataBahanAjar
    .map(
      (item, idx) => `
        <tr>
            <td>${item.kodeLokasi}</td>
            <td><strong>${item.kodeBarang}</strong></td>
            <td>${item.namaBarang}</td>
            <td><span class="status-badge" style="background:#eef2ff; color:#0f3b5f;">${item.jenisBarang}</span></td>
            <td>Edisi ${item.edisi}</td>
            <td><strong>${item.stok}</strong> pcs</td>
            <td>
                <button class="btn-view" onclick="viewDetail(${idx})"><i class="fas fa-eye"></i> View</button>
                <button onclick="hapusBaris(${idx})" class="btn-danger-small"><i class="fas fa-trash"></i> Hapus</button>
            </td>
        </tr>
    `,
    )
    .join("");
}

// Fungsi untuk menampilkan detail dengan glassmorphism modal
window.viewDetail = (idx) => {
  const item = dataBahanAjar[idx];
  if (!item) return;

  // Isi data ke modal detail
  document.getElementById("detailKodeLokasi").innerText = item.kodeLokasi;
  document.getElementById("detailKodeBarang").innerText = item.kodeBarang;
  document.getElementById("detailNamaBarang").innerText = item.namaBarang;
  document.getElementById("detailJenisBarang").innerText = item.jenisBarang;
  document.getElementById("detailEdisi").innerText = `Edisi ${item.edisi}`;
  document.getElementById("detailStok").innerHTML = `${item.stok} pcs`;

  // Status stok dengan warna
  let statusText = "";
  let statusColor = "";
  if (item.stok > 100) {
    statusText = "✅ Stok Aman";
    statusColor = "#10b981";
  } else if (item.stok > 50) {
    statusText = "⚠️ Stok Menipis";
    statusColor = "#f59e0b";
  } else {
    statusText = "🔴 Stok Kritis";
    statusColor = "#e11d48";
  }

  document.getElementById("detailStatus").innerHTML =
    `<span style="color: ${statusColor}; font-weight: 600;">${statusText}</span>`;

  // Tampilkan modal glass
  document.getElementById("modalDetailStok").style.display = "flex";
};

// Fungsi tutup modal detail
window.closeDetailModal = () => {
  document.getElementById("modalDetailStok").style.display = "none";
};

// Hapus baris
window.hapusBaris = (idx) => {
  if (
    confirm("Yakin ingin menghapus data " + dataBahanAjar[idx].namaBarang + "?")
  ) {
    dataBahanAjar.splice(idx, 1);
    renderStok();
    alert("Data berhasil dihapus!");
  }
};

// Tombol tambah
const tambahBtn = document.getElementById("tambahStokBtn");
if (tambahBtn) {
  tambahBtn.addEventListener("click", () => {
    document.getElementById("modalTambahStok").style.display = "flex";
  });
}

// Simpan stok baru
const simpanBtn = document.getElementById("simpanStokBtn");
if (simpanBtn) {
  simpanBtn.addEventListener("click", () => {
    const newKodeLokasi = document.getElementById("newKodeLokasi").value.trim();
    const newKodeBarang = document.getElementById("newKodeBarang").value.trim();
    const newNamaBarang = document.getElementById("newNamaBarang").value.trim();
    const newJenisBarang = document.getElementById("newJenisBarang").value;
    const newEdisi = document.getElementById("newEdisi").value.trim();
    const newStok = parseInt(document.getElementById("newStok").value) || 0;

    if (!newKodeBarang || !newNamaBarang) {
      alert("Harap isi Kode Barang dan Nama Barang!");
      return;
    }

    const newData = {
      kodeLokasi: newKodeLokasi || "0NEW01",
      kodeBarang: newKodeBarang,
      namaBarang: newNamaBarang,
      jenisBarang: newJenisBarang,
      edisi: newEdisi || "1",
      stok: newStok,
    };

    dataBahanAjar.push(newData);
    renderStok();

    // Tutup modal
    document.getElementById("modalTambahStok").style.display = "none";

    // Reset form
    document.getElementById("newKodeLokasi").value = "";
    document.getElementById("newKodeBarang").value = "";
    document.getElementById("newNamaBarang").value = "";
    document.getElementById("newEdisi").value = "";
    document.getElementById("newStok").value = "";

    alert("Data berhasil ditambahkan!");
  });
}

// Close modal tambah (tombol X)
document.querySelectorAll("#modalTambahStok .close").forEach((close) => {
  close.onclick = () => {
    document.getElementById("modalTambahStok").style.display = "none";
  };
});

// Close modal detail (tombol X)
const closeDetailBtn = document.querySelector(".close-detail");
if (closeDetailBtn) {
  closeDetailBtn.onclick = () => {
    document.getElementById("modalDetailStok").style.display = "none";
  };
}

// Klik di luar modal untuk menutup
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
  if (event.target.classList.contains("glass-modal")) {
    event.target.style.display = "none";
  }
};

// Initial render
renderStok();
