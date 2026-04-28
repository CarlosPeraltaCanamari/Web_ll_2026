const decimalABinario = (numero) => {
    if (numero === 0) {
        return "0";
    }

    let binario = "";

    while (numero > 0) {
        let residuo = numero % 2;
        binario = residuo + binario;
        numero = Math.floor(numero / 2);
    }

    return binario;
};

let resultado2 = decimalABinario(25);
console.log(resultado2);