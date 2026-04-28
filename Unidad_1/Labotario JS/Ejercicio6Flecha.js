const numeroMasRepetido = (numeros) => {
    let contador = {};
    let maxVeces = 0;
    let masRepetido = null;

    for (let i = 0; i < numeros.length; i++) {
        let num = numeros[i];

        if (contador[num] === undefined) {
            contador[num] = 1;
        } else {
            contador[num]++;
        }

        if (contador[num] > maxVeces) {
            maxVeces = contador[num];
            masRepetido = num;
        }
    }

    return masRepetido;
};

let array2 = [5, 5, 1, 2, 5, 3, 2, 2];
console.log(numeroMasRepetido(array2));