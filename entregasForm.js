
/*--PROGRESS LINE--*/
const container = document.getElementById('progress');
const steps = document.querySelectorAll('.step');
const lines = document.querySelectorAll('.progressLine');

let currentStep = 1;

function showStep(step) {
    steps.forEach((indicator, index) => {
        if (index === 0) {
            indicator.classList.add('completed'); 
        } else {
            indicator.classList.remove('active');
            indicator.classList.remove('completed');

            if (index < step) {
                indicator.classList.add('completed'); 
            }
        }
    });

    
    steps[step].classList.add('active');

    lines.forEach((line, index) => {
        if (index === 0) {
            line.classList.add('completed'); 
        } else {
            line.classList.toggle('completed', index < step); 
        }
    });

}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

showStep(currentStep);

/*--FORMULARIO--*/
/*--GENERAR SELECTIONS--*/

const clientes = [
    { nombre: 'Leia Belén Silva' },
    { nombre: 'Lorena Perna' },
    { nombre: 'Nelson Alfredo Silva' },
    { nombre: 'Milagros Magali Pereyra' },
    { nombre: 'Iker Murua Conde' },
    { nombre: 'Leandro Ramallo' },
    { nombre: 'Agustina Saenz' },
];

const clienteContainer = document.getElementById('clienteContainer');

function createSelectBox() {
    const select = document.createElement('select');
    select.classList.add('selectBox');
    select.setAttribute('name', 'cliente');

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un cliente";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nombre;
        option.innerText = cliente.nombre;
        select.appendChild(option);
    });

    clienteContainer.appendChild(select);

    /*--VALIDAR SELECT--*/
    select.addEventListener('change', function () {
        validarSelect(select);
    });
}
document.addEventListener("DOMContentLoaded", createSelectBox);

/*--VALIDAR FORMULARIO--*/
const formEntregas = document.getElementById('entregas');
const expresion = {
    text: /^[a-zA-Z0-9 ]+$/ // Permite letras, números y espacios
};

function validarCampo(input) {
    const errorMensaje = input.closest('.entregaContainer-form-inputs').querySelector('.entregasAdv');
    const icono = input.closest('.entregaContainer-form-inputs').querySelector('i');

    if (!expresion.text.test(input.value.trim())) {
        input.style.border = "3px solid red";
        errorMensaje.classList.add('entregasAdv-activo');
        errorMensaje.style.opacity = '1';
        icono.classList.remove('bxs-check-circle');
        icono.classList.add('bxs-x-circle');
        icono.style.opacity = '1';
        icono.style.color = 'red'
        return false;
    } else {
        input.style.border = "3px solid rgb(24, 99, 240)";
        errorMensaje.classList.remove('entregasAdv-activo');
        errorMensaje.style.opacity = '0'
        icono.classList.add('bxs-check-circle');
        icono.classList.remove('bxs-x-circle');
        icono.style.opacity = '1'
        icono.style.color = 'green'
        return true;
    }
}

const inputs = document.querySelectorAll('#entregas input');

/*--EVENTOS--*/
inputs.forEach(input => {
    input.addEventListener('keyup', () => validarCampo(input));
    input.addEventListener('blur', () => validarCampo(input));
});

function validarSelect(select) {
    const errorMensaje = document.querySelector('#clienteContainer .entregasAdv');

    if (!select || select.value === "") {
        select.style.border = "3px solid red";
        errorMensaje.style.opacity = '1'
        return false;
    } else {
        select.style.border = "3px solid rgb(24, 99, 240)";
        errorMensaje.style.opacity = '0';
        return true;
    }
}

/*--EVENTO CONTINUAR--*/
formEntregas.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputs = document.querySelectorAll('#entregas input');
    const select = document.querySelector('#clienteContainer .selectBox');
    let formularioValido = true;

    //VALIDACIONES
    inputs.forEach(input => {
        if (!validarCampo(input)) {
            formularioValido = false;
        }
    });

    if (!validarSelect(select)) {
        formularioValido = false;
    }
    // ACTUALIZAR BARRA DE PROGRESO Y PASO ACTUAL
    if (formularioValido) {
       
        setTimeout(() => {
            window.location.href = "resumen.html";
        }, 500);
        
    }
    
});


