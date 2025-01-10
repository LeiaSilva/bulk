
function agregarCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("producto"));
    console.log(memoria);
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("producto" , JSON.stringify([nuevoProducto]));
    }else{
        const indiceProducto = memoria.findIndex(item => item.id === producto.id);
        console.log(indiceProducto);
        if(indiceProducto === -1){
            const nuevaMemoria = memoria ;
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            localStorage.setItem("producto" , JSON.stringify(nuevaMemoria));
        }else {
            memoria[indiceProducto].cantidad += 1;
            localStorage.setItem("producto", JSON.stringify(memoria));
    }
}
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto ;
    nuevoProducto.cantidad = 1 ;
    return nuevoProducto;
}}

