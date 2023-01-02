import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../styles/components/Checkout.css';

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemove = (product) => () => {
    removeFromCart(product);
  };

  const handleSumTotal = () =>
    state.cart.reduce((total, prod) => {
      return total + prod.price * prod.quantity;
    }, 0);

  return (
    <div className="Checkout">
      <div className="Checkout-content">
        <h3>Lista de Pedidos</h3>
        {cart.map((product) => (
          <div className="Checkout-item">
            <div className="Checkout-element">
              <h4>{product.title}</h4>
              <span>
                s/.
                {product.price} x {product.quantity}
              </span>
            </div>
            <button type="button" onClick={handleRemove(product)}>
              <i className="fas fa-trash-alt" />
            </button>
          </div>
        ))}
      </div>
      <div className="Checkout-sidebar">
        <h3>Precio total: $ {handleSumTotal()}</h3>
        <Link to="/checkout/information">
          <button type="button">Continuar Pedido</button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
