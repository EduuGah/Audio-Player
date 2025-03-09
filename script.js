const botaoAnterior = document.querySelector('.Ant');
const botaoProximo = document.querySelector('.Prox');
const botaoPauseResume = document.querySelector('.PauseOrPlay');
const botaoEnviar = document.getElementById('botaoEnviar');
const audioUpload = document.getElementById('audioUpload');
const enviarDados = document.getElementById('enviarDados')
const trackName = document.getElementById('trackName')
const autorName = document.getElementById('autorMusica')
let imgPauseResume = document.getElementById('pauseOrResume');
let tempoInicio = document.getElementById('tempoComecou');
let tempoFinal = document.getElementById('tempoTerminar');
let timeLine = document.getElementById('timeLine');
let audioLevel = document.getElementById('audioLevel');
let mute = document.getElementById('somImg');
let audio = new Audio(); 

let value = 50;
let pause = false;

let resumeImg = 'img/PAUSE.png';
let playImg = 'img/PLAY.png';

function showCustomAlert() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById('mensagemAlerta').innerText = `${mensagem}`;
}

function closeCustomAlert() {
    document.getElementById("myModal").style.display = "none";
}

audioUpload.addEventListener('change', (event) => {
    const arquivo = event.target.files[0];
    if (arquivo) {
        audio.src = URL.createObjectURL(arquivo);
        audio.load(); 
        pause = false
        imgPauseResume.src = playImg
        showCustomAlert()
    }
});

enviarDados.addEventListener('click', () =>{
    dadoNomeMusica = document.getElementById('dadoNomeMusica').value
    dadoCantorMusica = document.getElementById('dadoCantorMusica').value

    trackName.textContent = dadoNomeMusica
    autorName.textContent = dadoCantorMusica
    closeCustomAlert()
})

botaoEnviar.addEventListener('click', () => {
    audioUpload.click(); 
});

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
}

audio.addEventListener('canplaythrough', () => {
    const audioDuracao = audio.duration;
    timeLine.max = audioDuracao;
    inicializarTimeLine();
    tempoFinal.textContent = formatarTempo(audio.currentTime);  
    tempoInicio.textContent = formatarTempo(audio.duration - audio.currentTime);  
});

audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        tempoFinal.textContent = formatarTempo(audio.currentTime); 
        tempoInicio.textContent = formatarTempo(audio.duration - audio.currentTime);
    }
});

function animar(botao, tempo) {
    botao.style.transform = "scale(1.1)";

    setTimeout(() => {
        botao.style.transform = "scale(1)";
    }, tempo); 
}

botaoAnterior.addEventListener('click', () => {
    audio.currentTime = 0;
    pause = true;
    animar(botaoAnterior, 200);
});

botaoProximo.addEventListener('click', () => {
    audio.currentTime = audio.duration;
    animar(botaoProximo, 200);
});

botaoPauseResume.addEventListener('click', () => {
    animar(botaoPauseResume, 400);
    if (pause) {
        audio.pause();
        pause = !pause;
        imgPauseResume.src = playImg;
    } else {
        audio.play();
        pause = !pause;
        imgPauseResume.src = resumeImg;
    }
});

function inicializarTimeLine() {
    timeLine.max = audio.duration;
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
    audio.volume = audioLevel.value;
});

mute.addEventListener('click', () => {
    audioLevel.value = 0;
    audio.volume = 0;
});
