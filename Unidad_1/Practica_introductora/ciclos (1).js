const paisesdisponible = [
  "Bolivia",
  "Ecuador",
  "Brasil",
  "Venezuela",
  "Italia",
  "Francia",
];
const preciospaises = new Array(100, 200, 300, 400, 500, 600);
const presupuesto = 350;

let i = 0;

while (preciospaises[i] > presupuesto && i < paisesdisponible.length()) {
  if (i == paisesdisponible.length()) {
    console.log("no existe pasaje");
  } else {
    console.log("puedes comprar pasaje");
  }
}
