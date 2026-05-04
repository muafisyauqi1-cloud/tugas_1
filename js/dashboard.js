document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  // Greeting berdasarkan waktu lokal
  const hour = new Date().getHours();
  let greeting = "";
  let icon = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Selamat Pagi";
    icon = "fa-sun";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Selamat Siang";
    icon = "fa-cloud-sun";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Selamat Sore";
    icon = "fa-sun";
  } else {
    greeting = "Selamat Malam";
    icon = "fa-moon";
  }

  document.getElementById("greetingMessage").innerHTML =
    `<i class="fas ${icon}"></i><span>${greeting}, ${user.nama}</span>`;
  document.getElementById("userNameDisplay").innerHTML = user.nama;

  const roleSpan = document.getElementById("userRoleDisplay");
  if (roleSpan) roleSpan.innerHTML = user.role;

  // Hitung statistik
  const totalStok = dataBahanAjar.reduce((sum, item) => sum + item.stok, 0);
  document.getElementById("totalBahanAjar").innerText =
    totalStok.toLocaleString();

  const uniqueLokasi = [
    ...new Set(dataBahanAjar.map((item) => item.kodeLokasi)),
  ];
  document.getElementById("totalLokasi").innerText = uniqueLokasi.length;

  document.getElementById("totalPengguna").innerText = dataPengguna.length;

  // Tabel bahan ajar
  const tbody = document.getElementById("recentOrdersBody");
  if (tbody) {
    tbody.innerHTML = dataBahanAjar
      .map(
        (item) => `
            <tr>
                <td><strong>${item.kodeBarang}</strong></td>
                <td>${item.namaBarang}</td>
                <td><span class="status-badge" style="background:#eef2ff; color:#0f3b5f;">${item.jenisBarang}</span></td>
                <td>${item.stok} pcs</td>
                <td>${item.kodeLokasi}</td>
            </tr>
        `,
      )
      .join("");
  }

  // Dropdown menu
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelector(".nav-dropdown-menu").classList.toggle("show");
    });
  }

  // Tutup dropdown jika klik di luar
  document.addEventListener("click", function (e) {
    const dropdown = document.querySelector(".nav-dropdown");
    if (dropdown && !dropdown.contains(e.target)) {
      document.querySelector(".nav-dropdown-menu").classList.remove("show");
    }
  });
});
