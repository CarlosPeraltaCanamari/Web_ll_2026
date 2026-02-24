const invertirNumero = (numero) => 
{
    let numStr = numero.toString();
    let invertido = "";

    for (var i = numStr.length - 1; i >= 0; i--)
    {
        invertido += numStr[i];
    }

    return parseInt(invertido);
}

var resultado1 = invertirNumero(98765);
console.log(resultado1);
