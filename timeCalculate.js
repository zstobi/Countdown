// let timerTest = setInterval(timeCalculate, 1000);

// constantes del reloj
export const days = document.querySelector('#days');
export const hours = document.querySelector('#hours');
export const mins = document.querySelector('#mins');
export const secs = document.querySelector('#secs');

// constantes de tiempo
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// fecha de fin de contador
const fechaFutura = new Date(); // aca hay que agregarle los inputs del html

// funcion que agrega un 0 delante de un número en caso de tener un número del contador entre 0 y 10, sin incluir al 10
function adding0IfNecessary(section, time) {
  if (time < 10) {
    section.textContent = '0' + time;
  } else {
    section.textContent = time;
  }
}
// para testeos
let fechaActual = new Date(2023, 8, 20, 23, 59, 40);
// funcion que va a realizar la logica del paso del tiempo hacia la salida del payday 3
export function timeCalculate() {
  let updateSecs = fechaActual.getSeconds();
  fechaActual.setSeconds(updateSecs + 1);

  // distancia total entre la fecha futura y la fecha actual, en milisegundos
  let distanciaAFechaFutura = fechaFutura.getTime() - fechaActual.getTime();

  // distancia dias totales desde la fecha actual a la fecha de salida, en milisegundos
  let diasRestantes = distanciaAFechaFutura / day;

  // distancia horas totales desde la fecha actual a la fecha de salida, en milisegundos
  let horasRestantes = (diasRestantes - Math.floor(diasRestantes)) * 24;

  // distancia minutos totales desde la fecha actual a la fecha de salida, en milisegundos
  let minsRestantes = (horasRestantes - Math.floor(horasRestantes)) * 60;

  // distancia segundos totales desde la fecha actual a la fecha de salida, en milisegundos
  let secsRestantes = (minsRestantes - Math.floor(minsRestantes)) * 60;

  // constantes para obtener el entero que va a ser ingresado en el casillero que le corresponda
  // dias restantes
  let diasRestantesAMostrar = Math.floor(diasRestantes);
  // horas restantes
  let horasRestantesAMostrar = Math.floor(horasRestantes);
  // minutos restantes
  let minsRestantesAMostrar = Math.floor(minsRestantes);
  // segundos restantes
  let secsRestantesAMostrar = Math.floor(secsRestantes);

  // ubicamos los enteros en el casillero correspondiente
  adding0IfNecessary(days, diasRestantesAMostrar);
  adding0IfNecessary(hours, horasRestantesAMostrar);
  adding0IfNecessary(mins, minsRestantesAMostrar);
  adding0IfNecessary(secs, secsRestantesAMostrar);

  // comparamos fecha actual con futura
  // si son iguales, finaliza el countdown y se resetea
  if (fechaActual > fechaFutura) {
    // > porque === no servía ***
    clearInterval(timerTest);
  }

  // *** Cuando se quiere hacer una comparación de fechas, en este caso la fecha traída puede llegar a tener miliseg de sobra, lo que hace que una comparativa "===" falle, porque si se saltea un segundo estero desde ahí (supongamos que la fecha actual fuese 11:59 con 5 miliseg y la futura 11:59) ya no sería IGUAL, sería MAYOR (quedaría 12:00 con 5 miliseg, contra 12:00)
}
