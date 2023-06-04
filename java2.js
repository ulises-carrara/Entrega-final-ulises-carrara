alert("Hola \n bienvenido :D")

function num1() {
    let numero = Number(prompt("Ingresa un numero"))
    return numero
}
function num2() {
    let numero = Number(prompt("Ingresa otro numero"))
    return numero
}
function operador() {
    let operador = Number(prompt("Que operacion desea realizar  \n _1: Suma \n _2: Resta \n _3: Multiplicacion \n _4: Division \n_0: Salir"))
    return operador
}




function calculadora(num1, num2, operador) {


    switch (operador) {
        case 1:
            let suma = num1 + num2
            return alert("El resultado de la suma entre " + num1 + " y " + num2 + " es: " + suma)


        case 2:
            let resta = num1 - num2
            return alert("El resultado de la resta entre " + num1 + " y " + num2 + " es: " + resta)


        case 3:
            let multiplicacion = num1 * num2
            return alert("El resultado de la multiplicacion emtre " + num1 + " y " + num2 + " es: " + multiplicacion)
        case 4:
            let division = num1 / num2
            return alert("El resultadon de la division entre " + num1 + " y " + num2 + " es: " + division)




    }

}
let condicion
let numero1
let numero2


do {
    condicion = operador()
    console.log(condicion);

if (condicion==0) {
    break
} else if (condicion >= 5){

    alert("Valor inválido \n Por favor ingrese uno de los numeros en pantalla ")

} else if (isNaN(condicion)){

    alert("Por favor ingrese un numero ")

}else {
    numero1 = num1()


    numero2 = num2()

    calculadora(numero1, numero2, condicion) 
}


} while (condicion != 0);



alert("El programa a terminado \n Gracias por su tiempo")


