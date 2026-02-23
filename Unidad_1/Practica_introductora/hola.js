const paisdestino = "Ecuador";
const paisesdisponible = [
  "Bolivia",
  "Ecuador",
  "Brasil",
  "Venezuela",
  "Italia",
  "Francia",
];
let edadpasajero = 17;
let acompañado = true;

if (paisesdisponible.indexOf(paisdestino) > -1) {
  if (edadpasajero >= 18) {
    console.log(`El pasaje a ${paisdestino} disponible para la venta`);
  } else {
    if (acompañado) {
      console.log(`El pasaje a ${paisdestino} disponible para la venta`);
    } else{
        console.log(`No se puede vender el pasaje`);
    }
  }
} else {
  console.log(`No se puede vender el pasaje`);
}