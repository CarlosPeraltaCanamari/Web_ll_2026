const sumarPropiedad = (array, propiedad) => {
    let suma = 0;

    for (let i = 0; i < array.length; i++) {
        suma += array[i][propiedad];
    }

    return suma;
};

let productos2 = [
    { nombre: "X", cantidad: 5 },
    { nombre: "Y", cantidad: 8 },
    { nombre: "Z", cantidad: 12 }
];

console.log(sumarPropiedad(productos2, "cantidad"));