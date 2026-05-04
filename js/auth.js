// Ambil elemen
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      alert(`Login berhasil! Selamat datang ${user.nama}`);
      window.location.href = "dashboard.html";
    } else {
      alert("Email/Password yang anda masukkan salah!");
    }
  });
}

// Modal handlers
const lupaBtn = document.getElementById("lupaPasswordBtn");

if (lupaBtn) {
  lupaBtn.onclick = () =>
    (document.getElementById("lupaModal").style.display = "flex");
}

// Close modal
document.querySelectorAll(".close").forEach((close) => {
  close.onclick = () => {
    document
      .querySelectorAll(".modal")
      .forEach((m) => (m.style.display = "none"));
  };
});

// Reset password
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
  resetBtn.onclick = () => {
    const email = document.getElementById("resetEmail").value;
    const user = dataPengguna.find((u) => u.email === email);
    if (user) {
      alert(`Link reset password telah dikirim ke ${email}`);
      document.getElementById("lupaModal").style.display = "none";
    } else {
      alert("Email tidak terdaftar!");
    }
  };
}

// Klik di luar modal untuk menutup
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};
