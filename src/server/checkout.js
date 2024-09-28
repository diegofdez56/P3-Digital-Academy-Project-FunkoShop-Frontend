import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("http://localhost:8080/api/v1/checkout/create-checkout-session", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener la sesión de Stripe');
    }

    const { id } = await response.json();
    return id;
  };

  const sessionId = await fetchClientSecret();

  stripe.redirectToCheckout({ sessionId });
}

initialize().catch((error) => {
  console.error('Error al inicializar Stripe:', error);
});