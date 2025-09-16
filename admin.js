
const usuarios = [
  {
    email: "admin@tienda.cl",
    password: "admin123",
    rol: "admin"
  },
  {
    email: "cliente@correo.cl",
    password: "cliente123",
    rol: "cliente"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const usuario = usuarios.find(u => u.email === email && u.password === password);

      if (usuario) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

        if (usuario.rol === "admin") {
          window.location.href = "Admin.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        alert("Credenciales incorrectas");
      }
    });
  }
});
