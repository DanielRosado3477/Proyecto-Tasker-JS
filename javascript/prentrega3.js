document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.botones');
    const cartCount = document.getElementById('cart-count');
    const modal = document.getElementById("planModal");
    const spanPlanModal = document.getElementsByClassName("close-modal")[0];

    const agregarAlCarrito = (plan) => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(plan);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();

        document.getElementById('planName').textContent = plan.nombre;
        modal.style.display = "block";
    };

    const actualizarContadorCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length > 0) {
            cartCount.textContent = carrito.length;
            cartCount.style.display = 'inline-block';
        }
    };

    selectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const plan = {
                nombre: button.parentElement.querySelector('h2').textContent,
                precio: button.parentElement.querySelector('p:nth-of-type(3)').textContent,
                caracteristicas: Array.from(button.parentElement.querySelectorAll('li')).map(li => li.textContent)
            };

            agregarAlCarrito(plan);
        });
    });

    spanPlanModal.onclick = function () {
        modal.style.display = "none";
    };

    // Lógica para el modal de registro
    const registerButton = document.querySelector('.register');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModal = registerModal.querySelector('.close-modal');
    const registerForm = document.getElementById('register-form');
    const usernameInput = document.getElementById('reg-username');

    // Validación de username en tiempo real
    usernameInput.addEventListener('input', function() {
        const username = this.value.trim();
        
        if (username.length > 3) {
            fetch('../users.json')
                .then(response => response.json())
                .then(users => {
                    const usernameExists = users.some(user => user.username === username);
                    
                    if (usernameExists) {
                        this.setCustomValidity('Username already exists');
                        this.reportValidity();
                    } else {
                        this.setCustomValidity('');
                    }
                })
                .catch(error => {
                    console.error('Error checking username:', error);
                });
        }
    });

    // Abrir modal de registro
    registerButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        registerModal.style.display = 'block'; 
    });

    // Cerrar modal
    closeRegisterModal.addEventListener('click', () => {
        registerModal.style.display = 'none'; 
    });

    // Cerrar modal si se hace clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Función para validar el email usando Disify API
    const validateEmail = (email) => {
        const apiUrl = `https://api.disify.com/v1/email/${email}`;
        const apiKey = "YOUR_DISIFY_API_KEY"; // Aquí debes colocar tu API key de Disify

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'valid') {
                console.log('Email válido');
                registerForm.submit(); // Aquí el formulario se enviaría si el correo es válido
            } else {
                alert("El correo electrónico no es válido. Por favor, ingresa uno válido.");
            }
        })
        .catch(error => {
            console.error('Error al validar el email:', error);
            alert("Hubo un problema al validar el email. Intenta de nuevo.");
        });
    };

    // Manejo del evento de envío del formulario de registro
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('reg-name').value.trim(),
            lastname: document.getElementById('reg-lastname').value.trim(),
            email: document.getElementById('reg-email').value.trim(),
            username: document.getElementById('reg-username').value.trim(),
            password: document.getElementById('reg-password').value.trim(),
        };

        // Validaciones
        if (formData.name.length < 2) {
            alert('El nombre debe tener al menos 2 caracteres');
            return;
        }

        if (formData.lastname.length < 2) {
            alert('El apellido debe tener al menos 2 caracteres');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor ingrese un email válido');
            return;
        }

        // Validar el email con Disify
        validateEmail(formData.email);

        // Verificar disponibilidad de username
        fetch('../users.json')
            .then(response => response.json())
            .then(users => {
                const usernameExists = users.some(user => user.username === formData.username);
                
                if (usernameExists) {
                    alert('El username ya está en uso');
                    return;
                }

                // Si no existe, mostrar datos (en un escenario real, enviarías al backend)
                console.log('Nuevo usuario a registrar:', formData);
                
                alert('Usuario registrado exitosamente');
                registerModal.style.display = 'none';
                registerForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al registrar el usuario');
            });
    });
});
