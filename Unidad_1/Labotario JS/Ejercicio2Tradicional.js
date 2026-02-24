function palabraMasLarga(frase) {
    var palabras = frase.split(" ");
    var masLarga = "";

    for (var i = 0; i < palabras.length; i++)
    {
        if (palabras[i].length > masLarga.length) 
        {
            masLarga = palabras[i];
        }
    }

    return masLarga;
}

var texto = "Estoy aprendiendo javascript en la universidad";
var resultado = palabraMasLarga(texto);
console.log(resultado);