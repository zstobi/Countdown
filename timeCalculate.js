// let timerTest = setInterval(timeCalculate, 1000);

// constantes del reloj
export const days = document.querySelector('#days');
export const hours = document.querySelector('#hours');
export const mins = document.querySelector('#mins');
export const secs = document.querySelector('#secs');

// constantes del reloj
export const divDays = document.querySelector('#divDays');
export const divHours = document.querySelector('#divHours');
export const divMins = document.querySelector('#divMins');
export const divSecs = document.querySelector('#divSecs');

const form = document.querySelector('#formCounter');
const runningCounter = document.querySelector('#runningCounter');
const counterInputs = document.querySelector('#counterInputs');

const start = document.querySelector('#start');

form.addEventListener('submit', (e)=>{
  e.preventDefault();



  let daysValue = Number(days.value);
  let hoursValue = Number(hours.value);
  let minsValue = Number(mins.value);
  let secsValue = Number(secs.value);

  // console.log(daysValue,hoursValue,minsValue,secsValue);

  runningCounter.classList.toggle('no-display');
  counterInputs.classList.toggle('no-display');

  addContent(daysValue,hoursValue,minsValue,secsValue);
  
  // adding0IfNecessary(days, daysValue);
  // adding0IfNecessary(hours, hoursValue);
  // adding0IfNecessary(mins, minsValue);
  // adding0IfNecessary(secs, secsValue);


  // console.log(`${daysValue} + ${hoursValue} + ${minsValue} + ${secsValue}`);


  
  // let countdown = setInterval((timeCalculate(futureDate, actualDate)),1000);
 
  let futureDate = setFutureDate(daysValue,hoursValue,minsValue,secsValue);

  let actualDate = new Date();

  actualDate.setMilliseconds(0)

  let countdown = setInterval(()=>{

    timeCalculate(futureDate, actualDate);

    if (actualDate > futureDate) {
      // > porque === no servía ***
      clearInterval(countdown);
    }
  },1000);


});

function test(a,b,c,d){
  console.log(`${a} + ${b} + ${c} + ${d}`);
}

function addContent(divDay,divHour,divMin,divSec){

  divDays.textContent = divDay;
  divHours.textContent = divHour;
  divMins.textContent = divMin;
  divSecs.textContent = divSec;

}

// constantes de tiempo
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// fecha de fin de contador
function setFutureDate(dv,hv,mv,sv){

  // aca hay que agregarle los inputs del html
  const futureDate = new Date();
  
  let futureSeconds = futureDate.getSeconds() + sv;
  let futureMinutes = futureDate.getMinutes() + mv;
  let futureHours = futureDate.getHours() + hv;
  let futureDays = futureDate.getDate() + dv;

  futureDate.setDate(futureDays);
  futureDate.setHours(futureHours);
  futureDate.setMinutes(futureMinutes);
  futureDate.setSeconds(futureSeconds);
  futureDate.setMilliseconds(0)
  
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

// funcion que va a realizar la logica del paso del tiempo hacia la futureDate 126489212764 / 24 = 3,5 
export function timeCalculate(futureDate, actualDate) {

  // subir un segundo a la fecha actual 
  let updateSecs = actualDate.getSeconds();
  actualDate.setSeconds(updateSecs + 1);

  

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
  let horasRestantes = (diasRestantes - Math.round(diasRestantes)) * 24;

  // distancia minutos totales desde la fecha actual a la fecha de salida, en milisegundos
  let minsRestantes = (horasRestantes - Math.round(horasRestantes)) * 60;

  // distancia segundos totales desde la fecha actual a la fecha de salida, en milisegundos
  let secsRestantes = (minsRestantes - Math.round(minsRestantes)) * 60;


  console.log("-----------ACTUAL-------------------------")
  console.log(actualDate)
  console.log("------------FUTURE------------------------")
  console.log(futureDate)
  console.log("-------------RAW RESULT-----------------------")
  console.log(diasRestantes, horasRestantes, minsRestantes, secsRestantes)

  // constantes para obtener el entero que va a ser ingresado en el casillero que le corresponda
  // dias restantes
  let diasRestantesAMostrar = Math.round(diasRestantes);
  // horas restantes
  let horasRestantesAMostrar = Math.round(horasRestantes);
  // minutos restantes
  let minsRestantesAMostrar = Math.round(minsRestantes);
  // segundos restantes
  let secsRestantesAMostrar = Math.round(secsRestantes);

  console.log(diasRestantesAMostrar,horasRestantesAMostrar,minsRestantesAMostrar,secsRestantesAMostrar)

  // ubicamos los enteros en el casillero correspondiente
  adding0IfNecessary(divDays, diasRestantesAMostrar);
  adding0IfNecessary(divHours, horasRestantesAMostrar);
  adding0IfNecessary(divMins, minsRestantesAMostrar);
  adding0IfNecessary(divSecs, secsRestantesAMostrar);

  // comparamos fecha actual con futura
  // si son iguales, finaliza el countdown y se resetea
  // if (actualDate > futureDate) {
  //   // > porque === no servía ***
  //   clearInterval(timerTest);
  // }

  // *** Cuando se quiere hacer una comparación de fechas, en este caso la fecha traída puede llegar a tener miliseg de sobra, lo que hace que una comparativa "===" falle, porque si se saltea un segundo estero desde ahí (supongamos que la fecha actual fuese 11:59 con 5 miliseg y la futura 11:59) ya no sería IGUAL, sería MAYOR (quedaría 12:00 con 5 miliseg, contra 12:00)
}