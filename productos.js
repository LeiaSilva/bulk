const productos = [
    {
        id: 1,
        nombre: 'MESA EAMES',
        description: 'blanco 1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
    },
    {
        id: 2,
        nombre: 'SILLON MESH ALTO- SA 4006 ',
        description: 'negro',
        stock: 55,
        precio: 83.547,
        codigo: '10450013',
        img: '../assets/10450013.jpeg',
    },
    {
        id: 3,
        nombre: 'SILLA EAMES ',
        description: 'blanco x4',
        stock: 57,
        precio: 91.116,
        codigo: '07915003',
        img: '../assets/07915003.jpg',
    },
    {
        id: 4,
        nombre: 'MESA EAMES',
        description: 'blanco 1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
    },
    {
        id: 5,
        nombre: 'MESA EAMES',
        description: 'blanco 1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
    },
    {
        id: 6,
        nombre: 'MESA EAMES',
        description: 'blanco 1.40 X 0.90',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
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
        </div>
        <div class= "cardContent">
            <h2>${producto.nombre}</h2>
            <h3>${producto.description}</h3>
            <p>$${producto.precio}</p>
            <button class= "cardContent-compra" id= "comprar"> Agregar al carrito</button>
        </div>
        <div class= "cardContainer">
            <p class= "cardContainer-stock"> Stock : ${producto.stock} </p>
        </div>
        `

        containerProducto.appendChild(newCard)
        newCard.querySelectorAll(".cardContent-compra")[0].addEventListener('click', () => {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                description: producto.description,
                stock: producto.stock,
                precio: producto.precio,
                codigo: producto.codigo,
                img: producto.img,
            });
            agregarProductosCarrito(productos);
            agregarCarrito(producto);
            actualizarContadorCarrito();

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
                        <h2>${producto.nombre}</h2>
                        <h4 class="containerCarritoCards-content-names-description">${producto.description}</h3>
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
function cambiarPagina(){
bntContinuar.addEventListener('click', function(){
    window.location.href = "entrega.html"
})
}

bntContinuar.addEventListener('click', function(){
    const productosGuardados = JSON.parse(localStorage.getItem("producto")) || [];

    if(productosGuardados.length > 0){
        carrito.lenght = 0;
        carrito.push(productosGuardados);
        cambiarPagina()
    }
})
