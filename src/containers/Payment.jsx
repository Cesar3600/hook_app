import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import AppContext from '../context/AppContext';

import '../styles/components/Payment.css';

const Payment = ({ history }) => {
  const {
    state: { cart, buyer, addNewOrder },
    calculeQuantityOnCart,
  } = useContext(AppContext);

  const paypalOptions = {
    clientId:
      'AYkLptT74MSlLwfrXWw381k7ePAJSBNARzLFKjBJxOBevs59n9wr77RhNmjBz3KEGts2-dmPIGOX42Hy',
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen de pedido</h3>
        {cart.map((product) => (
          <div className="Payment-item" key={product.title}>
            <div className="Payment-element">
              <h4>
                {product.title} ($ {product.price}) x {product.quantity}
              </h4>
              <span>$ {product.price * product.quantity}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={calculeQuantityOnCart()}
            onPaymentStart={() => console.log('Start Payment!!!')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
