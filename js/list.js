const pedidos = []

//capturacion de elementos
const agregarPedidos =  document.getElementById("agregarPedido");
const listaPedidosModal = document.getElementById("listaPedidosModal");
const editarListaPed = document.getElementById("editarListaPed");
const btnEliminar = document.getElementById("btnEliminar");
const btnEstado = document.getElementById("btnEstado");
const btnCerrar = document.getElementById("btnCerrar");




//escucha de elementos
agregarPedidos.addEventListener("submit",AgregarTareas);
editarListaPed.addEventListener("submit",handleActualizarBtn); 
btnEliminar.addEventListener("click",handleEliminarBtn);
btnEstado.addEventListener("click",handleEstadoBtn);  
btnCerrar.addEventListener("click", function(){listaPedidosModal.close()});
  


function generarId(arr) {
    if (arr.length === 0) {
        return 1;
    } else {
            const lastPed = arr [arr.length -1]
    
         return lastPed.id + 1 
    }
 
}


function renderTable (data){
    const tablaPedidos = document.querySelector("tbody");
    //agregue una clase para css
    tablaPedidos.classList.add(`tabla-ped`)

    
    tablaPedidos.innerHTML = "";
    
    
    pedidos.forEach((ped) => {
    const row = document.createElement("tr");
    row.classList.add(`tabla-row`)
    row.setAttribute("id", "ped")
    row.setAttribute("data-ped-id",ped.id);
    
    
    
    row.addEventListener("click", handleRowClick);

    const nroPedCell = document.createElement("td");
    nroPedCell.textContent= ped.id;
    row.appendChild(nroPedCell);

    const pedCell = document.createElement("td");
    pedCell.textContent= ped.pedido;
    row.appendChild(pedCell);
   
    const descripcionCell = document.createElement("td");
    descripcionCell.textContent= ped.descripcion;
    row.appendChild(descripcionCell);
    
    const estadoCell = document.createElement("td");
    estadoCell.textContent= ped.estado ? "entregado" : "en proceso";
    row.appendChild(estadoCell);

    tablaPedidos.appendChild(row);

    })
}

function handleRowClick(e) {
   const pedId = e.currentTarget.getAttribute("data-ped-id");
   const ped = pedidos.find((pedido)=>pedido.id === Number(pedId));


    const nroPedido = document.getElementById("pedId");
    nroPedido.textContent = ped.id;
    const pedidoInput = editarListaPed.querySelector("#pedidoModal");
    pedidoInput.value = ped.pedido;
    console.log(ped.pedido)
    const descripcionInput = editarListaPed.querySelector("#descripcionModal");
    descripcionInput.value = ped.descripcion;
    const estadoModal = document.getElementById("estadoModal");
    if(ped.estado)
    {
        estadoModal.innerText = "entregado"; 
        estadoModal.classList.add(`entregado`)  
        estadoModal.classList.remove("enProceso") 
    } else {estadoModal.innerText = "en proceso"
            estadoModal.classList.add(`enProceso`) 
            estadoModal.classList.remove("entregado") 
        }

listaPedidosModal.showModal()
}


//funciones de la ventana Modal
function handleActualizarBtn(e) {
    e.preventDefault()
    const pedidoInput = editarListaPed.querySelector("#pedidoModal");
    const pedido = Number(editarListaPed.querySelector("#pedId").textContent);
    const pedNew = pedidos.find(ped=> ped.id === pedido);
    pedNew.pedido = pedidoInput.value


    const descripcionInput = editarListaPed.querySelector("#descripcionModal");
    const pedId = Number(editarListaPed.querySelector("#pedId").textContent);
    const ped = pedidos.find(ped=> ped.id === pedId)
    ped.descripcion = descripcionInput.value
    renderTable()
    listaPedidosModal.close();

};
function handleEliminarBtn() {
    const pedId =Number( editarListaPed.querySelector("#pedId").textContent);
   
   
   const validar = confirm("¿desea eliminar el pedido?")
   if(validar == true) {
 const pedN = pedidos.filter(ped => ped.id !== pedId);
 console.log(pedN)  //falta mostrar por pantalla
 

    listaPedidosModal.close();
    
   
};
}
function handleEstadoBtn() {
    const pedId = Number(editarListaPed.querySelector("#pedId").textContent);
    
    const ped = pedidos.find(ped=> ped.id === pedId)
    if(ped.estado === true) {
        ped.estado = false
    } else{ ped.estado = true}

    listaPedidosModal.close();
    renderTable()
};


function AgregarTareas(e) {
    e.preventDefault();

    const pedidoInput = agregarPedidos.querySelector("input");
    const pedido = pedidoInput.value;
    const descrTextArea = agregarPedidos.querySelector("textarea");
    const descripcion = descrTextArea.value;

    if(pedido !== "" && descrTextArea !== "") {
        const nuevosPed = {
            id: generarId(pedidos),
            pedido: pedido,
            descripcion: descripcion,
            estado: false
        }
     pedidos.push(nuevosPed);
    renderTable(pedidos);
    agregarPedidos.reset()
    }

}