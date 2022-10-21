const express = require("express")
const fileManagement = require ("../utils/module.js")
const products = express.Router();

products.get("/", async (request, response)=>{
    response.render("form")
})

products.post("/productos",async(request,response)=>{
    const newProduct = request.body;
    const productos = await fileManagement.agregarProducto(newProduct);
    console.log(productos)
    response.redirect("/")
})
    

module.exports = products; 