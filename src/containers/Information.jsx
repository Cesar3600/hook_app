import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../context/AppContext';
import '../styles/components/Information.css';

const Information = ({ history }) => {
  const { state, addToBuyer } = useContext(AppContext);
  const form = useRef(null);

  const handleSubmit = () => {
    const dataForm = new FormData(form.current);

    const buyer = {
      name: dataForm.get('name'),
      email: dataForm.get('email'),
      address: dataForm.get('address'),
      apto: dataForm.get('apto'),
      city: dataForm.get('city'),
      country: dataForm.get('country'),
      state: dataForm.get('state'),
      cp: dataForm.get('cp'),
      phone: dataForm.get('phone'),
    };

    addToBuyer(buyer);
    history.push('/checkout/payment');
  };

  return (
    <div className="Information">
      <div className="Information-content">
        <div className="Information-head">
          <h2>Informacion de contacto</h2>
        </div>
        <div className="Information-form">
          <form ref={form}>
            <input type="text" placeholder="Nombre completo" name="name" />
            <input type="text" placeholder="Correo electronico" name="email" />
            <input type="text" placeholder="Direccion" name="address" />
            <input type="text" placeholder="Apto" name="apto" />
            <input type="text" placeholder="Ciudad" name="city" />
            <input type="text" placeholder="Pais" name="country" />
            <input type="text" placeholder="Estado" name="state" />
            <input type="text" placeholder="Codigo Postal" name="cp" />
            <input type="text" placeholder="Telefono" name="phone" />
          </form>
        </div>
        <div className="Information-buttons">
          <div className="Information-back">
            <Link to="/checkout">Regresar</Link>
          </div>
          <div className="Information-next">
            <button type="button" onClick={handleSubmit}>
              Pagar
            </button>
          </div>
        </div>
      </div>
      <div className="Information-sidebar">
        <h3>Pedido</h3>
        {state.cart.map((product) => {
          return (
            <div className="Information-item" key={product.title}>
              <div className="Information-element">
                <h4>
                  {product.title} x {product.quantity}
                </h4>
                <span>$ {product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Information;
