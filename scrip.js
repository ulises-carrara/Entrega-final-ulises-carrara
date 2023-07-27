const productos = [
    { id: 1, nombre: "Remera de hombre ", precio: 1000, categoria: "hombre", oferta: true },
    { id: 2, nombre: "Pantalon de hombre", precio: 99999, categoria: "hombre", oferta: false },
    { id: 3, nombre: "Campera de hombre", precio: 99999, categoria: "hombre", oferta: false },
    { id: 4, nombre: "Medias de hombre ", precio: 1000, categoria: "hombre", oferta: true },

    { id: 5, nombre: "Remera de mujer", precio: 99999, categoria: "mujer", oferta: false },
    { id: 6, nombre: "Pantalon de mujer", precio: 99999, categoria: "mujer", oferta: false },
    { id: 7, nombre: "Campera de mujer", precio: 1000, categoria: "mujer", oferta: true },
    { id: 8, nombre: "Zapatos de mujer", precio: 99999, categoria: "mujer", oferta: false },

    { id: 9, nombre: "Remera de niño", precio: 1000, categoria: "niños", oferta: true },
    { id: 10, nombre: "Pantalon de niño", precio: 99999, categoria: "niños", oferta: false },
    { id: 11, nombre: "Remera de niña", precio: 1000, categoria: "niños", oferta: true },
    { id: 12, nombre: "Pantalon de niña", precio: 1000, categoria: "niños", oferta: true },
]
let carrito = []
let total = 0


// DOM----------------------------------------------------------------------------------------------------

let divfiltro = document.getElementById("renderfiltro")
let main = document.getElementById("main")
let contenedorH = document.getElementById("contenedorH")
let contenedorM = document.getElementById("contenedorM")
let contenedorN = document.getElementById("contenedorN")
let miInput = document.getElementById("input")
let boton = document.getElementById("btn")
let divCarrito = document.getElementById("carrito")
let btnCarritoNav = document.getElementById("btncarrito")
let contenedorCarrito = document.getElementById("contenedorCarrito")
let inicio = document.getElementById("inicio")
let totalPagar = document.getElementById("total")
let btnVaciar = document.getElementById("vaciarcarrito")
let divOfertas = document.getElementById("ofertas")
let btnOfertas = document.getElementById("btnofertas")




//Rendrisado de productos ------------------------------------------------------------------------------

function render(array, contenedor) {
    array.forEach((prod) => {

        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "col-sm-12 col-md-6 col-lg-3 mb-2"


        tarjetaProducto.innerHTML = ` 
        <article class="card bg-nav">
        <div>
            <img src="./img/LOGO2.jpg" class="card-img-top" alt="producto generico de hombres">
            <div class="card-body">
                <h3 class="card-title">${prod.nombre}</h3>
                <label>$${prod.precio}</label>
                <button class="btn btn-outline-dark hover w-100" id="${prod.id}">Añadir al carrito</button>
            </div>
        </div>
    </article>
        `;

        contenedor.appendChild(tarjetaProducto)
        let btnCarrito = document.getElementById(prod.id)
        btnCarrito.addEventListener("click", agregarCarrito)
    })

}
let hombre = productos.filter((el) => el.categoria === "hombre")

let mujer = productos.filter((el) => el.categoria === "mujer")

let niños = productos.filter((el) => el.categoria === "niños")

render(hombre, contenedorH)
render(mujer, contenedorM)
render(niños, contenedorN)

//Filtro de productos -------------------------------------------------------------------------------------
boton.addEventListener("click", renderFiltro)

function renderFiltro() {
    let prodFiltro = productos.filter((el) => el.nombre.toLowerCase().includes(miInput.value.toLowerCase()))
    contenedorN.innerHTML = ""
    contenedorM.innerHTML = ""
    contenedorH.innerHTML = ""
    divOfertas.innerHTML = ""
    main.classList.remove("oculto")
    contenedorCarrito.classList.add("oculto")
    divfiltro.innerHTML = ` <h1>Resultados:</h1> `
    render(prodFiltro, divfiltro)
}



//Carrito-------------------------------------------------------------------------------------------------------------
btnCarritoNav.addEventListener("click", mostrarCarrito)

let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
if (carritoJSON) {
    carrito = carritoJSON
}
let totalJSON = JSON.parse(localStorage.getItem("total"))
if (totalJSON) {
    total = totalJSON
}

function agregarCarrito(e) {

    let productoAbuscar = productos.find(prod => prod.id === Number(e.target.id))

    let productoCarrito = carrito.findIndex(prod => prod.id === productoAbuscar.id)

    if (productoCarrito === -1) {
        carrito.push({
            id: productoAbuscar.id,
            nombre: productoAbuscar.nombre,
            precioUnitario: productoAbuscar.precio,
            unidades: 1,
            subTotal: productoAbuscar.precio
        })
        total = total + productoAbuscar.precio


    } else {
        carrito[productoCarrito].unidades++
        carrito[productoCarrito].subTotal = carrito[productoCarrito].precioUnitario * carrito[productoCarrito].unidades
        total = total + carrito[productoCarrito].precioUnitario

    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("total", JSON.stringify(total))
    Swal.fire({
        position: 'top-end',
        title: 'Se agrego con exito al carrito',
        color: '#b50d57',
        showConfirmButton: false,
        timer: 1000,
        width: 300,
        background: '#200e38',
        backdrop: false,
        timerProgressBar: true,
        toast: true,
    })
}


function mostrarCarrito() {
    main.classList.toggle("oculto")
    contenedorCarrito.classList.toggle("oculto")
    btnCarritoNav.classList.toggle("oculto")
    inicio.classList.toggle("oculto")
    renderCarrito(carrito)
}

function renderCarrito(array) {

    array.forEach(prod => {

        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "card col-sm-12 col-md-6 col-lg-6 mb-3 bg-nav "


        tarjetaCarrito.innerHTML += `
        <div class="row g-0">
        <div class="col-md-4">
            <img src="../img/LOGO2.jpg" class="img-fluid rounded-start" alt="imagen de producto generico">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h3 class="card-title">${prod.nombre}</h3>
                <p class="card-text">Unidades: ${prod.unidades}</p>
                <p class="card-text">$${prod.precioUnitario}</p>
                <p class="card-text">Total $${prod.subTotal}</p>
                <button class="btn btn-outline-dark hover w-100" id="${prod.id}" >Eliminar de carrito</button>
            </div>
        </div>
    </div>
        `;

        divCarrito.appendChild(tarjetaCarrito)
    })
    let totalcarrito = document.createElement("div")
    totalcarrito.innerHTML = `<h3>Total a pagar: $ ${total}</h3>`
    totalPagar.appendChild(totalcarrito)
}

btnVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    carrito = []
    total = 0
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("total", JSON.stringify(total))
    divCarrito.innerHTML = ""
    totalPagar.innerHTML = ""
}



//OFERTAS-----------------------------------------------------------------------------------------------------

btnOfertas.addEventListener("click", renderOfertas)

function renderOfertas() {
    let prodOferta = productos.filter((el) => el.oferta === true)
    contenedorN.innerHTML = ""
    contenedorM.innerHTML = ""
    contenedorH.innerHTML = ""
    divfiltro.innerHTML = ""
    main.classList.remove("oculto")
    contenedorCarrito.classList.add("oculto")
    divOfertas.innerHTML = ` <h1>OFERTAS!!!!!!</h1> `
    render(prodOferta, divOfertas)
}
