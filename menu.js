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