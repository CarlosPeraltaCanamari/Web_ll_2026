const datos = [
  {
    pais: "Bolivia",
    precio: 500,
  },
  {
    pais: "Ecuador",
    precio: 600,
  },
  {
    pais: "Brasil",
    precio: 700,
  },
  {
    pais: "Venezuela",
    precio: 400,
  },
  {
    pais: "Italia",
    precio: 350,
  },
  {
    pais: "Francia",
    precio: 100,
  },
];
const presupuesto = 300;
let paisselaccionado = "";

for (let i = 0; i < datos.length && paisselaccionado == ""; i++) {
  if (datos[i].precio <= presupuesto) {
    paisselaccionado = datos[i].pais;
  }
}
if (paisselaccionado == "") {
  console.log(`no existen pasajes disponibles`);
} else {
  console.log(`puedes comprar pasaje`);
}
