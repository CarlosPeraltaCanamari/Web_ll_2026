function invertirNumero(numero)
{
    var numStr = numero.toString();
    var invertido = "";

    for (var i = numStr.length - 1; i >= 0; i--)
    {
        invertido += numStr[i];
    }

    return parseInt(invertido);
}

var resultado1 = invertirNumero(12345);
console.log(resultado1);