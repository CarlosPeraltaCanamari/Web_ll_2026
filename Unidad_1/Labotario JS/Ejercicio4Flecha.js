const esPrimo = (num) => {
    if (num <= 1) {
        return false;
    }

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
};

const obtenerPrimos = (numeros) => {
    let primos = [];

    for (let i = 0; i < numeros.length; i++) {
        if (esPrimo(numeros[i])) {
            primos.push(numeros[i]);
        }
    }

    return primos;
};

let array2 = [10, 11, 12, 13, 14, 15, 16, 17];
console.log(obtenerPrimos(array2));