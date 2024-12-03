const openModal = document.getElementById('openModal');
const modal = document.getElementById('modal');
const registerButton = document.getElementById('register');
const usernameInput = document.getElementById('username');
const error = document.getElementById('error');

// Abrir modal
openModal.addEventListener('click', () => {
  modal.classList.add('active');
});

// Validar username con AJAX
usernameInput.addEventListener('blur', () => {
  const username = usernameInput.value;
  fetch('/check-username', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        error.textContent = 'El nombre de usuario ya está registrado.';
      } else {
        error.textContent = '';
      }
    });
});

// Registrar usuario (simulado)
registerButton.addEventListener('click', () => {
  if (error.textContent) {
    alert('Por favor, elija otro nombre de usuario.');
    return;
  }
  alert('Usuario registrado correctamente.');
  modal.classList.remove('active');
});