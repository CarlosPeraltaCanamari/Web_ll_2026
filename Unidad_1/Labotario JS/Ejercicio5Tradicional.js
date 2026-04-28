function decimalABinario(numero) {
    if (numero === 0) {
        return "0";
    }

    var binario = "";

    while (numero > 0) {
        var residuo = numero % 2;
        binario = residuo + binario;
        numero = Math.floor(numero / 2);
    }

    return binario;
}

var resultado1 = decimalABinario(10);
console.log(resultado1);