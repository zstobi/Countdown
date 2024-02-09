const jsConfetti = new JSConfetti()

const CONFETTI_CONFIG = {
  confettiNumber: 1000,
  confettiColors: ['#fff', '#c8bf57', '#50de82', '#28964f', '#2f6c45', '#2c814a'],
}

function confettiSplash() {
  jsConfetti.addConfetti(CONFETTI_CONFIG)
}

export { confettiSplash }
