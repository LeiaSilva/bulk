const navbar = document.getElementById('navbar')
const perifl = document.getElementById('perfil')
const menu = document.getElementById('menu')

perifl.addEventListener('click', (e) =>{
    menu.classList.toggle('show')
})