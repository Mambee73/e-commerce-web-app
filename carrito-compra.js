document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-agregar-carrito");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.name;
      const precio = parseInt(boton.dataset.price);

      if (!nombre || isNaN(precio)) {
        alert("Error: Datos del producto incompletos");
        return;
      }

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existente = cartItems.find(item => item.name === nombre);

      if (existente) {
        existente.quantity += 1;
      } else {
        cartItems.push({ name: nombre, price: precio, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert(`${nombre} ha sido agregado al carrito.`);
    });
  });

  if (document.getElementById("cart-items")) {
    updateCartDisplay();
  }
});

function updateCartDisplay() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartList || !cartTotal) return;

  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.className = "d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded";

    const info = document.createElement("div");
    info.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity} CLP`;

    const controls = document.createElement("div");
    controls.className = "d-flex gap-2";

    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.className = "btn btn-sm btn-outline-primary";
    minus.onclick = () => changeQuantity(item.name, -1);

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.className = "btn btn-sm btn-outline-primary";
    plus.onclick = () => changeQuantity(item.name, 1);

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.className = "btn btn-sm btn-danger";
    eliminar.onclick = () => {
      if (confirm(`¿Eliminar ${item.name} del carrito?`)) {
        removeFromCart(item.name);
      }
    };

    controls.appendChild(minus);
    controls.appendChild(plus);
    controls.appendChild(eliminar);

    li.appendChild(info);
    li.appendChild(controls);
    cartList.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toLocaleString("es-CL")} CLP`;
}

function changeQuantity(name, change) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = cartItems.find(i => i.name === name);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(i => i.name !== name);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartDisplay();
  }
}

function removeFromCart(name) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter(i => i.name !== name);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartDisplay();
}

function clearCart() {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    localStorage.removeItem("cartItems");
    updateCartDisplay();
  }
}
