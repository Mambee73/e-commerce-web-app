document.addEventListener('DOMContentLoaded', () => {

    const productos = [
        { id: 1, nombre: 'Consola de Juegos', precio: '299.990', stock: 15 },
        { id: 2, nombre: 'Mouse Inalámbrico', precio: '19.990', stock: 50 },
        { id: 3, nombre: 'Teclado Mecánico', precio: '59.990', stock: 30 },
        { id: 4, nombre: 'Monitor 27 pulgadas', precio: '199.990', stock: 25 },
        { id: 5, nombre: 'Audífonos Bluetooth', precio: '34.990', stock: 40 }
    ];

    const blogs = [
        { id: 1, titulo: '¡Adelantamos la Venta de verano!', fecha: '10 de septiembre de 2025', autor: 'Admin' },
        { id: 2, titulo: 'Nuevos Productos en la Tienda', fecha: '15 de febrero de 2025', autor: 'Admin' },
        { id: 3, titulo: 'Consejos para el cuidado de tus gadgets', fecha: '20 de febrero de 2025', autor: 'Editor' },
        { id: 4, titulo: 'Reseña del nuevo modelo de smartphone', fecha: '01 de marzo de 2025', autor: 'Admin' }
    ];


    function displayProducts() {
        const tableBody = document.getElementById('products-table-body');
        if (!tableBody) return; 

        let html = '';
        productos.forEach(producto => {
            html += `
                <tr>
                    <th scope="row">${producto.id}</th>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editItem('producto', ${producto.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem('producto', ${producto.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }


    function displayBlogs() {
        const tableBody = document.getElementById('blogs-table-body');
        if (!tableBody) return; 

        let html = '';
        blogs.forEach(blog => {
            html += `
                <tr>
                    <th scope="row">${blog.id}</th>
                    <td>${blog.titulo}</td>
                    <td>${blog.fecha}</td>
                    <td>${blog.autor}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editItem('blog', ${blog.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteItem('blog', ${blog.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        tableBody.innerHTML = html;
    }


    window.editItem = function(type, id) {
        alert(`Simulando la edición del ${type} con ID: ${id}`);

    };

    window.deleteItem = function(type, id) {
        if (confirm(`¿Estás seguro de que quieres eliminar este ${type} con ID: ${id}?`)) {
            alert(`Simulando la eliminación del ${type} con ID: ${id}`);
        }
    };


    displayProducts();
    displayBlogs();
});