
const form = document.querySelector("form")
form.addEventListener("submit", handleSubmit)
const modal = document.getElementById("modal")

const btnClose = document.getElementById("btn-close")
btnClose.addEventListener("click",closeModal)


function handleSubmit(e) {
    e.preventDefault()
    const contact = new FormData(form)
    const dataUser = {
    name: contact.get("name"),
   email: contact.get("email"),
   message: contact.get("message"),
   question: contact.get("question"),
    }
    console.log(dataUser)
    form.reset()
    renderModal(modal)
   
    
}

function renderModal(data) {
    modal.showModal();
}

function closeModal() {
    modal.close();
}
