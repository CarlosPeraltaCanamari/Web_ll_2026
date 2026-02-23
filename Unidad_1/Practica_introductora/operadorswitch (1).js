const paisdestino = "Ecuador";
const paisesdisponible = [
  "Bolivia",
  "Ecuador",
  "Brasil",
  "Venezuela",
  "Italia",
  "Francia",
];
let valorpasaje = 0;
/*if (paisdestino == "Bolivia") {
  valorpasaje = 100;
} else if (paisdestino == "Ecuador") {
  valorpasaje = 200;
}*/

switch (paisdestino) {
  case "Bolivia":
    valorpasaje = 500;
    break;
  case "Ecuador":
    valorpasaje = 100;
    break;
  case "Brasil":
    valorpasaje = 100;
    break;
  case "Venezuela":
    valorpasaje = 100;
    break;
  case "Italia":
    valorpasaje = 100;
    break;
  case "Francia":
    valorpasaje = 100;
    break;
  default:
    console.log(`no existe pasajes para ${paisdestino}`);
    break;
}
if (valorpasaje > 0) {
  console.log(`el valor del pasaje es ${valorpasaje}`);
}
