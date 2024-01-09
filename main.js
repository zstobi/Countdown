//  LOGIC

// constantes del reloj
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const mins = document.querySelector('#mins');
const secs = document.querySelector('#secs');

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
function timeCalculate() {
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

// countdown generado
let timerTest = setInterval(timeCalculate, 1000);

//
//
//

// ANIMATIONS

// animación final

// import confettiSplash from './confetti.js'; export default
import { confettiSplash } from './confetti.js'; // export nombrado

const splash = document.querySelector('#splash');
splash.addEventListener('click', confettiSplash);

// CHANGE THEME

const activator = document.querySelector('.activator');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

let starter = 0;

activator.addEventListener('click', ()=>{

    if ( starter === 0) {
        starter = 1;
        activator.style.backgroundColor = 'hsla(204, 86%, 53%, 0.534)';
        activator.style.transform = 'translateX(48px)';
        moon.style.display = 'none';
        sun.style.display = 'block';
    } else {
        starter = 0;
        activator.style.backgroundColor = 'hsl(204, 86%, 53%)';
        activator.style.transform = 'translateX(0px)';
        moon.style.display = 'block';
        sun.style.display = 'none';
    }
});

const changeTheme = document.querySelector('.change');

function setBrightTheme(){
  console.log("1")
    document.body.style.setProperty('--bgc','#121212');
    localStorage.setItem('fondo','dark');
}

function setDarkTheme(){
  console.log("2")
    document.body.style.setProperty('--bgc','#ccc');
    localStorage.setItem('fondo','claro');
}

if (localStorage.getItem('fondo') === 'claro'){
    setDarkTheme();
} else {
    setBrightTheme();
}


changeTheme.addEventListener('click',()=>{
    let bgValue = localStorage.getItem('fondo');
    
    if (bgValue === 'claro'){
        setBrightTheme();
    } else {
        setDarkTheme();
    }

});
