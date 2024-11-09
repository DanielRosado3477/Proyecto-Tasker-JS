document.addEventListener('DOMContentLoaded', () => {
    const selectButtons = document.querySelectorAll('.botones');
    const cartCount = document.getElementById('cart-count');
    const modal = document.getElementById("planModal");
    const span = document.getElementsByClassName("close-modal")[0];

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
                precio: button.parentElement.querySelector('p:nth-of-type(3)').textContent, // Obtener solo el precio
                caracteristicas: Array.from(button.parentElement.querySelectorAll('li')).map(li => li.textContent)
            };

            agregarAlCarrito(plan);
        });
    });

    // Cerrar el modal
    span.onclick = function () {
        modal.style.display = "none";
    }
});