const productos = [
    {
        id: 1,
        nombre: 'MESA EAMES',
        description: ' 1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
        colores: ['blanco', 'negro', 'rojo', 'azul', 'amarillo', 'verde', 'bordo', 'gris'],
    },
    {
        id: 2,
        nombre: 'SILLON MESH ALTO- SA 4006 ',
        description: ' 1.40 X 0.90',
        stock: 55,
        precio: 83.547,
        codigo: '10450013',
        img: '../assets/10450013.jpeg',
        colores: ['blanco', 'negro', 'rojo'],
    },
    {
        id: 3,
        nombre: 'SILLA EAMES ',
        description: ' 1.40 X 0.90',
        stock: 57,
        precio: 91.116,
        codigo: '07915003',
        img: '../assets/07915003.jpg',
        colores: ['blanco', 'negro'],
    },
    {
        id: 4,
        nombre: 'MESA EAMES',
        description: '1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
        colores: ['blanco', 'negro', 'rojo', 'azul', 'bordo', 'gris'],
    },
    {
        id: 5,
        nombre: 'MESA EAMES',
        description: '1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
        colores: ['blanco', 'negro', 'rojo', 'azul', 'amarillo', 'verde', 'bordo', 'gris'],
    },
    {
        id: 6,
        nombre: 'MESA EAMES',
        description: '1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
        colores: ['blanco', 'negro', 'rojo', 'azul', 'amarillo', 'verde', 'bordo', 'gris'],
    },
];

/*--CREAR CARDS DE PRODUCTOS--*/

const carrito = [];
const containerProducto = document.getElementById('containerProducto');
const containerCarrito = document.getElementById('containerCarritoCards');

