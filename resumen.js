document.addEventListener("DOMContentLoaded", function () {
    /*-- DATOS QUE RECUPERA DEL LOCAL STORAGE = DATOS DE ENTREGA , PRODUCTOS Y SUMA TOTAL*/
    const resumenContainer = document.getElementById("containerResumenEntrega");

    const deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails"));

    if (deliveryDetails) {
        resumenContainer.innerHTML = `
            <p>Cliente: ${deliveryDetails.cliente}</p>
            <p>Transportista: ${deliveryDetails.transportista}</p>
            <p>Lugar de Entrega: ${deliveryDetails.lugarEntrega}</p>
            <p>Observaciones: ${deliveryDetails.observaciones}</p>
        `;
    } else {
        resumenContainer.innerHTML = "<p>No hay datos de entrega disponibles.</p>";
    }

    let productosCarrito = JSON.parse(localStorage.getItem("producto")) || [];
    const containerResumenCarrito = document.getElementById('containerResumenCarrito');
    const containerResumenTotal = document.getElementById('containerResumenTotalVenta');

    if (productosCarrito.length === 0) {
        containerResumenTotal.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    let totalCompra = 0;

    productosCarrito.forEach((producto, index) => {
        const cardsResumen = document.createElement('div');
        const checkboxId = `checkbox-${producto.id}`;

        cardsResumen.className = 'containerResumenCarrito-cards';
        cardsResumen.innerHTML = `
        <div class="containerResumenCarrito-cards-content-img">
            <img src="${producto.img}">
        </div>
        <div class="containerResumenCarrito-cards-content-names">
            <h2>${producto.nombre}</h2>
            <h4>${producto.description}, ${producto.colorSeleccionado}</h4>
            <p>$${producto.precio}</p>
            <div class="containerCantidad">
                <button class="restar" data-index="${index}">-</button>
                <span class="contador">${producto.cantidad || 1}</span>
                <button class="sumar" data-index="${index}">+</button>
            </div>
        </div>
        <div class="containerResumenCarrito-cards-content-icons">
            <ion-icon name="trash" class="trash" data-index="${index}"></ion-icon>
            <div class="containerResumenCarrito-cards-content-icons-checkbox">
                <input type="checkbox" id="${checkboxId}" name="checkbox" ${producto.armado ? "checked" : ""} data-index="${index}">
                <label for="${checkboxId}">Armado</label>
            </div>
        </div>
        `;

        containerResumenCarrito.appendChild(cardsResumen);
        totalCompra += producto.precio * (producto.cantidad || 1);
    });

    containerResumenTotal.innerHTML = `<p>Total de la compra: $${totalCompra.toFixed(2)}</p>`;

    function actualizarCarrito() {
        localStorage.setItem("producto", JSON.stringify(productosCarrito));
        location.reload(); // Recarga la página para reflejar los cambios
    }

    /*-- EVENTOS PARA MODIFICAR PRODUCTOS EN EL RESUMEN --*/
    containerResumenCarrito.addEventListener("click", function (event) {
        const index = event.target.dataset.index;

        if (index !== undefined) {
            if (event.target.classList.contains("sumar")) {
                productosCarrito[index].cantidad = (productosCarrito[index].cantidad || 1) + 1;
            } else if (event.target.classList.contains("restar")) {
                if (productosCarrito[index].cantidad > 1) {
                    productosCarrito[index].cantidad -= 1;
                } else {
                    productosCarrito.splice(index, 1);
                }
            } else if (event.target.classList.contains("trash")) {
                productosCarrito.splice(index, 1);
            }

            actualizarCarrito();
        }
    });

    /*-- EVENTO PARA MODIFICAR EL CHECKBOX DE ARMADO --*/
    containerResumenCarrito.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const index = event.target.dataset.index;
            productosCarrito[index].armado = event.target.checked;
            actualizarCarrito();
        }
    });
});

/*-- BLOQUEAR PAGINA DE INICIO */
window.addEventListener("popstate", function (event) {
    window.location.href = "inicio.html";
});

/*-- EVENTO FINALIZAR VENTA --*/
const btnFinalizar = document.getElementById('btnFinalizar');

if (btnFinalizar) {
    btnFinalizar.addEventListener('click', function () {
        const containerCarrito = document.getElementById('containerCarritoCards');
        if (containerCarrito) containerCarrito.innerHTML = '';

        const contadorCarrito = document.getElementById('contadorCarrito');
        if (contadorCarrito) {
            contadorCarrito.textContent = '0';
            contadorCarrito.classList.add('oculto');
        }

        localStorage.removeItem('producto');
        localStorage.removeItem('contadorCarrito');
        localStorage.removeItem('deliveryDetails');

        window.location.href = "inicio.html";
    });
} else {
    console.error("No se encontró el botón Finalizar.");
}



