const contarParesImpares = (numeros) => {
    let resultado = {
        pares: 0,
        impares: 0 
    };

    for (let i = 0; i < numeros.length; i++)
    {
        if (numeros[i] % 2 === 0)
        {
            resultado.pares++;
        } 
        else
        {
            resultado.impares++;
        }
    }

    return resultado;
}

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var respuesta = contarParesImpares(array);
console.log(respuesta);