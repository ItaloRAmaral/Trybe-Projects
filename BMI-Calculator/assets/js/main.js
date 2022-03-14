const calcButton = document.querySelector('.btn-calcular');
const divResultado = document.querySelector('#resultado');
const form = document.querySelector('.form')
const control = document.querySelector('#control')


const resultadoIMC = (pesoInputA, alturaInputB) => {
    const resultado = (pesoInputA / (alturaInputB * alturaInputB)).toFixed(2);
    return resultado;
}

form.addEventListener('submit',(e)=> e.preventDefault());

calcButton.addEventListener('click', ()=>{
    let pesoInput = parseFloat(document.getElementById('peso').value);
    let alturaInput = parseFloat(document.getElementById('altura').value);

    if (isNaN(pesoInput) || isNaN(alturaInput)){
        divResultado.classList = 'bad';
        control.innerText = "Digite Apenas Valores Numéricos!"
    } else if (resultadoIMC(pesoInput, alturaInput) < 18.5) {
        divResultado.classList = 'alert';
        control.innerText = `Seu IMC é de: ${(resultadoIMC(pesoInput,alturaInput))} (Abaixo do Peso!)`
    } else if (resultadoIMC(pesoInput, alturaInput) >= 18.5 && resultadoIMC(pesoInput, alturaInput) < 25) {
        divResultado.classList = 'ok';
        control.innerText = `Seu IMC é de: ${(resultadoIMC(pesoInput,alturaInput))} (Peso Normal)`
    } else if (resultadoIMC(pesoInput, alturaInput) >= 25 && resultadoIMC(pesoInput, alturaInput) < 30) {
        divResultado.classList = 'alert';
        control.innerText = `Seu IMC é de: ${(resultadoIMC(pesoInput,alturaInput))} (Sobrepeso)`
    } else if (resultadoIMC(pesoInput, alturaInput) >= 30 && resultadoIMC(pesoInput, alturaInput) < 35) {
        divResultado.classList = 'alert';
        control.innerText = `Seu IMC é de: ${(resultadoIMC(pesoInput,alturaInput))} (Obesidade Grau I)`
    } else if (resultadoIMC(pesoInput, alturaInput) >= 35 && resultadoIMC(pesoInput, alturaInput) < 40) {
        divResultado.classList = 'alert';
        control.innerText = `Seu IMC é de: ${(resultadoIMC(pesoInput,alturaInput))} (Obesidade Grau II)`
    } else if (resultadoIMC(pesoInput, alturaInput) >= 40) {
        divResultado.classList = 'alert';
        control.innerText = `Seu IMC é de: ${(resultadoIMC(pesoInput,alturaInput))} (Obesidade Grau III ou Mórbida)`
    }
});