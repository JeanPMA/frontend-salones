import Swiper from 'swiper';



document.addEventListener('DOMContentLoaded', function() {
    const texto = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
    const textoElement = document.getElementById("texto-tipeado");
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 50; // Velocidad de escritura (ajusta según tus preferencias)
    const eraseSpeed = 25; // Velocidad de borrado (ajusta según tus preferencias)
    const delayBeforeStart = 1000; // Retraso antes de comenzar (en milisegundos)
    const delayBeforeErase = 1000; // Retraso antes de borrar (en milisegundos)

    function type() {
        textoElement.innerHTML = texto.substring(0, index);
        index++;

        if (index <= texto.length) {
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBeforeErase);
        }
    }

    function erase() {
        textoElement.innerHTML = texto.substring(0, index);
        index--;

        if (index >= 0) {
            setTimeout(erase, eraseSpeed);
        } else {
            setTimeout(type, delayBeforeStart);
        }
    }

    setTimeout(type, delayBeforeStart);
});

document.addEventListener('DOMContentLoaded', function() {
const imagenes = document.querySelectorAll('.grid__item');
const botonSiguiente = document.getElementById('siguiente');
const botonAnterior = document.getElementById('anterior');
const numerosPagina = document.getElementById('numeros-pagina');
let startIndex = 0;
const imagesPerPage = 6;

function mostrarImagenes() {
  for (let i = 0; i < imagenes.length; i++) {
    if (i >= startIndex && i < startIndex + imagesPerPage) {
      imagenes[i].style.display = 'flex';
    } else {
      imagenes[i].style.display = 'none';
    }
  }
  botonAnterior.disabled = startIndex === 0;
  botonSiguiente.disabled = startIndex >= imagenes.length - imagesPerPage;

  // Calcular el número de página actual
  const paginaActual = Math.floor(startIndex / imagesPerPage) + 1;
  const totalPaginas = Math.ceil(imagenes.length / imagesPerPage);
  actualizarNumerosPagina(paginaActual, totalPaginas);
}

function actualizarNumerosPagina(paginaActual, totalPaginas) {
  numerosPagina.innerHTML = '';
  for (let i = 1; i <= totalPaginas; i++) {
    const numero = document.createElement('span');
    numero.textContent = i;
    numero.className = 'numero-pagina';
    numero.addEventListener('click', () => {
      startIndex = (i - 1) * imagesPerPage;
      mostrarImagenes();
    });
    numerosPagina.appendChild(numero);
  }
}

botonSiguiente.addEventListener('click', () => {
  startIndex += imagesPerPage;
  mostrarImagenes();
});

botonAnterior.addEventListener('click', () => {
  startIndex -= imagesPerPage;
  mostrarImagenes();
});

mostrarImagenes();
});

