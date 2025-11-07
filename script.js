const apiKey = "9b18c6889c334779804abb181c00e847";
const contenedor = document.getElementById("juegos");

function obtenerJuegosAleatorios(lista, cantidad) {
  const copia = [...lista];
  const seleccion = [];
  while (seleccion.length < cantidad && copia.length > 0) {
    const i = Math.floor(Math.random() * copia.length);
    seleccion.push(copia.splice(i, 1)[0]);
  }
  return seleccion;
}

async function cargarJuegos() {
  try {
    const res = await fetch("https://raw.githubusercontent.com/miguelmiguelmiguelmiguelmiguel/Mis-videojuegos/refs/heads/main/juegos.json");
    const misJuegos = await res.json();
    const seleccion = obtenerJuegosAleatorios(misJuegos, 4);
    contenedor.innerHTML = "";

    for (const juego of seleccion) {
      try {
        // Fetch a RAWG usando el nombre del juego
        const apiRes = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(juego.nombre)}`);
        const data = await apiRes.json();
        const info = data.results[0];

        const imagen = info ? info.background_image : "imagenes/no-image.jpg";

        const card = document.createElement("div");
        card.classList.add("juego-card");
        card.innerHTML = `
          <img src="${imagen}" alt="${juego.nombre}">
          <h3>${juego.nombre}</h3>
          <p>${juego.comentario}</p>
          <span class="nota">⭐ ${juego.nota}</span>
        `;
        contenedor.appendChild(card);
      } catch (error) {
        console.error("Error cargando juego desde RAWG:", juego.nombre, error);
      }
    }

  } catch (error) {
    console.error("Error al cargar los juegos desde JSON:", error);
    contenedor.innerHTML = "<p>No se pudieron cargar los juegos.</p>";
  }
}

cargarJuegos();
