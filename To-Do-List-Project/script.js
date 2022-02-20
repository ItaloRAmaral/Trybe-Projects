const input = document.querySelector('#texto-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const botaoCriarTarefa = document.querySelector('#criar-tarefa');
const itensLista = document.getElementsByClassName('tarefa');
const botaoApagarLista = document.querySelector('#apaga-tudo');
const botaoApagarFinalizados = document.querySelector('#remover-finalizados');
const botaoSalvarTarefas = document.querySelector('#salvar-tarefas');
const botaoRemoverSelecionado = document.querySelector('#remover-selecionado');

function criarTarefa() {
  const criarLista = document.createElement('li');
  criarLista.className = 'tarefa';
  criarLista.innerText = input.value;
  listaTarefas.appendChild(criarLista);
  input.value = '';
}

botaoCriarTarefa.addEventListener('click', criarTarefa);

listaTarefas.addEventListener('click', (e) => {
  if (e.target.className === 'tarefa') {
    for (let i = 0; i < itensLista.length; i += 1) {
      itensLista[i].style.removeProperty('background-color');
      itensLista[i].classList.remove('selected');
    }
    const tarefaSelecionada = e.target;
    tarefaSelecionada.style.backgroundColor = 'grey';
    tarefaSelecionada.className += ' selected';
  }
});

function tarefaCompleta(e) {
  const tarefaSelecionada = e.target;
  if (e.target.className === 'tarefa selected') {
    e.target.className += ' completed';
  } else if (e.target.className === 'tarefa selected completed' || e.target.className === 'tarefa completed') {
    tarefaSelecionada.className = 'tarefa selected';
  }
}

listaTarefas.addEventListener('dblclick', tarefaCompleta);

botaoApagarLista.addEventListener('click', () => {
  if (itensLista.length > 0) {
    listaTarefas.innerHTML = '';
  }
});

botaoApagarFinalizados.addEventListener('click', () => {
  for (let i = 0; i < itensLista.length; i += 1) {
    const itemFeito = document.getElementsByClassName('completed')[0];
    listaTarefas.removeChild(itemFeito);
  }
});

botaoSalvarTarefas.addEventListener('click', () => {
  localStorage.setItem('taskListItems', listaTarefas.innerHTML);
});

/// peguei como referencia esse video: https://www.youtube.com/watch?v=AphaUpmVguI

function carregarTarefasCompletas() {
  listaTarefas.innerHTML = localStorage.getItem('taskListItems');
}

window.onload = carregarTarefasCompletas;

function rmSelected() {
  const tarefaSelecionada = document.getElementsByClassName('selected')[0];
  listaTarefas.removeChild(tarefaSelecionada);
}

botaoRemoverSelecionado.addEventListener('click', rmSelected);
