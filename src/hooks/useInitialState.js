import { useState } from 'react';
import InitialState from '../InitialState';

const useInitialState = () => {
  const [state, setState] = useState(InitialState);

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((el) => el.id !== payload.id),
    });
  };

  return {
    addToCart,
    removeFromCart,
    state,
  };
};

export default useInitialState;
