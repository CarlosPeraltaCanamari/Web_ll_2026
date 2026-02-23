const saludar = () => {
  console.log("funcion flecha");
};
saludar();

const duplicar = (numero) => {
  return numero * 2;
};
console.log(duplicar(5));

const suma = (a, b) => {
  return a + b;
};
console.log(suma(3, 2));

const crearusuario = (nombre, edad) => {
  return { nombre: nombre, edad: edad };
};
console.log(crearusuario("juan", 20));

const numeros = [1, 2, 3, 4, 5, 15, 20, 50];
//funcion para filtrar
const procesarnumeros = (numeros) => {
  return numeros.filter((numero) => numero > 10).map((numero) => numero * 2);
};

const resultado = procesarnumeros(numeros);
console.log(resultado);

const usuarios = [
  { nombre: "juan", edad: 23 },
  { nombre: "maria", edad: 33 },
  { nombre: "luis", edad: 25 },
  { nombre: "daria", edad: 90 },
  { nombre: "zena", edad: 35 },
];
const procesarusuarios = (usuarios) => {
  return usuarios
    .filter((usuario) => usuario.edad > 18) //filtramos que la edad sea mayor a 18
    .map((usuario) => {
      const { nombre } = usuario;
      return nombre.length > 5 ? nombre.toUpperCase() : nombre.toLowerCase();
    });
};
const resultado2 = procesarusuarios(usuarios);
console.log(resultado2);
