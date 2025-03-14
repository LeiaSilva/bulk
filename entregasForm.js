/*--PROGRESS LINE--*/
const container = document.getElementById('progress');
const steps = document.querySelectorAll('.step');
const lines = document.querySelectorAll('.progressLine');

let currentStep = parseInt(localStorage.getItem('currentStep')) || 1;

function showStep(step) {
    steps.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');

        if (index === 0) {
            indicator.classList.add('completed');
        }

        if (index < step) {
            indicator.classList.add('completed');
        }

        if (index === step) {
            indicator.classList.add('active');
        }
    });

    // Actualizar líneas de progreso
    lines.forEach((line, index) => {
        line.classList.toggle('completed', index < step);
    });
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        localStorage.setItem('currentStep', currentStep);
        showStep(currentStep);
        return true;
    }
    return false;
}
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        localStorage.setItem('currentStep', currentStep);
        showStep(currentStep);
        window.location.href = "entrega.html";
    }
}

// Bloquear retroceso
function bloquearRetroceso() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.pushState(null, null, location.href);
    };
}

bloquearRetroceso();

/*--FORMULARIO--*/
const clientes = [
    { nombre: 'Leia Belén Silva', direccion: 'Casilda 1005, Rosario'},
    { nombre: 'Lorena Perna', direccion: 'Casilda 1005, Rosario' },
    { nombre: 'Nelson Alfredo Silva',direccion: 'Casilda 1005, Rosario' },
    { nombre: 'Milagros Magali Pereyra',direccion: 'Casilda 1005, Rosario' },
    { nombre: 'Iker Murua Conde', direccion: 'Casilda 1005, Rosario' },
    { nombre: 'Leandro Ramallo', direccion: 'Casilda 1005, Rosario' },
    { nombre: 'Agustina Saenz', direccion: 'Casilda 1005, Rosario' },
];

function createSelectBox() {
    const clienteContainer = document.getElementById('clienteContainer');
    if (!clienteContainer) return;

    const select = document.createElement('select');
    select.classList.add('selectBox');
    select.setAttribute('name', 'cliente');
    select.setAttribute('id', 'cliente');

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un cliente";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nombre;
        option.textContent = cliente.nombre;
        select.appendChild(option);
    });

    clienteContainer.appendChild(select);

    // Restaurar selección previa si existe
    const savedData = JSON.parse(localStorage.getItem('deliveryDetails'));
    if (savedData && savedData.cliente) {
        select.value = savedData.cliente;
        validarSelect(select);
    }

    select.addEventListener('change', () => validarSelect(select));
}

/*--SELECT DE LUGAR DE ENTREGA--*/
function createLugarEntregaSelect() {
    const lugarEntregaContainer = document.getElementById('lugarEntregaContainer');
    if (!lugarEntregaContainer) return;

    const select = document.createElement('select');
    select.classList.add('selectBoxEntrega');
    select.setAttribute('name', 'lugarEntrega');
    select.setAttribute('id', 'lugarEntrega');

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un lugar de entrega";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.direccion;
        option.textContent = cliente.direccion;
        select.appendChild(option);
    });

    lugarEntregaContainer.appendChild(select);

    const savedData = JSON.parse(localStorage.getItem('deliveryDetails'));
    if (savedData && savedData.lugarEntrega) {
        select.value = savedData.lugarEntrega;
        validarSelect(select);
    }

    select.addEventListener('change', () => validarSelect(select));
}

/*--VALIDAR FORMULARIO--*/
const formEntregas = document.getElementById('entregas');

function validarSelect(select) {
    if (!select) return false;
    const isValid = select.value !== "";
    select.style.outline = isValid ? "3px solid rgb(24, 99, 240)" : "3px solid red";
    return isValid;
}

// Inicializar validación de campos
if (formEntregas) {
    const inputs = formEntregas.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        // Restaurar valores previos si existen
        const savedData = JSON.parse(localStorage.getItem('deliveryDetails'));
        if (savedData && savedData[input.name]) {
            input.value = savedData[input.name];
        }

        input.addEventListener('input', () => {
            const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {};
            deliveryDetails[input.name] = input.value;
            localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));
        });
    });

    /*--EVENTO CONTINUAR--*/
    formEntregas.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectCliente = document.querySelector('#clienteContainer .selectBox');
        const selectLugarEntrega = document.getElementById('lugarEntrega');
        let formularioValido = true;

        if (!validarSelect(selectCliente)) {
            formularioValido = false;
            console.error("Cliente no seleccionado");
        }
        
        if (!validarSelect(selectLugarEntrega)) {
            formularioValido = false;
            console.error("Lugar de entrega no seleccionado");
        }

        if (formularioValido) {
            const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {};
            deliveryDetails.cliente = selectCliente.value;
            deliveryDetails.lugarEntrega = selectLugarEntrega.value;
            localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));
            
            if (nextStep()) {
                window.location.href = "resumen.html";
            }
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    createSelectBox();
    createLugarEntregaSelect();
    showStep(currentStep);
});

/*--ACTUALIZAR CONTADOR DEL CARRITO--*/
function actualizarContadorCarrito() {
    const memoria = JSON.parse(localStorage.getItem("producto")) || [];
    const totalProductos = memoria.reduce((acc, item) => acc + item.cantidad, 0);
    const contadorCarrito = document.getElementById('contadorCarrito');

    if (totalProductos > 0) {
        contadorCarrito.textContent = totalProductos;
        contadorCarrito.classList.add('visible');
        contadorCarrito.classList.remove('oculto');
    } else {
        contadorCarrito.classList.add('oculto');
        contadorCarrito.classList.remove('visible');
    }
}

actualizarContadorCarrito();
