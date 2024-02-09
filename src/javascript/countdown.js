import { confettiSplash } from './confettiSplash.js'

// --- --- ---

const inputContainer = document.getElementById('input-container') // HTMLElement (section)
const form = document.getElementById('form') // HTMLFormElement

const inputs = inputContainer.children // HTMLCollection
const inputsArray = Array.from(inputs) // [input#days, input#hours, input#minutes, input#seconds]

// --- --- ---

function handleClick(evt) {
  if (evt.target === inputContainer) return
  if (evt.target.value !== '0') return
  evt.target.value = ''
}

inputContainer.addEventListener('click', handleClick)

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

// --- --- ---

let intervalID

function countdownStart() {
  const { days, hours, minutes, seconds } = inputs

  intervalID = setInterval(() => {
    if (inputsArray.every((input) => input.value === '0' || !input.value)) {
      countdownEnd()
      return
    }

    if (seconds.value > '0') {
      seconds.value -= 1
    } else if (minutes.value > '0') {
      minutes.value -= 1
      seconds.value = 59
    } else if (hours.value > '0') {
      hours.value -= 1
      minutes.value = 59
      seconds.value = 59
    } else if (days.value > '0') {
      days.value -= 1
      hours.value = 23
      minutes.value = 59
      seconds.value = 59
    }
  }, 1000)
}

// --- --- ---

function countdownEnd() {
  clearInterval(intervalID)
  form.start.disabled = false
  confettiSplash()
}
