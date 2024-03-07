document.addEventListener('DOMContentLoaded', function() {
const imagenes = document.querySelectorAll('.grid__item');
const botonSiguiente = document.getElementById('siguiente');
const botonAnterior = document.getElementById('anterior');
const numerosPagina = document.getElementById('numeros-pagina');
let startIndex = 0;
const imagesPerPage = 9;

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