function selecionaCor(e) {
  const classSelected = document.querySelector('.selected');
  classSelected.classList.remove('selected');
  e.target.classList.add('selected');
}

const cor = document.querySelectorAll('.color');

cor[0].addEventListener('click', selecionaCor);
cor[1].addEventListener('click', selecionaCor);
cor[2].addEventListener('click', selecionaCor);
cor[3].addEventListener('click', selecionaCor);

function pintarQuadrado(e) {
  const corSelecionada = document.querySelector('.selected');
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  const getStyle = getComputedStyle(corSelecionada).backgroundColor;
  e.target.style.backgroundColor = getStyle;
}

const pixel = document.querySelectorAll('.pixel');
for (let i = 0; i < pixel.length; i += 1) {
  pixel[i].addEventListener('click', pintarQuadrado);
}

function clearBoard() {
  const quadrados = document.querySelectorAll('.pixel');
  for (let i = 0; i < quadrados.length; i += 1) {
    quadrados[i].style.backgroundColor = 'white';
  }
}

const button = document.querySelector('#clear-board');
button.addEventListener('click', clearBoard);
