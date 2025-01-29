/*--PROGRESS--*/
/*--FORMULARIO--*/
/*--GENERAR SELECTIONS--*/
const clientes = [
    {
        nombre: 'Leia Belén Silva'
    },
    {
        nombre: 'Lorena Perna'
    },
    {
        nombre: 'Nelson Alfredo Silva'
    },
    {
        nombre: 'Milagros Magali Pereyra'
    },
    {
        nombre: 'Iker Murua Conde'
    },
    {
        nombre: 'Leandro Ramallo'
    },
    {
        nombre: 'Agustina Saenz'
    },
]
const clienteContainer = document.getElementById('clienteContainer');

function createSelectBox(){
    const select = document.createElement('select');
    select.classList.add('selectBox');

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona un cliente";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption)
    
    clientes.forEach( cliente => {
        const option = document.createElement('option');

        option.value = cliente.nombre;
        option.innerText = cliente.nombre;
        select.appendChild(option);
    })
    clienteContainer.appendChild(select);
}
document.addEventListener("DOMContentLoaded", createSelectBox);

/*--VALIDAR FOMULARIO--*/
const validarFormularioEntrega = document.getElementById('entregas');
const cliente = document.getElementById('clienteContainer');
const transportista = document.getElementById('transportista');
const lugarEntrega = document.getElementById('lugarEntrega');
const errorMsj = document.querySelectorAll('.entregasAdv');

function validarFormEntrega(){
    let isValid = true;
    errorMsj.forEach((msg) => msg.style.display = "none");
    
}