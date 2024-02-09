import { getRandomColor } from '../utils/getRandomColor.js'

const spans = document.querySelectorAll('.title span') // NodeList
const html = document.querySelector('html')

// Función para cambiar el color de los spans según el tema
function changeSpanColor(theme) {
  const color = theme === 'dark' ? '#ffffff' : '#121212'

  spans.forEach((span) => {
    span.style.color = color
  })
}

// Función de callback para el observador de mutaciones
function mutationCallback() {
  const theme = html.getAttribute('data-theme')
  changeSpanColor(theme)
}

// Crear el observador de mutaciones
const observer = new MutationObserver(mutationCallback)

// Configurar y observar los cambios en el elemento HTML
const config = { attributes: true }
observer.observe(html, config)

// Escuchar eventos mouseover y mouseleave para cambiar color de los spans
spans.forEach((span) => {
  span.addEventListener('mouseover', () => {
    span.style.color = getRandomColor()
  })

  span.addEventListener('mouseleave', () => {
    const theme = html.getAttribute('data-theme')

    if (theme === 'dark') {
      span.style.color = '#ffffff'
    } else {
      span.style.color = '#121212'
    }
  })
})