function crearCards(productos) {
    productos.forEach(producto => {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
        <div class="cardImg">
            <img src= ${producto.img}>
            <span>${producto.codigo}</span>
            </div>
        <div class= "cardContent">
            <h2>${producto.nombre}</h2>
            <h3>${producto.description}</h3>
            <p>$${producto.precio} <small>+ <span>IVA</span></small></p>
            <div class = "cardContent-btns">
                <button class= "cardContent-compra" id= "comprar"> Añadir</button>
                <select class="cardContent-btn-opciones"></select>
            </div>
        </div>
        `

        containerProducto.appendChild(newCard);
        /*--CREAR SELECCION DE COLORES--*/
        const selectorColor = newCard.querySelector(".cardContent-btn-opciones");
;

        const defaultOptionColor = document.createElement("option");
        defaultOptionColor.value = "";
        defaultOptionColor.textContent = "Color";
        defaultOptionColor.disabled = true;
        defaultOptionColor.selected = true;
        selectorColor.appendChild(defaultOptionColor);

        producto.colores.forEach((color) => {
            let option = document.createElement("option")
            option.value = color;
            option.textContent = color;
            selectorColor.appendChild(option);
        })

        newCard.querySelectorAll(".cardContent-compra")[0].addEventListener('click', () => {
            const colorSeleccionado = selectorColor.value
            if(!colorSeleccionado){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No has seleccionado un color!",
                    confirmButtonText: 'Entendido',
                  });
                return;
            }
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                description: producto.description,
                stock: producto.stock,
                precio: producto.precio,
                codigo: producto.codigo,
                img: producto.img,
                colorSeleccionado: colorSeleccionado , 
                cantidad : 1,
            });
            agregarProductosCarrito(productos , colorSeleccionado);
            agregarCarrito(producto);
            actualizarContadorCarrito();
            actualizarTotalCompra();
            localStorage.setItem("producto", JSON.stringify(carrito));

            /*--AGREGAR CARDS A CARRITO--*/
            function agregarProductosCarrito() {
                const productoExistente = Array.from(containerCarrito.children).find(card => card.querySelector('img').getAttribute('src') === producto.img);


                if (productoExistente) {
                    const contador = productoExistente.querySelector('.contador');
                    let cantidadActual = parseInt(contador.textContent);
                    contador.textContent = cantidadActual + 1;

                } else {
                    const cardsCarrito = document.createElement('div');
                    const checkboxId = `checkbox-${producto.id}`;

                    cardsCarrito.className = 'containerCarritoCards-content';
                    cardsCarrito.innerHTML = `
                    <div class="containerCarritoCards-content-img">
                        <img src= ${producto.img}>
                    </div>
                    <div class ="containerCarritoCards-content-names">
                        <h5>${producto.nombre}</h2>
                        <h6 class="containerCarritoCards-content-names-description">${producto.description}, ${colorSeleccionado}</h6>
                        <p>$${producto.precio}</p>
                        <div class= "containerCantidad">
                            <button class="restar">-</button>
                            <span class="contador"> 1 </span>
                            <button class= "sumar">+</button>
                        </div>
                    </div>
                    <div class= "containerCarritoCards-content-icons">
                        <ion-icon name="trash" class="trash"></ion-icon>
                        <div class= "containerCarritoCards-content-icons-checkbox">
                            <input type="checkbox" id="${checkboxId}" name="checkbox">
                            <label for="${checkboxId}">Armado</label>
                        </div>
                    </div>
                    ` 
                    containerCarrito.appendChild(cardsCarrito);
                    carritoBtn();
                    agregarCantidadCarrito();
                    actualizarContadorCarrito();
                    actualizarTotalCompra();

                }
                mostrarMensajeCarritoVacio()
            }
        });
    });
}
crearCards(productos);


/*--ELIMINA PRODUCTOS DEL CARRITO--*/
function carritoBtn() {
    const btnEliminarItem = document.querySelectorAll('.trash');
    btnEliminarItem.forEach((btn) => {
        btn.addEventListener('click', eliminarItemCarrito);
        actualizarTotalCompra();
    });
}
function eliminarItemCarrito(event) {
    const btnClickeado = event.target
    const productCarrito = btnClickeado.closest('.containerCarritoCards-content');
    const productoId = productCarrito.querySelector('img').getAttribute('src');

    if (productCarrito) {
        productCarrito.remove();

        let memoria = JSON.parse(localStorage.getItem("producto")) || [];
        memoria = memoria.filter(item => item.img !== productoId);
        localStorage.setItem("producto", JSON.stringify(memoria));

        actualizarContadorCarrito();
        actualizarTotalCompra();
        
        mostrarMensajeCarritoVacio();
        if (memoria.length === 0) {
            const contadorCarrito = document.getElementById('contadorCarrito');
            contadorCarrito.textContent = "0";
            contadorCarrito.classList.add('oculto');
        }
    } else {
        console.error('El producto no existe.');
    }
}

/*--AGREGAR O QUITAR ELEMENTOS DEL CARRITO--*/
function agregarCantidadCarrito() {
    const btnSumarCantidad = document.querySelectorAll('.sumar');
    const btnRestarCantidad = document.querySelectorAll('.restar');

    btnSumarCantidad.forEach((btn) => {
        btn.addEventListener('click', sumarCantidad);
    });

    btnRestarCantidad.forEach((btn) => {
        btn.addEventListener('click', restarCantidad);
    });
}
function sumarCantidad(event) {
    const btn = event.target;
    const container = btn.closest('.containerCantidad');
    const contador = container.querySelector('.contador');
    let cantidad = parseInt(contador.textContent);
    const productoId = container.closest('.containerCarritoCards-content').querySelector('img').getAttribute('src');

    contador.textContent = cantidad + 1;

    let memoria = JSON.parse(localStorage.getItem("producto")) || [];
    const indiceProducto = memoria.findIndex(item => item.img === productoId);

    if (indiceProducto !== -1) {
        memoria[indiceProducto].cantidad += 1;
    }

    localStorage.setItem("producto", JSON.stringify(memoria));
    actualizarContadorCarrito();
    actualizarTotalCompra();

}
function restarCantidad(event) {
    const btn = event.target;
    const container = btn.closest('.containerCantidad');
    const contador = container.querySelector('.contador');
    let cantidad = parseInt(contador.textContent);
    const productoId = container.closest('.containerCarritoCards-content').querySelector('img').getAttribute('src');

    if (cantidad > 1) {
        contador.textContent = cantidad - 1;
        let memoria = JSON.parse(localStorage.getItem("producto")) || [];
        const indiceProducto = memoria.findIndex(item => item.img === productoId);

        if (indiceProducto !== -1) {
            memoria[indiceProducto].cantidad -= 1;
        }

        localStorage.setItem("producto", JSON.stringify(memoria));
        actualizarContadorCarrito();
        actualizarTotalCompra();
    }
}
/*--TEXTO DE CARRITO VACIO--*/
function mostrarMensajeCarritoVacio() {
    const textCarritoVacio = document.getElementById('textCarritoVacio');
    const productosEnCarrito = containerCarrito.children;

    if (productosEnCarrito.length === 0) {
        textCarritoVacio.style.opacity = "1";
    } else {
        textCarritoVacio.style.opacity = "0";
    }
}

/*--EVENTO CONTINUAR--*/

const bntContinuar = document.getElementById('step0');
function cambiarPagina() {
        window.location.href = "entrega.html";
}

bntContinuar.addEventListener('click', function () {
    const productosGuardados = JSON.parse(localStorage.getItem("producto")) || [];

    if (productosGuardados.length > 0) {
        carrito.length = 0;
        carrito.push(productosGuardados);
        cambiarPagina()
    }
})

/*--PRECIO TOTAL EN CARRITO--*/
function actualizarTotalCompra() {
    let memoria = JSON.parse(localStorage.getItem("producto")) || [];
    let total = memoria.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    document.getElementById("totalCompraCarrito").textContent = `Total: $${total.toFixed(2)}`;
}