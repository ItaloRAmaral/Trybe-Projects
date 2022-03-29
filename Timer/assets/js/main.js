const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const myTimer = document.querySelector('.timer');

function getHourSeconds (segundos){
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC'
    });
}

let seconds = 0;
let timer;

function timerInit (){
    timer = setInterval(() =>{
        seconds += 1;
        myTimer.innerHTML = getHourSeconds(seconds);
    }, 1000);
}

startBtn.addEventListener('click', ()=>{
    clearInterval(timer);
    timerInit();
    myTimer.classList.remove('paused')
});

pauseBtn.addEventListener('click', ()=>{
    clearInterval(timer);
    myTimer.classList.add('paused')
});

resetBtn.addEventListener('click', ()=>{
    clearInterval(timer);
    myTimer.innerHTML = '00:00:00'
    seconds = 0;
    myTimer.classList.remove('paused')
});