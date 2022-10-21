

const socketClient = io();

socketClient.on("messageFromServer",(data)=>{
    console.log(data)
})


let user;

const email = document.getElementById("email");
const messageField = document.getElementById("messageField");


socketClient.on("messages", (mensajes)=>{
    console.log(mensajes)
})

const campo = document.getElementById("messageField")


campo.addEventListener("keydown",(evt)=>{
    user = email.value
    console.log(user)
    if (user && user.includes("@")) {
    if(evt.key === "Enter"){
        socketClient.emit("message",{
            username:user,
            date: new Date(Date.now()).toLocaleString().replace(",", ""),
            message:campo.value
        })

    }
} else {
    alert("Necesitas ingresar un email para chatear")
    campo.innerHTML = ""
}
})

const messageContainer = document.getElementById("messageContainer");

socketClient.on("historico",(data)=>{
    let elementos="";
    data.forEach(item=>{
        elementos = elementos + `<p><strong style="color: blue">${item.username}</strong> <spam style ="color: brown">[${item.date}] </spam>: <i style="color: green">${item.message}</i></p>`;
    });
    messageContainer.innerHTML = elementos;
})

const form = document.getElementById("form")

form.addEventListener("submit", (e)=> {
    e.preventDefault()
    socketClient.emit("form",{
        title:e.target[0].value,
        price:e.target[1].value,
        thumbnail:e.target[2].value,
    })
})

const table = document.getElementById("tabla");

socketClient.on("productos", (data)=>{
    console.log(data)
    let elementos=""
    data.forEach(item=>{
        
        elementos = elementos + `<tr>
        <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td><img style="height: 50px" src="${item.thumbnail}"></td>
    </tr>`
    });
    table.innerHTML = elementos;
})

