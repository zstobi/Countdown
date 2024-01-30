import { confettiSplash } from './confetti.js'

// --------------------------------------------------

const counterInputs = document.querySelector('#counterInputs')
const form = document.querySelector('#formCounter')
const inputs = counterInputs.children // HTMLCollection
const inputsArray = Array.from(inputs) // [input#days, input#hours, input#mins, input#secs]

// --------------------------------------------------

function handleClick(evt) {
  if (evt.target === counterInputs) return
  if (evt.target.value !== '0') return

  inputsArray.forEach((input) => {
    input.value = ''
  })
}

// --- --- ---

function handleMouseOut(evt) {
  if (evt.target === counterInputs) return
  if (inputsArray.some((input) => input.value !== '')) return

  inputsArray.forEach((input) => {
    input.value = '0'
  })
}

// --- --- ---

function handleSubmit(evt) {
  evt.preventDefault()

  form.start.disabled = true

  const { days, hours, mins, secs } = inputs

  countdownLogic({ days, hours, mins, secs })
}

// --- --- ---

function handleClickReset() {
  clearInterval(intervalID)
  form.start.disabled = false
}

// --------------------------------------------------

counterInputs.addEventListener('click', handleClick)
counterInputs.addEventListener('mouseout', handleMouseOut)
form.addEventListener('submit', handleSubmit)
form.reset.addEventListener('click', handleClickReset)

// --------------------------------------------------

let intervalID

function countdownLogic({ days, hours, mins, secs }) {
  intervalID = setInterval(() => {
    if (secs.value === '0' && mins.value === '0' && hours.value === '0' && days.value === '0') {
      counterEnd()
      return
    }

    if (secs.value > '0') {
      secs.value -= 1
    } else if (mins.value > '0') {
      mins.value -= 1
      secs.value = 59
    } else if (hours.value > '0') {
      hours.value -= 1
      mins.value = 59
      secs.value = 59
    } else if (days.value > '0') {
      days.value -= 1
      hours.value = 23
      mins.value = 59
      secs.value = 59
    }
  }, 1000)
}

function counterEnd() {
  clearInterval(intervalID)
  form.start.disabled = false
  confettiSplash()
}
