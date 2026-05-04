// ========== TRACKING.JS - VERSI FINAL (TANPA DUPLIKASI) ==========

// Header user
const user = JSON.parse(localStorage.getItem("loggedUser"));
if (user && document.getElementById("headerUserName")) {
  document.getElementById("headerUserName").innerHTML = user.nama;
}

// Cek apakah user sudah login
if (!user) {
  window.location.href = "index.html";
}

// Fungsi untuk mendapatkan progress berdasarkan status
function getProgressFromStatus(status) {
  switch (status) {
    case "Dikirim":
      return 30;
    case "Dalam Perjalanan":
      return 60;
    case "Selesai":
      return 100;
    default:
      return 0;
  }
}

// Fungsi untuk mendapatkan class badge
function getBadgeClass(status) {
  switch (status) {
    case "Dikirim":
      return "dikirim";
    case "Dalam Perjalanan":
      return "perjalanan";
    case "Selesai":
      return "selesai";
    default:
      return "";
  }
}

// Fungsi untuk menampilkan detail tracking berdasarkan data
function displayTrackingDetail(delivery) {
  if (!delivery) return;

  document.getElementById("trackingResult").style.display = "block";
  document.getElementById("notFound").style.display = "none";

  // Isi data detail
  document.getElementById("nomorDO").innerText = delivery.nomorDO;
  document.getElementById("namaMahasiswa").innerText = delivery.nama;
  document.getElementById("ekspedisi").innerText = delivery.ekspedisi;
  document.getElementById("tanggalKirim").innerText = delivery.tanggalKirim;
  document.getElementById("jenisPaket").innerText = delivery.jenisPaket;
  document.getElementById("kodePaket").innerText = delivery.paket;
  document.getElementById("totalBayar").innerText = delivery.total;

  // Status dan progress
  const statusText = document.getElementById("statusBadge");
  const progressBar = document.getElementById("progressBar");

  statusText.className = `status-badge ${getBadgeClass(delivery.status)}`;
  statusText.innerText = delivery.status;

  const progressValue = getProgressFromStatus(delivery.status);
  progressBar.style.width = `${progressValue}%`;

  // Timeline
  const timeline = document.getElementById("timeline");
  if (delivery.perjalanan && delivery.perjalanan.length > 0) {
    timeline.innerHTML = delivery.perjalanan
      .map(
        (p) => `
            <div class="timeline-item">
                <div class="timeline-time">
                    <i class="far fa-calendar-alt"></i> ${p.waktu}
                </div>
                <div class="timeline-desc">
                    <i class="fas fa-circle" style="font-size: 8px; color: #0f3b5f; margin-right: 8px;"></i>
                    ${p.keterangan}
                </div>
            </div>
        `,
      )
      .join("");
  } else {
    timeline.innerHTML = "<p>Tidak ada riwayat perjalanan</p>";
  }
}

// Fungsi untuk mencari dan menampilkan tracking
function searchAndDisplay(doNum) {
  if (!doNum) {
    alert("Silakan masukkan Nomor Delivery Order terlebih dahulu!");
    return;
  }

  const delivery = dataTracking[doNum];

  if (delivery) {
    displayTrackingDetail(delivery);
  } else {
    document.getElementById("trackingResult").style.display = "none";
    document.getElementById("notFound").style.display = "block";
  }
}

// ========== RENDER TABEL DAFTAR DO ==========
function renderDoTable() {
  const tbody = document.getElementById("doTableBody");
  if (!tbody) return;

  const doList = Object.values(dataTracking);

  if (doList.length === 0) {
    tbody.innerHTML =
      '｜｜DSML｜｜<td colspan="6" style="text-align:center;">Belum ada data pengiriman</td></tr>';
    return;
  }

  tbody.innerHTML = doList
    .map(
      (delivery) => `
        <tr>
            <td><strong>${delivery.nomorDO}</strong></td>
            <td>${delivery.nama}</td>
            <td><span class="status-badge ${getBadgeClass(delivery.status)}">${delivery.status}</span></td>
            <td>${delivery.ekspedisi}</td>
            <td>${delivery.tanggalKirim}</td>
            <td>
                <button class="btn-view-do" onclick="searchByDO('${delivery.nomorDO}')">
                    <i class="fas fa-search"></i> Lihat Detail
                </button>
            </td>
        </tr>
    `,
    )
    .join("");

  // Tambahkan event onclick ke seluruh baris tabel (klik baris untuk mencari)
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    row.style.cursor = "pointer";
    row.addEventListener("click", (e) => {
      // Jangan trigger jika yang diklik adalah button
      if (e.target.tagName !== "BUTTON" && !e.target.closest("button")) {
        const doNum = row.cells[0].innerText.trim();
        searchByDO(doNum);
      }
    });
  });
}

// Fungsi untuk mencari berdasarkan nomor DO (dipanggil dari tombol atau klik baris)
window.searchByDO = (doNum) => {
  document.getElementById("doNumber").value = doNum;
  searchAndDisplay(doNum);
};

// ========== EVENT LISTENER ==========
const cariBtn = document.getElementById("cariBtn");
const doInput = document.getElementById("doNumber");

if (cariBtn) {
  cariBtn.addEventListener("click", () => {
    const doNum = doInput.value.trim();
    searchAndDisplay(doNum);
  });
}

// Event Enter pada input
if (doInput) {
  doInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      cariBtn.click();
    }
  });
}

// ========== DROPDOWN MENU ==========
const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
if (dropdownToggle) {
  dropdownToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelector(".nav-dropdown-menu").classList.toggle("show");
  });
}

document.addEventListener("click", function (e) {
  const dropdown = document.querySelector(".nav-dropdown");
  if (dropdown && !dropdown.contains(e.target)) {
    document.querySelector(".nav-dropdown-menu").classList.remove("show");
  }
});

// ========== INITIAL RENDER ==========
renderDoTable();
