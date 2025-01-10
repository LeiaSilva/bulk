/*--muestra perfil--*/
const perifl = document.getElementById('perfil')
const menu = document.getElementById('menu')
const closeMenu = document.getElementById('closeMenu')

perifl.addEventListener('click', (e) =>{
    menu.classList.toggle('show')
})
closeMenu.addEventListener('click', (e) =>{
    if(menu.classList.contains('show')){
        menu.classList.remove('show');
    }else{
        alert("El menu esta cerrado")
    }
})
/*--muestra ventana carrito--
const carrito = document.getElementById('carrito');
const ventanaCarrito = document.getElementById('carritoVentana');
const closeCarrito = document.getElementById('closeMenu');

carrito.addEventListener('click' , (e) =>{
    ventanaCarrito.classList.toggle('show')
})
closeCarrito.addEventListener('click', (e) =>{
    if(ventanaCarrito.classList.contains('show')){
        ventanaCarrito.classList.remove('show');
    }else{
        alert("El menu esta cerrado")
    }
})*/
