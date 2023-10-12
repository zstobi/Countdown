//  LOGIC

// constantes del reloj
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const mins = document.querySelector('#mins');
const secs = document.querySelector('#secs');

// coleccion - cantidad de dias en mes
// meses del 0 al 11
const meses = {
    '0': 31,
    '1': 28,
    '2': 31,
    '3': 30,
    '4': 31,
    '5': 30,
    '6': 31,
    '7': 31,
    '8': 30,
    '9': 31,
    '10': 30,
    '11': 31
};

// constantes de tiempo
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

/*

estas dos variables no sirven para este proyecto, pero si para el grande

const month = day * 30;
const year = (month * 12) + 5;

*/

// fecha de salida payday 3
const fechaFutura = new Date(2023,8,21); //fechaFutura OG
const fechaFuturaDrop = new Date(2023,8,20,23,59,51); //para la música

// funcion que agrega un 0 en caso de tener un numero entre 0 y 10 sin incluir al 10
function adding0IfNecessary(section,time){
    if ( time < 10){
        section.textContent = '0' + time;
    } else {
        section.textContent = time;
    }
}

let fechaActual = new Date(2023,8,20,23,59,40); //pack de testeo
let norepeat = true;
let imgEnd = document.querySelector('#imgEnd');

// funcion que va a realizar la logica del paso del tiempo hacia la salida del payday 3
function timeCalculate(){

    // variable fecha actual
    //let fechaActual = new Date();

    let testSecs = fechaActual.getSeconds()
    console.log(testSecs +1 )
    fechaActual.setSeconds( (testSecs + 1) );
   

    // distancia total entre la fecha de salida y la fecha actual, en milisegundos
    let distanceToPayday3 = fechaFutura.getTime() - fechaActual.getTime();

    // distancia dias totales desde la fecha actual a la fecha de salida, en milisegundos
    let totalDaysLeft = distanceToPayday3 / day;

    // distancia horas totales desde la fecha actual a la fecha de salida, en milisegundos
    let hoursLeft = (totalDaysLeft - Math.floor(totalDaysLeft)) * 24;

    // distancia minutos totales desde la fecha actual a la fecha de salida, en milisegundos
    let minutesLeft = (hoursLeft - Math.floor(hoursLeft)) * 60;

    // distancia segundos totales desde la fecha actual a la fecha de salida, en milisegundos
    let secondsLeft = (minutesLeft - Math.floor(minutesLeft)) * 60;

    /*
    
    este while es para el proyecto grande: ( venir a buscar cuando arranquemos ese proyecto !!!)
    
    let mesFuturo = fechaFutura.getMonth();
    let mesActual = fechaActual.getMonth() + 1;
    let daysWithMonths = 0;
    let monthCounter = 0;

    while (mesActual != mesFuturo) {
        if ( mesActual === 11){
            mesActual = 0;
        }
        if (totalDaysLeft > daysWithMonths) {
            daysWithMonths += meses[mesActual];        
        }
        mesActual++;
        monthCounter++;
    };

    // estas constantes se usarian en caso de que hayan mas de 30 dias
    // ejemplo, los dias restantes son 65 -> en el casillero de mes iria un 2 y en el casillero de dias iria un 5
    const remainingMonths = Math.floor(monthCounter);
    const remainingDays = (Math.floor(totalDaysLeft) - daysWithMonths); // Math.floor(totalDaysLeft);

    */

    // constantes para obtener el entero que va a ser ingresado en el casillero que le corresponda
    // dias restantes
    let remainingDays = Math.floor(totalDaysLeft);
    // horas restantes
    let remainingHours = Math.floor(hoursLeft);
    // minutos restantes
    let remainingMinutes = Math.floor(minutesLeft);
    // segundos restantes
    let remainingSeconds = Math.floor(secondsLeft);

    // ubicamos los enteros en el casillero correspondiente
    adding0IfNecessary(days,remainingDays);
    adding0IfNecessary(hours,remainingHours);
    adding0IfNecessary(mins,remainingMinutes);
    adding0IfNecessary(secs,remainingSeconds);

    // comparamos fecha actual con futura
    // si faltan 5 segundos, actualiza la música justo antes del drop
    if (fechaActual > fechaFuturaDrop && norepeat) {
        norepeat = false
        audio.currentTime = 612;
    }

    // comparamos fecha actual con futura
    // si son iguales, finaliza el countdown y se activa la animacion
    if (fechaActual > fechaFutura) { // > porque === no servía
        clearInterval(timerTest);

        imgEnd.classList.remove('displayOffEnd');
        imgEnd.classList.add('displayOnEnd');

        confettiSplash();
    };
}

// countdown generado
let timerTest = setInterval(timeCalculate,1000);

// 
// 
// 

// ANIMATIONS

// animación final

// const jsConfetti = new JSConfetti();

// function confettiSplash() {

//     let timer = setInterval (()=>{

//         jsConfetti.addConfetti({
//             confettiNumber: 578,
//             confettiColors: [
//                 '#fff', '#c8bf57', '#50de82', '#28964f', '#2f6c45', '#2c814a',
//               ],
//         });
//         jsConfetti.addConfetti({
//             // emojis: ['🚨', '🚁', '🗽', '🔥', '📈', '🏧', '💵', '💸', '💰', '💲', '💷', '💣'],
//             emojis: ['💸', '💰', '💲'],
//             emojiSize: 45
//          });
//     },1000);
    
//     setTimeout(()=>{

//         clearInterval(timer);

//     },20000);
    

// };