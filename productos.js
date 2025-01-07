const productos = [
    {
        id : 1 , 
        nombre:'MESA EAMES 1.40 X 0.90' , 
        description:'blanco' , 
        stock:100 ,
        precio:145.000 , 
        codigo:'07110003' ,
        img : '../assets/07110003.jpg' , 
    } , 
    {
        id : 2 , 
        nombre:'SILLON MESH ALTO- SA 4006 ' , 
        description:'negro' , 
        stock:55 ,
        precio:83.547 , 
        codigo:'10450013' ,
        img : '../assets/10450013.jpeg',
    } , 
    {
        id : 3 , 
        nombre:'SILLA EAMES X 4 ' , 
        description:'blanco' , 
        stock:57 ,
        precio:91.116 , 
        codigo:'07915003' ,
        img :'../assets/07915003.jpg' ,
    } , 
    {
        id : 1 , 
        nombre:'MESA EAMES 1.40 X 0.90' , 
        description:'blanco' , 
        stock:100 ,
        precio:145.000 , 
        codigo:'07110003' ,
        img : '../assets/07110003.jpg', 
    } , 
    {
        id : 1 , 
        nombre:'MESA EAMES 1.40 X 0.90' , 
        description:'blanco' , 
        stock:100 ,
        precio:145.000 , 
        codigo:'07110003' ,
        img : '../assets/07110003.jpg', 
    } , 
    {
        id : 1 , 
        nombre:'MESA EAMES 1.40 X 0.90' , 
        description:'blanco' , 
        stock:100 ,
        precio:145.000 , 
        codigo:'07110003' ,
        img : '../assets/07110003.jpg', 
    } , 
];




const containerProducto = document.getElementById('containerProducto');

function crearCards(productos){
    productos.forEach( producto =>{
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
        <div class="cardImg">
            <img src= ${producto.img}>
        </div>
        <div class= "cardContent">
            <h2>${producto.nombre}</h2>
            <h3>${producto.description}</h3>
            <p>Precio: $${producto.precio}</p>
        </div>
        <p> Stock : ${producto.stock}
        `

        containerProducto.appendChild(newCard)
    });
}
crearCards(productos);