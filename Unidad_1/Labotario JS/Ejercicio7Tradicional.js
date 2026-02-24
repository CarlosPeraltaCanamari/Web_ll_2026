function sumarPropiedad(array, propiedad) {
    var suma = 0;

    for (var i = 0; i < array.length; i++) {
        suma += array[i][propiedad];
    }

    return suma;
}

var productos = [
    { nombre: "A", precio: 10 },
    { nombre: "B", precio: 20 },
    { nombre: "C", precio: 15 }
];

console.log(sumarPropiedad(productos, "precio"));