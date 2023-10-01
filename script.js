const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtImg = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const pauseSom =  new Audio('./sons/pause.mp3')
const playSom =  new Audio('./sons/play.wav')
const fimSom =  new Audio('./sons/beep.mp3')

playSom.volume = 0.5
pauseSom.volume = 0.5
let tempoDecorridoEmSegundos = 1500
let intervaloID = null

musica.loop = true


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    }else{
        musica.pause()
    }
    
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBT.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto' , contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade, <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;

        case "descanso-curto": 
            titulo.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;

            case "descanso-longo": 
            titulo.innerHTML = `
                Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            break;
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        console.log(intervaloID)
        fimSom.play()
        alert('Tempo esgotado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloID){
        iniciarOuPausarBtImg.setAttribute('src', './imagens/play_arrow.png')
        iniciarOuPausarBt.textContent = "Começar"
        pauseSom.play()
        zerar()
        return
    }
    playSom.play()
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBtImg.setAttribute('src', './imagens/pause.png')
    iniciarOuPausarBt.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloID)
    intervaloID = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()