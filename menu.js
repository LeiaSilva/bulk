/*--Muestra perfil y carrito--*/
const perfil = document.getElementById('perfil');
const menu = document.getElementById('menu');
const closeMenu = document.getElementById('closeMenu');
const carritoIcon = document.getElementById('carrito');
const ventanaCarrito = document.getElementById('carritoVentana');
const closeCarrito = document.getElementById('closeCarrito');

perfil.addEventListener('click', () => {
    if (!ventanaCarrito.classList.contains('showCarrito')) {
        menu.classList.toggle('show');
    }
});

closeMenu.addEventListener('click', () => {
    menu.classList.remove('show');
});

carritoIcon.addEventListener('click', () => {
    if (!menu.classList.contains('show')) {
        ventanaCarrito.classList.toggle('showCarrito');
    }
});

closeCarrito.addEventListener('click', () => {
    ventanaCarrito.classList.remove('showCarrito');
});
