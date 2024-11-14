const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

timer = [0, 0, 0, 0]; // [Min, Seg, CentSeg, MilSeg]
var interval;
var timerRunning = false;

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time){
    if(time <= 9){
        time = `0${time}`;
    }
    return time;
}

// Executa um timer padrão de minuto / segundo / centésimos:
function runTimer(){
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2])
    theTimer.innerHTML = currentTime;
    timer[3]++; // incrementando o timer na posição 3 ou 4º char

    timer[0] = Math.floor((timer[3]/100)/60); // timer na posição 3 é o (milésimo de segundo / 100, pra ser apenas segundos) / por 60 pra ter os minutos
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Verifica se texto digitado com o fornecido na página:
function spellCheck(){
    let textEntered = testArea.value; // variável de texto inserido = valor escrito na área de texto
    let originTextMatch = originText.substring(0, textEntered.length) // texto de origem até o momento deve = ao texto resposta

    if(textEntered == originText){ // teste se o texto digitado é igual ao texto original
        clearInterval(interval);
        testWrapper.style.borderColor = '#429890';
    }else{
        if(textEntered == originTextMatch){ // texto escrito é == ao texto original até o momento
            testWrapper.style.borderColor = '#65CCF3';
        }else{
            testWrapper.style.borderColor = '#E95D0F';
        }
    }
}

// Inicia o cronômetro:
function start(){
    let textEnteredLength = testArea.value.length // valor do comprimento do campo testArea sendo atribuido a textEnteredLength
    if(textEnteredLength === 0 && !timerRunning){ // o operador "===" verifica não só o valor, mas também o tipo da variável
        /*A função setInterval é usada para chamar uma função repetidamente em um intervalo de tempo especificado.
        Neste caso, a função runTimer será chamada a cada 10 milissegundos.*/
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength)
}
// Função de recomeçar:
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Listeners de eventos para entrada de teclado e o botão de recomeçar:

testArea.addEventListener("keypress", start, false) // evento de pressionar a tecla
testArea.addEventListener("keyup", spellCheck, false)
resetButton.addEventListener("click", reset, false);