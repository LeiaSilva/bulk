const productos = [
    {
        id: 1,
        nombre: 'MESA EAMES 1.40 X 0.90',
        description: 'blanco',
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
        nombre: 'SILLA EAMES X 4 ',
        description: 'blanco',
        stock: 57,
        precio: 91.116,
        codigo: '07915003',
        img: '../assets/07915003.jpg',
    },
    {
        id: 4,
        nombre: 'MESA EAMES 1.40 X 0.90',
        description: 'blanco',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
    },
    {
        id: 5,
        nombre: 'MESA EAMES 1.40 X 0.90',
        description: 'blanco',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
    },
    {
        id: 6,
        nombre: 'MESA EAMES 1.40 X 0.90',
        description: 'blanco',
        stock: 100,
        precio: 145000,
        codigo: '07110003',
        img: '../assets/07110003.jpg',
    },
];


/*--CREAR PRODUCTOS--

const containerProducto = document.getElementById('containerProducto');

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
            <button class= "cardContent-compra"> Agregar al carrito</button>
        </div>
        <div class= "cardContainer">
            <div class= "cardContainer-cantidad">
                <button>-</button>
                <span> 0 </span>
                <button>+</button>
            </div>
            <p class= "cardContainer-stock"> Stock : ${producto.stock} </p>
        </div>
        `

        containerProducto.appendChild(newCard)
        newCard.getElementsByTagName("button")[0].addEventListener('click', ()=> agregarCarrito(producto))
    });
}
crearCards(productos);*/

/*--CREAR CARDS EN CARRITO--*/

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
            <div class= "cardContainer-cantidad">
                <button>-</button>
                <span> 0 </span>
                <button>+</button>
            </div>
            <p class= "cardContainer-stock"> Stock : ${producto.stock} </p>
        </div>
        `

        containerProducto.appendChild(newCard)
        newCard.querySelectorAll(".cardContent-compra")[0].addEventListener('click', ()=> {
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

            function agregarProductosCarrito(){

                const cardsCarrito = document.createElement('div');
                const checkboxId = `checkbox-${producto.id}`;
            
                cardsCarrito.className = 'containerCarritoCards-content';
                cardsCarrito.innerHTML = `
                    <div class="containerCarritoCards-content-img">
                        <img src= ${producto.img}>
                    </div>
                    <div class ="containerCarritoCards-content-names">
                        <h2>${producto.nombre}</h2>
                        <h3 class="containerCarritoCards-content-names-description">${producto.description}</h3>
                        <p>$${producto.precio}</p>
                        <div class= "containerCantidad">
                            <button>-</button>
                            <span> 0 </span>
                            <button>+</button>
                        </div>
                    </div>
                    <div class= "containerCarritoCards-content-icons">
                        <ion-icon name="trash"></ion-icon>
                        <div class= "containerCarritoCards-content-icons-checkbox">
                            <input type="checkbox" id="${checkboxId}" name="checkbox">
                            <label for="${checkboxId}">Armado</label>
                        </div>
                    </div>
                    `
                    containerCarrito.appendChild(cardsCarrito);
            }
        });
    });
}
crearCards(productos);