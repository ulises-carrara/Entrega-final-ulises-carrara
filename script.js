alert("Hola \n bienvenido :D")

const productos = [
    { id: 1, nombre: "Remera de hombre ", precio: 99999, categoria: "hombre", oferta: true },
    { id: 2, nombre: "Pantalon de hombre", precio: 99999, categoria: "hombre", oferta: false },
    { id: 3, nombre: "Campera de hombre", precio: 99999, categoria: "hombre", oferta: false },
    { id: 4, nombre: "Medias de hombre ", precio: 99999, categoria: "hombre", oferta: true },

    { id: 5, nombre: "Remera de mujer", precio: 99999, categoria: "mujer", oferta: false },
    { id: 6, nombre: "Pantalon de mujer", precio: 99999, categoria: "mujer", oferta: false },
    { id: 7, nombre: "Campera de mujer", precio: 99999, categoria: "mujer", oferta: true },
    { id: 8, nombre: "Zapatos de mujer", precio: 99999, categoria: "mujer", oferta: false },

    { id: 9, nombre: "Remera de niño", precio: 99999, categoria: "niños", oferta: true },
    { id: 10, nombre: "Pantalon de niño", precio: 99999, categoria: "niños", oferta: false },
    { id: 11, nombre: "Remera de niña", precio: 99999, categoria: "niños", oferta: true },
    { id: 12, nombre: "Pantalon de niña", precio: 99999, categoria: "niños", oferta: true },
]



function listar(array) {
    let lista = "ID - Nombre - Precio\n"

    array.forEach(element => {
        lista = lista + element.id + " - " + element.nombre + " $- "+ element.precio+ "\n"
    })
    return lista
}
function listarCarrito(array) {
    let lista = "ID - Nombre\n"

    array.forEach(element => {
        lista = lista + element.id + " - " + element.nombre + " Cantidad: " + element.unidades + " $" + element.subTotal + "\n"
    })
    return lista
}
function agregarCarrito(idProducto) {

    let productoAbuscar = productos.find(prod => prod.id === idProducto )

    let productoCarrito = carrito.findIndex(prod => prod.id === productoAbuscar.id)

    if (productoCarrito === -1) {
        carrito.push({

            id: productoAbuscar.id,
            nombre: productoAbuscar.nombre,
            precioUnitario: productoAbuscar.precio,
            unidades: 1,
            subTotal: productoAbuscar.precio
        })
        alert("Se agrego al carrito con exito: " + productoAbuscar.nombre)

    } else {
        carrito[productoCarrito].unidades++
        carrito[productoCarrito].subTotal = carrito[productoCarrito].precioUnitario * carrito[productoCarrito].unidades
        alert("Se agrego otra unidad al carrito con exito: " + carrito[productoCarrito].nombre)
    }
}

let condicion
let carrito = []

do {
    condicion = Number(prompt("Ingrese un numero \n _1:Lista de productos  \n _2:Agregar al carrito \n _3:Carrito \n _4:ofertas  \n_0:salir"))

    if (condicion == 0) {
        break
    } else {
        switch (condicion) {
            case 1:
                alert(listar(productos))
                break;
            case 2:
                let ID = Number(prompt("Ingrese el numero de ID del producto\n" + listar(productos)))

                agregarCarrito(ID)

                break;
            case 3:
                alert(listarCarrito(carrito))
                break;
            case 4:
                let ofertas = productos.filter((producto)=>producto.oferta === true)

                let idOfertas =Number(prompt("Ingrese el numero de ID del producto\n" + listar(ofertas)))

                agregarCarrito(idOfertas)

                break;
        }
    }


} while (condicion != 0);



alert("El programa a terminado \n Gracias por su tiempo")


