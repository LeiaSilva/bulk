function agregarCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("producto")) || [];
    const indiceProducto = memoria.findIndex(item => item.id === producto.id);
    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
    } else {
        memoria[indiceProducto].cantidad += 1;
    }
    localStorage.setItem("producto", JSON.stringify(memoria));

    actualizarContadorCarrito();
}

function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = { ...producto }; 
    nuevoProducto.cantidad = 1; 
    return nuevoProducto;
}
function actualizarContadorCarrito() {
    const memoria = JSON.parse(localStorage.getItem("producto")) || [];

    const totalProductos = memoria.reduce((acc, item) => acc + item.cantidad, 0);

    const contadorCarrito = document.getElementById('contadorCarrito');

    if (totalProductos > 0) {
        contadorCarrito.textContent = totalProductos; 
        contadorCarrito.classList.add('visible');
        contadorCarrito.classList.remove('oculto');
    } else {
        contadorCarrito.classList.add('oculto');
        contadorCarrito.classList.remove('visible');
    }
}

actualizarContadorCarrito();
