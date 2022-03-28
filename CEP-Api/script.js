const btn = document.querySelector('#btn');
const inputCep = document.querySelector('#cep');

// API Utilizada: viacep.com.br/ws/01001000/json/

const appendData = (appendObj) => {
    const rua = document.querySelector('#rua')
    const bairro = document.querySelector('#bairro')
    const estado = document.querySelector('#estado')

    rua.innerText = appendObj.endereco;
    bairro.innerText = appendObj.bairro;
    estado.innerText = appendObj.estado;
}

const fetchCep = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`https://viacep.com.br/ws/${inputCep.value}/json/`);
        const data = await response.json();
        const dataObj = {
            endereco: data.logradouro,
            bairro: data.bairro,
            estado: `${data.localidade} - ${data.uf}`
        }
        appendData(dataObj);
    } catch (error){
        alert('Cep incorreto');
        console.log(error);
    } finally {
        inputCep.value = '';
    }
};

btn.addEventListener('click', fetchCep);