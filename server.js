const express = require("express")
const products = require("./routes/products");
const handlebars = require("express-handlebars");
const path = require('path');
const { Server } = require("socket.io");
const fileManagement = require ("./utils/module.js")

const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine("handlebars",handlebars.engine());

app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "handlebars");

app.use("/", products) 

io.on("connection",async (socket)=>{
    console.log("nuevo socket o cliente conectado", socket.id);
    socket.emit("messageFromServer","se ha conectado exitosamente")
    const mensajes = await fileManagement.todosLosMensajes();
    const products = await fileManagement.buscarTodos();
    socket.emit("productos",products)
    socket.emit("historico",mensajes)
    socket.on("message",async data=>{
            console.log(data);
            const mensajes = await fileManagement.agregarMensaje(data);
            io.sockets.emit("historico", mensajes);
        })
    socket.on("form",async data =>{
        console.log(data);
        const productos = await fileManagement.agregarProducto(data)
        io.sockets.emit("productos",productos)
    })
    
    
}) 