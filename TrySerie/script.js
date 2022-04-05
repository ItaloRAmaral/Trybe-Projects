// single search: https://api.tvmaze.com/singlesearch/shows?q=arrow
/* Criação de elementos */
function createProductImageElement(imageSource) {
    const img = document.createElement('img');
    img.className = 'serie-image';
    img.src = imageSource;
    return img;
}

function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
}

function createProductItemElement({ id, name, rating, image }) {
    const section = document.createElement('section');
    const btnDiv = document.createElement('div')
    btnDiv.className = 'btn-div'
    section.className = 'card-serie';

    section.appendChild(createCustomElement('span', 'serie-id', id));
    section.appendChild(createProductImageElement(image));
    section.appendChild(createCustomElement('span', 'serie-name', name));
    section.appendChild(createCustomElement('span', 'serie-rating', `Rating: ${rating}`));

    section.appendChild(btnDiv)
    
    btnDiv.appendChild(createCustomElement('button', 'watch-btn', 'Watch'));
    btnDiv.appendChild(createCustomElement('button', 'like-btn', 'Like'));
    btnDiv.appendChild(createCustomElement('button', 'info-btn', '+Info'));

    return section;
}

/* Funções de Colocar os Cards Na tela no Onload*/ 
async function appendingCardSeries (){
    const data = await fetchSeries();
    const resultSerieArray = [];

    data.forEach((serie)=>{
        obj = {
            id: serie.id,
            name: serie.name,
            rating: serie.rating.average,
            image: serie.image.original
        }
        resultSerieArray.push(obj)
    })
    
    const sectionFather = document.querySelector('.series-card')

    resultSerieArray.forEach((obj) => {
        const creatingHTML = createProductItemElement(obj)
        sectionFather.appendChild(creatingHTML);
    })
    
    appendFavSeriesOnLoad()
    favoritesSeries();
    infoBtnModal();
}

/* Criação do modal */
async function creatingModal(e) {
    const serieId = e.target.parentElement.parentElement.firstChild.innerText;
    const data = await fetchSeriesItem(serieId);
    const dataSeasons = await fetchSeasons(serieId);
    const dataCast = await fetchSerieCast(serieId);

    let serieListCast = [];

    dataCast.forEach((cast) => {
        const name = ` ${cast.person.name}`;
        serieListCast.push(name);
    })

    const serieImage = document.querySelector('.modal-image img');
    const serieTitle = document.querySelector('#modal-title');
    const serieRating = document.querySelector('#modal-rating');
    const serieGenre = document.querySelector('#modal-genre');
    const serieSeasons = document.querySelector('#modal-season');
    const serieSummary = document.querySelector('#modal-summary');
    const serieCast = document.querySelector('#modal-cast');

    serieImage.src = data.image.medium;
    serieTitle.innerText = `${data.name}`;
    serieRating.innerHTML = `<b>Rating:</b> ${data.rating.average}`
    serieGenre.innerHTML = `<b>Genres:</b> ${data.genres}`;
    serieSeasons.innerHTML = `<b>Seasons:</b> ${dataSeasons.length}`;
    serieSummary.innerHTML = data.summary;
    serieCast.innerHTML = `<b>Cast Members:</b> ${serieListCast}`;

    const modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = 'flex';
    modalContainer.style.position = 'fixed';
}

/* Funçao que adiciona evento de click para aparecer o modal, nos botões +info */
function infoBtnModal() {
    const infoBtn = document.querySelectorAll('.info-btn')
    infoBtn.forEach((element) => element.addEventListener('click', creatingModal));
}

/* Função de fechar o modal */
function clearModal () {
    const closeBtn = document.querySelector('#modal-close')
    closeBtn.addEventListener('click', ()=>{
       const modalContainer = document.querySelector('.modal-container');
       modalContainer.style.display = 'none';
    })
}

/*  Funçoes para filtragem por nome */
async function appendingByname(){
    const searchInput = document.querySelector('#search-box').value
    const dataSerieName = await fetchSeriesName(searchInput);
    
    let seriesInfo = [];

    dataSerieName.forEach((serie) => {
        const serieInfo = serie.show;
        obj = {
            id: serieInfo.id,
            name: serieInfo.name,
            rating: serieInfo.rating.average,
            image: serieInfo.image.original
        }
        seriesInfo.push(obj);
    })


    const sectionFather = document.querySelector('.series-card')
    sectionFather.innerHTML = '';

    seriesInfo.forEach((obj) => {
        const creatingHTML = createProductItemElement(obj)
        sectionFather.appendChild(creatingHTML);
    })

    appendFavSeriesOnLoad()
    favoritesSeries();
    infoBtnModal();
};


