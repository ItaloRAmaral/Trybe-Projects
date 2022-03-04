const email = document.querySelector('#email');
const password = document.querySelector('#senha');
const button = document.querySelector('#btn-login');

button.addEventListener('click', () => {
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

const checkVerify = document.querySelector('#agreement');
const formButton = document.querySelector('#submit-btn');

// Baseado no repositório do isaac almeida
const ThemesChecked = () => {
  const subject = document.querySelectorAll('.subject');
  let checkedSubjects = '';
  subject.forEach((theme) => {
    if (theme.checked) {
      checkedSubjects += `${theme.value}, `;
    }
  });
  return checkedSubjects;
};

// REFERENCIAS:
// https://backefront.com.br/obter-valor-selecionado-radio-button/
const formData = () => {
  const formContent = document.querySelector('#evaluation-form');
  const name = document.querySelector('#input-name');
  const lastName = document.querySelector('#input-lastname');
  const formEmail = document.querySelector('#input-email');
  const selectedHouse = document.querySelector('#house');
  const selectedFamily = document.querySelector('input[name="family"]:checked');
  const selectedThemes = ThemesChecked();
  const avaliation = document.querySelector('input[name="rate"]:checked');
  const comments = document.querySelector('#textarea');
  formContent.innerHTML = '';
  formContent.innerText = `Nome: ${name.value} ${lastName.value}
  Email: ${formEmail.value}
  Casa: ${selectedHouse.value}
  Família: ${selectedFamily.value}
  Matérias: ${selectedThemes}
  Avaliação: ${avaliation.value}
  Observações: ${comments.value}`;
};

formButton.disabled = true;
checkVerify.addEventListener('click', () => {
  if (checkVerify.checked) {
    formButton.disabled = false;
    formButton.addEventListener('click', formData);
  } else {
    formButton.disabled = true;
  }
});

const commentArea = document.querySelector('#textarea');
commentArea.addEventListener('keyup', () => {
  const counter = document.querySelector('#counter');
  const caracteres = commentArea.value.length;
  counter.innerText = 500 - caracteres;
});
