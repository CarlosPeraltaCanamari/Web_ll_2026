function esPrimo (num)
{
    if(num <= 1)
    {
        return false;
    }

    for(var i = 2; i < num; i++)
    {
        if (num % i === 0)
        {
            return false;
        }
    }

    return true;
}

function obtenerPrimos (numeros)
{
    var primos = [];

    for (var i = 0; i < numeros.length; i++) {
        if (esPrimo(numeros[i])) {
            primos.push(numeros[i]);
        }
    }

    return primos;
}

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(obtenerPrimos(array));