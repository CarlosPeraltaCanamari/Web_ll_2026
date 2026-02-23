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
let pasaporte = true;
let casado = false;

console.log(`verificamos si hay pasajes para ${paisdestino}`);
if (
  paisesdisponible.indexOf(paisdestino) > -1 &&
  edadpasajero >= 18 &&
  pasaporte &&
  !casado
) {
  console.log(`disponible el tour solteros`);
} else {
  console.log(`pais no disponible o pasajero no cumple con los requisitos`);
}
