import { confettiSplash } from './confetti.js'; // export nombrado

// constantes del reloj
export const days = document.querySelector('#days');
export const hours = document.querySelector('#hours');
export const mins = document.querySelector('#mins');
export const secs = document.querySelector('#secs');

// constantes del reloj
export const countdownDays = document.querySelector('#divDays');
export const countdownHours = document.querySelector('#divHours');
export const countdownMins = document.querySelector('#divMins');
export const countdownSecs = document.querySelector('#divSecs');

const form = document.querySelector('#formCounter'); // el formulario del countdown
const runningCounter = document.querySelector('#runningCounter');
const counterInputs = document.querySelector('#counterInputs');

const start = document.querySelector('#start');

form.addEventListener('submit', (e)=>{
  e.preventDefault(); // para evitar el reset de la página

  let daysValue = Number(days.value);
  let hoursValue = Number(hours.value); //conseguimos los números de cada valor
  let minsValue = Number(mins.value);
  let secsValue = Number(secs.value);

  runningCounter.classList.toggle('no-display'); //el toggle entre los display de ambos contadores (el input y el running)
  counterInputs.classList.toggle('no-display');

  addContent(daysValue,hoursValue,minsValue,secsValue);
  
  // adding0IfNecessary(days, daysValue);
  // adding0IfNecessary(hours, hoursValue);
  // adding0IfNecessary(mins, minsValue);
  // adding0IfNecessary(secs, secsValue);


  // console.log(`${daysValue} + ${hoursValue} + ${minsValue} + ${secsValue}`);


  
  // let countdown = setInterval((timeCalculate(futureDate, actualDate)),1000);
 
  let futureDate = setFutureDate(daysValue,hoursValue,minsValue,secsValue); //fecha a la que se llega

  let actualDate = new Date(); //hoy, se usa para comparar con la futura y sacar el tiempo restante

  let countdown = setInterval(()=>{

    timeCalculate(futureDate, actualDate); //magia

    if (actualDate >= futureDate) {
      // > porque === no servía ***
      clearInterval(countdown);
      for (let i = 0; i < 3; i++) { //repeat de 3
        confettiSplash()
        confettiSplash()
        // sleep 0.2 seg
      }
    }
  },1000);


});

// function test(a,b,c,d){
//   console.log(`${a} + ${b} + ${c} + ${d}`);
// }

function addContent(days,hours,mins,secs){
    //cambia el contenido de texto en los divs del HTML

  countdownDays.textContent = days;
  countdownHours.textContent = hours;
  countdownMins.textContent = mins;
  countdownSecs.textContent = secs;

}

// constantes de tiempo
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// fecha de fin de contador
function setFutureDate(days,hours,mins,secs){
  //setear la fecha futura

  // aca hay que agregarle los inputs del html
  const futureDate = new Date();
  
  let futureSeconds = futureDate.getSeconds() + secs;
  let futureMinutes = futureDate.getMinutes() + mins; 
  let futureHours = futureDate.getHours() + hours;
  let futureDays = futureDate.getDate() + days;

  futureDate.setDate(futureDays);
  futureDate.setHours(futureHours);
  futureDate.setMinutes(futureMinutes);
  futureDate.setSeconds(futureSeconds);
  
  return futureDate;
}

// funcion que agrega un 0 delante de un número en caso de tener un número del contador entre 0 y 10, sin incluir al 10
function adding0IfNecessary(section, time) {
  if (time < 10) {
    section.textContent = '0' + time;
  } else {
    section.textContent = time;
  }
}

// funcion que va a realizar la logica del paso del tiempo hacia la futureDate
export function timeCalculate(futureDate, actualDate) {

  // subir un segundo a la fecha actual 

  let updateSecs = actualDate.getSeconds();
  actualDate.setSeconds(updateSecs + 1);

  if ( actualDate >= futureDate) {
    futureDate = actualDate
  }

  // // distancia total entre la fecha futura y la fecha actual, en milisegundos
  // // console.log(futureDate)
  // let distanciaAfutureDate = futureDate.getTime() - actualDate.getTime();

  // // distancia dias totales desde la fecha actual a la fecha de salida, en milisegundos
  // let diasRestantes = distanciaAfutureDate / day;

  // // distancia horas totales desde la fecha actual a la fecha de salida, en milisegundos
  // let horasRestantes = (diasRestantes - parseInt(diasRestantes)) * 24;

  // // distancia minutos totales desde la fecha actual a la fecha de salida, en milisegundos
  // let minsRestantes = (horasRestantes - parseInt(horasRestantes)) * 60;

  // // distancia segundos totales desde la fecha actual a la fecha de salida, en milisegundos
  // let secsRestantes = (minsRestantes - parseInt(minsRestantes)) * 60;


  // distancia total entre la fecha futura y la fecha actual, en milisegundos
  // console.log(futureDate)
  let distanciaAfutureDate = futureDate.getTime() - actualDate.getTime();

  // distancia dias totales desde la fecha actual a la fecha de salida, en milisegundos
  let diasRestantes = distanciaAfutureDate / day;

  // distancia horas totales desde la fecha actual a la fecha de salida, en milisegundos
  let horasRestantes = (diasRestantes - Math.floor(diasRestantes)) * 24;

  // distancia minutos totales desde la fecha actual a la fecha de salida, en milisegundos
  let minsRestantes = (horasRestantes - Math.floor(horasRestantes)) * 60;

  // distancia segundos totales desde la fecha actual a la fecha de salida, en milisegundos
  let secsRestantes = (minsRestantes - Math.floor(minsRestantes)) * 60;


  // console.log("-----------ACTUAL-------------------------")
  // console.log(actualDate)
  // console.log("------------FUTURE------------------------")
  // console.log(futureDate)
  // console.log("-------------RAW RESULT-----------------------")
  // console.log(diasRestantes, horasRestantes, minsRestantes, secsRestantes)

  // constantes para obtener el entero que va a ser ingresado en el casillero que le corresponda
  // dias restantes

  let diasRestantesAMostrar = Math.floor(diasRestantes);
  // horas restantes
  let horasRestantesAMostrar = Math.floor(horasRestantes);
  // minutos restantes
  let minsRestantesAMostrar = Math.floor(minsRestantes);
  // segundos restantes
  let secsRestantesAMostrar = Math.round(secsRestantes); //round para evitar que se repitan números y se salteen

  console.log(diasRestantesAMostrar,horasRestantesAMostrar,minsRestantesAMostrar,secsRestantesAMostrar)

  // ubicamos los enteros en el casillero correspondiente, con 0 atrás (si no es > 10)
  adding0IfNecessary(countdownDays, diasRestantesAMostrar);
  adding0IfNecessary(countdownHours, horasRestantesAMostrar);
  adding0IfNecessary(countdownMins, minsRestantesAMostrar);
  adding0IfNecessary(countdownSecs, secsRestantesAMostrar);

  // comparamos fecha actual con futura
  // si son iguales, finaliza el countdown y se resetea
  // if (actualDate > futureDate) {
  //   // > porque === no servía ***
  //   clearInterval(timerTest);
  // }

  // *** Cuando se quiere hacer una comparación de fechas, en este caso la fecha traída puede llegar a tener miliseg de sobra, lo que hace que una comparativa "===" falle, porque si se saltea un segundo estero desde ahí (supongamos que la fecha actual fuese 11:59 con 5 miliseg y la futura 11:59) ya no sería IGUAL, sería MAYOR (quedaría 12:00 con 5 miliseg, contra 12:00)
}