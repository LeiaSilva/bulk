/*--Muestra perfil y carrito--*/
const perifl = document.getElementById('perfil');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('closeMenu');
const carrito = document.getElementById('carrito');
const ventanaCarrito = document.getElementById('carritoVentana');
const closeCarrito = document.getElementById('closeCarrito');

perifl.addEventListener('click' , (e)=>{
    menu.classList.toggle('show');
})
closeMenu.addEventListener('click' , (e) =>{
    if(menu.classList.contains('show')){
        menu.classList.remove('show');
    }else{
        alert("El menu ya esta cerrado")
    }
})
carrito.addEventListener('click' , (e)=>{
    ventanaCarrito.classList.toggle('showCarrito');
})
closeCarrito.addEventListener('click' , (e)=>{
    if(ventanaCarrito.classList.contains('showCarrito')){
        ventanaCarrito.classList.remove('showCarrito')
    }else{
        alert("Elcarrito ya esta cerrado")
    }
})