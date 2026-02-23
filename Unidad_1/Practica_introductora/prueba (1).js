const usuarios = [
  { nombre: "juan", edad: 23 },
  { nombre: "maria", edad: 33 },
  { nombre: "luis", edad: 25 },
  { nombre: "daria", edad: 90 },
  { nombre: "zena", edad: 35 },
];
const procesarusuarios = (usuarios) => {
  return usuarios
    .filter((usuario) => usuario.edad > 18)
    .map((usuario) => {
      const { nombre } = usuario;
      return nombre.length > 5 ? nombre.toUpperCase() : nombre.toLowerCase();
    });
};
const resultado2 = procesarusuarios(usuarios);
console.log(resultado2);