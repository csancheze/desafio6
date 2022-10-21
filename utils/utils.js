const fs = require("fs")

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }
    async save(product) {
        let arr = []
        let currentId = 0
        try {
            let file = await fs.promises.readFile(`./${this.nombre}`, "utf-8")
            if (file) {
                arr = JSON.parse(file)
                currentId = arr.at(-1).id
            }
        } catch (error) {
            console.log("Archivo no encontrado. El archivo se creara.", error)
        }
        currentId++
        product.id = currentId
        arr.push(product)

        try {
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(arr))
        } catch (error) {
            console.error("No se pudo salvar el producto", error)
            return
        } 

        console.log(`El objeto ha sido salvado. Su id es ${currentId}`)
        return  arr
    }

    async getById (id) {
        let arr = []
        let object = null
        let file = ""
        try {
            file = await fs.promises.readFile(`./${this.nombre}`, "utf-8")
         
            arr = JSON.parse(file)
            object = arr.find(element => element.id === id)
        } catch (error) {
            console.log("Archivo no encontrado.")
            return
        }
        return object
    }

    async getAll () {
        let arr = []
        let file = ""
        try {
            file = await fs.promises.readFile(`./${this.nombre}`, "utf-8")
        } catch (error) {
            console.log("Archivo no encontrado.", error)
            return
        }
        arr = JSON.parse(file)
        return arr
    }

    
    async updateById (id, body) {
        let arr = []
        let file = ""
        let productToUpdate = {}
        try {
            file = await fs.promises.readFile(`./${this.nombre}`, "utf-8")
            if (file) {
                arr = JSON.parse(file)
                productToUpdate = arr.findIndex(el=>el.id === id);
            }
        } catch (error) {
            console.log("No se pudieron leer los productos", error)
            return
        }

        arr[productToUpdate] = {
            id:id,
            ...body
        };

        try {
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(arr))
        } catch (error) {
            console.error("No se pudo actualizar el producto", error)
            return
        } 

        console.log(`El objeto ha sido actualizado.`)
        return  arr[productToUpdate]
    }

    async deleteById (id) {
        let arr = []
        let newArr = []
        let file = ""
        try {
            file = await fs.promises.readFile(`./${this.nombre}`, "utf-8")
        } catch (error) {
            console.log("Archivo no encontrado. No se pudo borrar", error)
            return
        }

        arr = JSON.parse(file)
        let ids = arr.map(element => element.id)
        if (ids.includes(id)) {
            newArr = arr.filter(element => element.id != id)
        } else {
            console.error("Elemento no encontrado")
            return
        }
        
        try {
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(newArr))
            console.log(`El producto con id ${id} ha sido borrado`)
            return `El producto con id ${id} ha sido borrado`
        } catch (error) {
            console.error("No se hicieron cambios.", error)
            return
        }

  
    }



    async deleteAll () {
        let arr = []
        try {
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(arr))

        } catch (error) {
            console.error("No se han podido borrar los archivos", error)
            return
        }

        console.log("Todos los productos han sido borrados.")
    }
}

module.exports = Contenedor