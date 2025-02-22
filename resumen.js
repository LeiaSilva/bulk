document.addEventListener("DOMContentLoaded", function () {
    /*-- DATOS QUE RECUPERA DEL LOCAL STORAGE = DATOS DE ENTREGA , PRODUCTOS Y SUMA TOTAL*/
    const resumenContainer = document.getElementById("containerResumenEntrega");

    const deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails"));

    if (deliveryDetails) {
        resumenContainer.innerHTML = `
            <p>Cliente: ${deliveryDetails.cliente}</p>
            <p>Transportista: ${deliveryDetails.transportista}</p>
            <p>Lugar de Entrega:${deliveryDetails.lugarEntrega}</p>
        `;
    } else {
        resumenContainer.innerHTML = "<p>No hay datos de entrega disponibles.</p>";
    }
    
    const productosCarrito = JSON.parse(localStorage.getItem("producto")) || [];
    const containerResumenCarrito = document.getElementById('containerResumenCarrito');
    const containerResumenTotal = document.getElementById('containerResumenTotalVenta');

    if (productosCarrito.length === 0) {
        containerResumenTotal.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    let totalCompra = 0;

    // Mostrar los productos en la página de resumen.html
    productosCarrito.forEach(producto => {
        const cardsResumen = document.createElement('div');
        const checkboxId = `checkbox-${producto.id}`;

        cardsResumen.className = 'containerResumenCarrito-cards';
        cardsResumen.innerHTML = `
        <div class="containerResumenCarrito-cards-content-img">
            <img src= ${producto.img}>
        </div>
        <div class ="containerResumenCarrito-cards-content-names">
            <h2>${producto.nombre}</h2>
            <h4>${producto.description}, ${producto.colorSeleccionado}</h4>
            <p>$${producto.precio}</p>
            <div class= "containerCantidad">
                <button class="restar">-</button>
                <span class="contador"> 1 </span>
                <button class= "sumar">+</button>
            </div>
        </div>
        <div class= "containerResumenCarrito-cards-content-icons">
            <ion-icon name="trash" class="trash"></ion-icon>
            <div class= "containerResumenCarrito-cards-content-icons-checkbox">
                <input type="checkbox" id="${checkboxId}" name="checkbox">
                <label for="${checkboxId}">Armado</label>
            </div>
        </div>
        `

        containerResumenCarrito.appendChild(cardsResumen);
        totalCompra += producto.precio;
    });
    containerResumenTotal.innerHTML = `
    <p>Total de la compra: $${totalCompra.toFixed(2)}</p>
    `
});
/*--BLOQUEAR PAGINA DE INICIO*/
window.addEventListener("popstate", function(event) {
    window.location.href = "inicio.html";
});


/*--EVENTO FINALIZAR VENTA--*/
const btnFinalizar = document.getElementById('btnFinalizar');
    
if (btnFinalizar) {
    btnFinalizar.addEventListener('click', function() {
        const containerCarrito = document.getElementById('containerCarritoCards');
        if (containerCarrito) containerCarrito.innerHTML = '';

        const contadorCarrito = document.getElementById('contadorCarrito');
        if (contadorCarrito) {
            contadorCarrito.textContent = '0';
            contadorCarrito.classList.add('oculto'); 
        }

        localStorage.removeItem('producto'); 
        localStorage.removeItem('contadorCarrito');

        window.location.href = "inicio.html";
    });
} else {
    console.error("No se encontró el botón Finalizar.");
}

















