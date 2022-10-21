const Contenedor = require("./utils.js")

const salvarProductos = async () => {
    
    const product1 = await Productos.save(object1)
    const product2 = await Productos.save(object2)
    const product3 = await Productos.save(object3)
}
    
const buscarPorId = async (id) => {
    
    let resultado = await Productos.getById(id)
        return resultado
    
}

const agregarProducto = async (obj) => {
    let resultado = await Productos.save(obj)
    return resultado
}

const actualizarPorId = async (id, body) => {
    let resultado = await Productos.updateById(id,body)
    return resultado
}
    
const buscarTodos = async () => {
    let arreglo = await Productos.getAll()
    return arreglo
}
    
const borrarTodos = async () => {
    await Productos.deleteAll()
}
    
const borrarPorId = async (id) => {
    await Productos.deleteById(id)
    return "Borrado"
}

const agregarMensaje = async (obj) => {
    let resultado = await Mensajes.save(obj)
    return resultado
}

const todosLosMensajes = async () => {
    let arreglo = await Mensajes.getAll()
    return arreglo
}



    
const Productos = new Contenedor("productos.txt")

const Mensajes = new Contenedor("mensajes.txt")
    
let object1 = {
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
}
    let object2 =         {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
}
let object3 =         {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
}

module.exports = { buscarTodos, buscarPorId, agregarProducto, actualizarPorId, borrarPorId, agregarMensaje, todosLosMensajes}