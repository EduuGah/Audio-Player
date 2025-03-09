const botaoAnterior = document.querySelector('.Ant')
const botaoProximo = document.querySelector('.Prox')
const botaoPauseResume = document.querySelector('.PauseOrPlay')
let imgPauseResume = document.getElementById('pauseOrResume')
let tempoInicio = document.getElementById('tempoComecou')
let tempoFinal = document.getElementById('tempoTerminar')
let timeLine = document.getElementById('timeLine')
let audioLevel = document.getElementById('audioLevel')
let mute = document.getElementById('somImg')

let  value = 50

let pause = false

let resumeImg = 'img/PAUSE.png'
let playImg = 'img/PLAY.png'


const audio = document.getElementById('audio')

timeLine.max = audio.duration

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60); 
    const segundosRestantes = Math.floor(segundos % 60); 

    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
}

audio.addEventListener('timeupdate', () => {
    tempoRestante = audio.duration - audio.currentTime
    tempoInicio.textContent = formatarTempo(tempoRestante); 
});

audio.addEventListener('timeupdate', () => {
    tempoFinal.textContent = formatarTempo(audio.currentTime); 
});


botaoAnterior.addEventListener('click', () => {
    audio.currentTime = 0
    pause = true
})

botaoProximo.addEventListener('click', () => {
    audio.currentTime = audio.duration
})

botaoPauseResume.addEventListener('click', () => {
    if (pause){
        audio.pause();
        pause = !pause
        imgPauseResume.src = playImg
    }else{
        audio.play();
        pause = !pause
        imgPauseResume.src = resumeImg
    }
})

function inicializarTimeLine() {
    timeLine.value = audio.currentTime; 
}

audio.addEventListener('loadedmetadata', () => {
    inicializarTimeLine();
});

audio.addEventListener('timeupdate', () => {
    timeLine.value = audio.currentTime; 
});

timeLine.addEventListener('input', () => {
    audio.currentTime = timeLine.value;
});

audioLevel.addEventListener('input', () => {
    audio.volume = audioLevel.value
})

mute.addEventListener('click', () => {
    audioLevel.value = 0
    audio.volume = 0
})