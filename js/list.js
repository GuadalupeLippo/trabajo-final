const pedidos = []

//capturacion de elementos
const agregarPedidos =  document.getElementById("agregarPedido");
agregarPedidos.addEventListener("submit",handleAgregarTareas);

function generarId() {
    if (pedidos.length === 0) {
        return 1;
    } else {
            const lastPed = pedidos [pedidos.length -1]
    
         return lastPed.id + 1 
    }
 
}
console.log(generarId())


function renderTable (){
    const tablaPedidos = document.querySelector("tbody");
    //agregue una clase para css
    tablaPedidos.classList.add(`tabla-ped`)

    
    tablaPedidos.innerHTML = "";
    
    
    pedidos.forEach(ped => {
    const row = document.createElement("tr");
    
    row.setAttribute("data-ped-id",ped.id);
    console.log(row)
    
    
    row.addEventListener("click", handleRowClick);

    const nroPedCell = document.createElement("td");
    nroPedCell.textContent= ped.nroPedido;
    row.appendChild(nroPedCell);

    const pedCell = document.createElement("td");
    pedCell.textContent= ped.pedido;
    row.appendChild(pedCell);
   
    const descripcionCell = document.createElement("td");
    descripcionCell.textContent= ped.descripcion;
    row.appendChild(descripcionCell);
    
    const estadoCell = document.createElement("td");
    estadoCell.textContent= ped.estado ? "entregado" : "pendiente";
    row.appendChild(estadoCell);

    tablaPedidos.appendChild(row);

    })
}

function handleRowClick() {}


function handleAgregarTareas(e) {
    e.preventDefault();

    const pedidoInput = agregarPedidos.querySelector("input");
    const pedido = pedidoInput.value;
    const descrTextArea = agregarPedidos.querySelector("textarea");
    const descripcion = descrTextArea.value;

    if(pedido !== "" && descrTextArea !== "") {
        const nuevosPed = {
            nroPedido: generarId(),
            pedido: pedido,
            descripcion: descripcion,
            estado: false
        }
     pedidos.push(nuevosPed);
    renderTable();
    agregarPedidos.reset()
    }

}