async function searchByName() {
    const searchBtn = document.querySelector('.btn-filter')   

    searchBtn.addEventListener('click', ()=>{
        const searchInput = document.querySelector('#search-box').value
        if (searchInput.length < 1) {
            const sectionFather = document.querySelector('.series-card')
            sectionFather.innerHTML = '';
            return appendingCardSeries();
        }
        if (typeof searchInput === 'string') {
            const search = document.querySelector('#search-box')
            appendingByname();
            return search.value = '';
        }
    })
    appendFavSeriesOnLoad();
}
searchByName();

/* Funções pra filtragem por genero */
async function filterByGenre(){
    const genreOption = document.querySelector('#genres');
    genreOption.addEventListener('change', async ()=>{
        const genreSelected = genreOption.options[genreOption.selectedIndex].text;
        const serieData = await fetchSeries();
        const filtredSeries = serieData.filter((genre) => genre.genres.includes(genreSelected))
        const serieObj = filtredSeries.map((serie) => obj = {
            id: serie.id,
            name: serie.name,
            rating: serie.rating.average,
            image: serie.image.original
        })

        const sectionFather = document.querySelector('.series-card');
        sectionFather.innerHTML = '';

        serieObj.forEach((obj) => {
            const creatingHTML = createProductItemElement(obj)
            sectionFather.appendChild(creatingHTML);
        })
        
        appendFavSeriesOnLoad();
        infoBtnModal();
    })
    
}
filterByGenre();

/* Função de Favoritar E remover Dos Favoritos*/

function addFavSeries (e){
    const target = e.target
    if(!target.classList.contains('fav-serie')){
        e.target.classList.add('fav-serie')

        const serieHtml = e.target.parentElement.parentElement.outerHTML;

        let favSerieSection = document.querySelector('.favorites');

        favSerieSection.innerHTML += serieHtml;
        saveSeries(favSerieSection.innerHTML);

    } else {

        target.classList.remove('fav-serie');
        const serieId = e.target.parentElement.parentElement.firstChild.innerText;
        const favSection = document.querySelector('.favorites').childNodes
        let favSerieSection = document.querySelector('.favorites');
        
        favSection.forEach((id)=>{
            console.log(id);
            // console.log(id.firstChild.innerText)
            if (id.firstChild.innerText === serieId) return id.parentNode.removeChild(id);
        })

         saveSeries(favSerieSection.innerHTML);
    }
}

function favoritesSeries() {
    const likeBtn = document.querySelectorAll('.like-btn')
    
    likeBtn.forEach((btn) => btn.addEventListener('click', addFavSeries))
}

/* Funçoes para mostrar na tela os favoritos */
function ShowFavSeries () {
    const seriesCard = document.querySelector('.series-card');
    seriesCard.innerHTML = '';
    seriesCard.innerHTML = getFavSeries();
    favoritesSeries();
}

const favBtn = document.querySelector('.btn-sort');
favBtn.addEventListener('click', ShowFavSeries)

/* Colocar os fav no HTML no onLoad */

function appendFavSeriesOnLoad() {
    const favSection = document.querySelector('.favorites')
    favSection.innerHTML = '';
    favSection.innerHTML = getFavSeries();
    
    const seriesCard = document.querySelector('.series-card').childNodes;
    const favSectionNodes = document.querySelector('.favorites').childNodes;

    seriesCard.forEach((eSerie)=> {
        favSectionNodes.forEach((favSerie)=>{
            const parameterSerie1 = eSerie.lastChild.firstElementChild.nextElementSibling;
            const parameterSerie2 = eSerie.firstChild.innerText;
            const parameterFav1 = favSerie.firstChild.innerText;

           if (parameterSerie2 === parameterFav1 && !parameterSerie1.classList.contains('fav-serie')) {
               eSerie.lastChild.firstElementChild.nextElementSibling.classList.add('fav-serie');
           }
        })
    })

    favoritesSeries();
}

/* Funções que precisam ser carregadas junto com a pagina*/
window.onload = async () => {
    await appendingCardSeries();
    clearModal();
    favoritesSeries();
    appendFavSeriesOnLoad();
}