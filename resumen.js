document.addEventListener("DOMContentLoaded", function () {
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
        location.reload();
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
                    verificarUltimoProducto(index);
                    return;
                }
            } else if (event.target.classList.contains("trash")) {
                verificarUltimoProducto(index);
                return;
            }

            actualizarCarrito();
        }
    });

    function verificarUltimoProducto(index) {
        if (productosCarrito.length === 1) {
            Swal.fire({
                title: "¿Desea cancelar la venta?",
                text: "Si cancela, se eliminarán todos los datos y volverá al inicio.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, cancelar",
                cancelButtonText: "No, seguir",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("producto");
                    localStorage.removeItem("contadorCarrito");
                    localStorage.removeItem("deliveryDetails");
                    localStorage.removeItem('currentStep');
                    window.location.href = "inicio.html";
                }
            });
        } else {
            productosCarrito.splice(index, 1);
            actualizarCarrito();
        }
    }

    /*-- EVENTO PARA MODIFICAR EL CHECKBOX DE ARMADO --*/
    containerResumenCarrito.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const index = event.target.dataset.index;
            productosCarrito[index].armado = event.target.checked;
            actualizarCarrito();
        }
    });

    /*-- EVENTO PARA EL BOTÓN FINALIZAR --*/
    const btnFinalizar = document.getElementById("btnFinalizar");

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function () {
            Swal.fire({
                title: "¿Confirmar finalización?",
                text: "Se eliminarán los datos y volverás al inicio.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Finalizar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Borrar datos del localStorage
                    localStorage.removeItem("producto");
                    localStorage.removeItem("contadorCarrito");
                    localStorage.removeItem("deliveryDetails");
                    localStorage.removeItem("currentStep");

                    // Redirigir al inicio
                    window.location.href = "inicio.html";
                }
            });
        });
    }
});
