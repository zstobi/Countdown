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

counterInputs.addEventListener('click', handleClick)

// --- --- ---

function handleMouseOut(evt) {
  if (evt.target === counterInputs) return
  if (inputsArray.some((input) => input.value !== '')) return

  inputsArray.forEach((input) => {
    input.value = '0'
  })
}

counterInputs.addEventListener('mouseout', handleMouseOut)

// --- --- ---

function handleSubmit(evt) {
  evt.preventDefault()

  form.start.disabled = true

  countdownStart()
}

form.addEventListener('submit', handleSubmit)

// --- --- ---

function handleClickReset() {
  clearInterval(intervalID)
  form.start.disabled = false
}

form.reset.addEventListener('click', handleClickReset)

let intervalID

function countdownStart() {
  const { days, hours, mins, secs } = inputs

  intervalID = setInterval(() => {
    if (inputsArray.every((input) => input.value === '0' || !input.value)) {
      countdownEnd()
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

function countdownEnd() {
  clearInterval(intervalID)
  form.start.disabled = false
  confettiSplash()
}

