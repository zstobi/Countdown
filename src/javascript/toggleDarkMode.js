const darkModeButton = document.getElementById('dark-mode-button')
const html = document.querySelector('html')

function handleClick() {
  const theme = html.getAttribute('data-theme')

  if (theme === 'dark') {
    html.setAttribute('data-theme', 'light')
  } else {
    html.setAttribute('data-theme', 'dark')
  }
}

darkModeButton.addEventListener('click', handleClick)
