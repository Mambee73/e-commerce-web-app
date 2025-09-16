const usuariosTest = [
  {
    nombre: "Admin",
    apellidos: "Test",
    email: "admin@tienda.cl",
    password: "admin123",
    telefono: "",
    region: "",
    direccion: "",
    rol: "admin",
    estado: "activo"
  },
  {
    nombre: "Cliente",
    apellidos: "Test",
    email: "cliente@correo.cl",
    password: "cliente123",
    telefono: "",
    region: "",
    direccion: "",
    rol: "cliente",
    estado: "activo"
  }
];

const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
if (usuariosGuardados.length === 0) {
  localStorage.setItem("usuarios", JSON.stringify(usuariosTest));
}

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email && u.password === password);
      if (usuario) {
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
        window.location.href = usuario.rol === "admin" ? "Admin.html" : "index.html";
      } else {
        alert("Credenciales incorrectas");
      }
    });
  }

  const formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombre").value.trim();
      const apellidos = document.getElementById("apellidos").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const password2 = document.getElementById("password2").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const region = document.getElementById("region").value.trim();
      const direccion = document.getElementById("direccion").value.trim();
      if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
      }
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      if (usuarios.some(u => u.email === email)) {
        alert("Este correo ya está registrado.");
        return;
      }
      const nuevoUsuario = {
        nombre,
        apellidos,
        email,
        password,
        telefono,
        region,
        direccion,
        rol: "cliente",
        estado: "activo"
      };
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "inicioSesion.html";
    });
  }

  const tablaProductos = document.querySelector("#tabla-productos");
  if (tablaProductos) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    tablaProductos.innerHTML = "";
    productos.forEach(producto => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precio.toLocaleString("es-CL")}</td>
        <td>${producto.stock}</td>
        <td>
          <a href="admin-productos-editar.html?id=${producto.id}" class="btn btn-warning btn-sm">
            <i class="bi bi-pencil-square"></i>
          </a>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${producto.id}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tablaProductos.appendChild(fila);
    });
  }

  const formNuevoProducto = document.getElementById("form-nuevo-producto");
  if (formNuevoProducto) {
    formNuevoProducto.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("id").value.trim();
      const nombre = document.getElementById("nombre").value.trim();
      const categoria = document.getElementById("categoria").value;
      const precio = parseInt(document.getElementById("precio").value);
      const stock = parseInt(document.getElementById("stock").value);
      const productos = JSON.parse(localStorage.getItem("productos")) || [];
      if (productos.some(p => p.id === id)) {
        alert("Ya existe un producto con ese ID.");
        return;
      }
      const nuevoProducto = { id, nombre, categoria, precio, stock };
      productos.push(nuevoProducto);
      localStorage.setItem("productos", JSON.stringify(productos));
      alert("Producto guardado exitosamente.");
      window.location.href = "AdminProductos.html";
    });
  }

  const formEditar = document.getElementById("form-editar-producto");
  if (formEditar) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos.find(p => p.id === id);
    if (!producto) {
      alert("Producto no encontrado.");
      window.location.href = "AdminProductos.html";
      return;
    }
    document.getElementById("id").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();
      producto.nombre = document.getElementById("nombre").value.trim();
      producto.categoria = document.getElementById("categoria").value;
      producto.precio = parseInt(document.getElementById("precio").value);
      producto.stock = parseInt(document.getElementById("stock").value);
      const actualizados = productos.map(p => p.id === id ? producto : p);
      localStorage.setItem("productos", JSON.stringify(actualizados));
      alert("Producto actualizado correctamente.");
      window.location.href = "AdminProductos.html";
    });
  }

  const tablaUsuarios = document.querySelector("#tabla-usuarios");
  if (tablaUsuarios) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    tablaUsuarios.innerHTML = "";
    usuarios.forEach((usuario, index) => {
      const estado = usuario.estado === "inactivo" ? "bg-secondary" : "bg-success";
      const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
      const rolCapitalizado = usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1);
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${String(index + 1).padStart(3, "0")}</td>
        <td>${nombreCompleto}</td>
        <td>${usuario.email}</td>
        <td>${rolCapitalizado}</td>
        <td><span class="badge ${estado}">${usuario.estado || "Activo"}</span></td>
        <td>
          <a href="admin-usuarios-editar.html?id=${index}" class="btn btn-warning btn-sm">
            <i class="bi bi-pencil-square"></i>
          </a>
          <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tablaUsuarios.appendChild(fila);
    });
  }
});

function eliminarProducto(id) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const actualizados = productos.filter(p => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(actualizados));
  location.reload();
}

function eliminarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios[index];
  if (usuario.email === "admin@tienda.cl") {
    alert("No puedes eliminar al usuario administrador de prueba.");
    return;
  }
  if (confirm(`¿Eliminar a ${usuario.nombre}? Esta acción no se puede deshacer.`)) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.reload();
  }
}
