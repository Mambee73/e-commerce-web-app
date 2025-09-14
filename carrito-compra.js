let cart = []; 
let total = 0; 
function addToCart(productName, price) { 
    if (!productName || !price) { 
        alert('Error: Datos del producto incompletos'); return; } 
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
        let existing = cartItems.find(item => item.name === productName); 
        if (existing) { existing.quantity += 1; } else 
            { cartItems.push({ name: productName, price: Number(price), quantity: 1 }); 
    } 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    alert(productName + " ha sido agregado al carrito."); 
    window.location.href = 'carrito.html'; }
function removeFromCart(productName) { 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    cartItems = cartItems.filter(item => item.name !== productName); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    updateCartDisplay();
} 
function changeQuantity(productName, change) { 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    let item = cartItems.find(item => item.name === productName); 
    if (item) { item.quantity += change; 
        if (item.quantity <= 0) { 
            cartItems = cartItems.filter(item => item.name !== productName); } 
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
            updateCartDisplay(); } 
        } 
function updateCartDisplay() { 
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    let cartList = document.getElementById('cart-items'); 
    let cartTotal = document.getElementById('cart-total'); 
    if (cartList && cartTotal) { 
        cartList.innerHTML = ''; 
        let total = 0; cartItems.forEach(item => { 
            if (item.name && !isNaN(item.price) && !isNaN(item.quantity)) { 
                let li = document.createElement('li'); 
                li.style.cssText = ` display: flex; justify-content: space-between; align-items: center; padding: 10px; margin-bottom: 10px; background: #f8f9fa; border-radius: 8px; `; 
                let itemInfo = document.createElement('div'); 
                itemInfo.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity} CLP`; 
                let controls = document.createElement('div'); 
                controls.style.cssText = 'display: flex; align-items: center; gap: 10px;'; 
                let minusBtn = document.createElement('button'); 
                minusBtn.textContent = '-'; 
                minusBtn.style.cssText = ` background: #4299e1; color: white; border: none; width: 30px; height: 30px; border-radius: 6px; cursor: pointer; `; 
                minusBtn.onclick = () => changeQuantity(item.name, -1); 
                let plusBtn = document.createElement('button'); 
                plusBtn.textContent = '+';
                plusBtn.style.cssText = ` background: #4299e1; color: white; border: none; width: 30px; height: 30px; border-radius: 6px; cursor: pointer; `; 
                plusBtn.onclick = () => changeQuantity(item.name, 1); 
                let deleteBtn = document.createElement('button'); 
                deleteBtn.textContent = 'Eliminar'; 
                deleteBtn.style.cssText = ` background: #e53e3e; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 12px; `; 
                deleteBtn.onclick = () => { if (confirm(`¿Eliminar ${item.name} del carrito?`)) { removeFromCart(item.name); } }; 
                controls.appendChild(minusBtn); controls.appendChild(plusBtn); 
                controls.appendChild(deleteBtn); 
                li.appendChild(itemInfo); 
                li.appendChild(controls); 
                cartList.appendChild(li); 
                total += item.price * item.quantity; } }); 
                cartTotal.textContent = `Total: $${total} CLP`; 
                } } 
function clearCart() { 
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) { localStorage.removeItem('cartItems'); 
    updateCartDisplay(); } } 
    document.addEventListener('DOMContentLoaded', function() { 
        if (document.getElementById('cart-items')) 
            { updateCartDisplay(); 

            } });