function numeroMasRepetido (numeros)
{
    var contador = {};
    var maxVeces = 0;
    var masRepetido = null;

    for (var i = 0; i < numeros.length; i++) {
        var num = numeros[i];

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

    return masRepetido;c
}

var array = [1, 2, 2, 3, 3, 3, 4, 2];
console.log(numeroMasRepetido(array));