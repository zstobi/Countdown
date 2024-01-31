const jsConfetti = new JSConfetti();

const CONFETTI_CONFIG = { //config del confetti
  confettiNumber: 578,
  confettiColors: ['#fff', '#c8bf57', '#50de82', '#28964f', '#2f6c45', '#2c814a'],
};

function confettiSplash() {
  jsConfetti.addConfetti(CONFETTI_CONFIG);
}

// export default confettiSplash; --> este se puede modificar el nombre al importarlo

// export { arr }; // --> este tiene un nombre fijo --> export nombrado

// const obj = {
//   funcion1: () => {},
//   confettiSplash,
// };

export { confettiSplash };
