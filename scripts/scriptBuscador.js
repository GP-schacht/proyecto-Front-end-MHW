// Funcion para ensenar la busqueda que se hiso en el buscador
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search");
  const lista = document.getElementById("busquedaResult");
  const cont = document.getElementById("busquedaContenedor");

  function mostrarBusqueda(monstros) {
    lista.innerHTML = "";

monstros.forEach(monstro => { 
const li = document.createElement('li');
li.setAttribute("class", "liMonstro"); 
li.addEventListener('click', () => { 
navegarMonstruo(monstro.idMonstro); 
}); 

//iterar en los elementos
const iconUrls = { 
  Fuego: "/recursos/elementos_icons/FuegoIcon.webp", 
  Draco: "/recursos/elementos_icons/DragonIcon.webp",
  Trueno: "/recursos/elementos_icons/TreunoIcon.webp",
  Agua: "/recursos/elementos_icons/Agua.png",
  Hielo: "/recursos/elementos_icons/Hielo.png"
} // Añade más elementos según sea necesario
const elementosHTML = monstro.elementos.map(elemento => (elemento.elemento === "Ninguno" ? `<p>Ninguno</p>`:`<img src="${iconUrls[elemento.elemento]}">`)).join('');

li.innerHTML = ` 
<img class="monstroImagenCard2" src="${monstro.imagen.iconUrl}" >
<h3 class="contenidoMonstro">${monstro.nombre}</h3> 
<span class ="elementoIcon"> ${elementosHTML} </span>`
;
lista.appendChild(li); });
}

  // funcion para navegar a la pagina que pertenece al monstruo buscado
  function navegarMonstruo(id) {
    window.location.href = `/src/monstros.html?id=${id}`;
  }

  // funcion para navegar a la pagina que pertenece al monstruo buscado
  function navegarMonstruo(id) {
    window.location.href = `/src/monstros.html?id=${id}`;
  }

  // funcion para buscar el monstro segun cuando estas tecleando
  function filtroMonstros(monstros, lista) {
    cont.style.display="flex";
    return monstros.filter((monstros) =>
      
      monstros.nombre.toLowerCase().includes(lista.toLowerCase())
    );
  }

  // listener del tecleo
  input.addEventListener("keyup", async function () {
    lista.style.display = "flex";
    // Limpiar la lista si el input está vacío return;
    const query = input.value.trim();
    if (query === "") {
      lista.innerHTML = "";
      cont.style.display="none";
      return;
    }
    const monstros = await GetMonstro();
    const filtro = filtroMonstros(monstros, query);
    mostrarBusqueda(filtro);
  });

  GetMonstro().then(mostrarBusqueda);
});
