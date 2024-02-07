const jsConfetti = new JSConfetti()

const CONFETTI_CONFIG = {
  //config del confetti
  confettiNumber: 1000,
  confettiColors: ['#b08ad1', '#f1e1ff', '#cb90fe'],
}

function confettiSplash() {
  jsConfetti.addConfetti(CONFETTI_CONFIG)
}

// export default confettiSplash; --> este se puede modificar el nombre al importarlo

// export { arr }; // --> este tiene un nombre fijo --> export nombrado

// const obj = {
//   funcion1: () => {},
//   confettiSplash,
// };

export { confettiSplash }
