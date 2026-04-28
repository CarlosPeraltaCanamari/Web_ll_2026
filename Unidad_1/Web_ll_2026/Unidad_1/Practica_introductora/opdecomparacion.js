const valorpasaje= 100;
if(valorpasaje==100){
    console.log("el valor del pasaje es correcto");
}
const paisDestino = "Argentina";
const paisesdisponibles = ["Argentina", "Brasil", "Chile", "Peru"];
let edadpasajero = 17;
let acompanante = true;
console.log(`el pais de destino es ${paisDestino}`);
if(paisesdisponibles.indexOf(paisDestino)>-1 && edadpasajero>=18 || acompanante){
    console.log("pasaje disponible para venta");
    } else {
        console.log("pasaje no disponible para venta");
    }