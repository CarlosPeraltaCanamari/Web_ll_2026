const datos = [
  {
    pais: "Bolivia",
    precio: 100,
  },
  {
    pais: "Ecuador",
    precio: 100,
  },
  {
    pais: "Brasil",
    precio: 100,
  },
  {
    pais: "Venezuela",
    precio: 100,
  },
  {
    pais: "Italia",
    precio: 100,
  },
  {
    pais: "Francia",
    precio: 100,
  },
];
const presupuesto = 300;
let i = 0;

let paisselaccionado = "";

do {
  if (datos[i].precio <= presupuesto) {
    paisselaccionado = datos[i].pais;
  }
  i++;
} while (i < datos.length && paisselaccionado == "");
if (paisselaccionado == "") {
  console.log(`no existen pasajes disponibles`);
} else {
  console.log(`puedes comprar pasaje`);
}
