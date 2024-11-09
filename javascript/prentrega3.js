document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');

    function mostrarPlanes() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cartItemsContainer.innerHTML = '';

        carrito.forEach((plan, index) => {
            const planDiv = document.createElement('div');
            planDiv.classList.add('cart-item');

            const planImg = document.createElement('img');
            planImg.src = `../img/${plan.nombre.toLowerCase()}option.png`;
            planImg.alt = `${plan.nombre} option`;
            planDiv.appendChild(planImg);

            const planName = document.createElement('h3');
            planName.textContent = plan.nombre;
            planDiv.appendChild(planName);

            const planIncludesTitle = document.createElement('h4');
            planIncludesTitle.textContent = "This plan includes:\n";
            planDiv.appendChild(planIncludesTitle);

            const planFeatures = document.createElement('ul');
            plan.caracteristicas.forEach(caracteristica => {
                const li = document.createElement('li');
                li.textContent = caracteristica;
                planFeatures.appendChild(li);
            });
            planDiv.appendChild(planFeatures);

            const planPrice = document.createElement('p');
            planPrice.classList.add('cart-item-price');

            let precio = 0;
            switch (plan.nombre) {
                case 'Free':
                    precio = 0;
                    break;
                case 'Pay':
                    precio = 1.5;
                    break;
                case 'Pro':
                    precio = 4;
                    break;
            }
            planPrice.textContent = `US $${precio.toFixed(2)}/month`;
            planDiv.appendChild(planPrice);

            const botonesDiv = document.createElement('div');
            botonesDiv.classList.add('cart-item-buttons');

            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.classList.add('cart-button');
            eliminarBtn.addEventListener('click', () => eliminarPlan(index));
            botonesDiv.appendChild(eliminarBtn);

            const cambiarBtn = document.createElement('button');
            cambiarBtn.textContent = 'Cambiar';
            cambiarBtn.classList.add('cart-button');
            cambiarBtn.addEventListener('click', () => cambiarPlan(index));
            botonesDiv.appendChild(cambiarBtn);

            planDiv.appendChild(botonesDiv);

            cartItemsContainer.appendChild(planDiv);
        });

        actualizarTotal();
    }

    function eliminarPlan(index) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarPlanes();
        actualizarContadorCarrito();
    }

    function cambiarPlan(index) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        window.location.href = './pricing.html';
    }

    function actualizarTotal() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const total = carrito.reduce((acc, plan) => {
            let precio = 0;
            switch (plan.nombre) {
                case 'Free':
                    precio = 0;
                    break;
                case 'Pay':
                    precio = 1.5;
                    break;
                case 'Pro':
                    precio = 4;
                    break;
            }
            return acc + precio;
        }, 0);

        cartTotalContainer.textContent = `Total: US $${total.toFixed(2)}/month`;
    }

    const actualizarContadorCarrito = () => {
        const cartCount = document.getElementById('cart-count');
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length > 0) {
            cartCount.textContent = carrito.length;
            cartCount.style.display = 'inline-block';
        } else {
            cartCount.style.display = 'none';
        }
    };

    mostrarPlanes();

    // Mostrar el modal al hacer clic en "Checkout"
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
        checkoutModal.show();
    });
});