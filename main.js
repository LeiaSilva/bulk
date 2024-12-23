const formulario = document.getElementById('login')
const inputs = document.querySelectorAll('#login input')
const loginError = document.getElementById('error')

const expresiones = {
    /*-- ER solo usuario con email--*/
    usuario: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
    /*--ER contraseña alfanumerica de min 6 digitos y max 12*/
    password: /^[a-zA-Z0-9]{6,12}$/
}

const validarFormulario = (e) =>{
    switch(e.target.name){
        case "user":
            if(expresiones.usuario.test(e.target.value)){
                document.getElementById('userContainer').classList.remove('loginForm-incorrecto')
                document.getElementById('userContainer').classList.add('loginForm-correcto') 
                document.querySelector('#userContainer i').classList.remove('bxs-x-circle') 
                document.querySelector('#userContainer i').classList.add('bxs-check-circle') 
            } else{
                document.getElementById('userContainer').classList.add('loginForm-incorrecto')
                document.getElementById('userContainer').classList.remove('loginForm-correcto')
                document.querySelector('#userContainer i').classList.add('bxs-x-circle') 
                document.querySelector('#userContainer i').classList.remove('bxs-check-circle')
            }
        break;
        case "password" :
            if(expresiones.password.test(e.target.value)){
                document.getElementById('passwordContainer').classList.remove('loginForm-incorrecto')
                document.getElementById('passwordContainer').classList.add('loginForm-correcto') 
                document.querySelector('#passwordContainer i').classList.remove('bxs-x-circle') 
                document.querySelector('#passwordContainer i').classList.add('bxs-check-circle')
                document.querySelector('#passwordContainer .loginAdv').classList.remove('loginAdv-activo')
            }else{
                document.getElementById('passwordContainer').classList.add('loginForm-incorrecto')
                document.getElementById('passwordContainer').classList.remove('loginForm-correcto')
                document.querySelector('#passwordContainer i').classList.add('bxs-x-circle') 
                document.querySelector('#passwordContainer i').classList.remove('bxs-check-circle')
                document.querySelector('#passwordContainer .loginAdv').classList.add('loginAdv-activo')
            }
        break;
    }
}


inputs.forEach((input)=> {
    input.addEventListener('keyup', validarFormulario)
})



/*--no envia datos--*//
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
} )
