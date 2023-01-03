import { useState } from 'react';
import InitialState from '../InitialState';

const useInitialState = () => {
  const [state, setState] = useState(InitialState);

  const addToCart = (payload) => {
    // toma el estado cart
    const { cart } = state;

    // confirmo si es verdad que el producto ya existe. some devuelve booleano
    const itemExist = cart.some((prod) => prod.id === payload.id);

    // condicional if si itemExist es V o F
    // si existe itemExist
    if (itemExist) {
      // esto solo afectara a cada objeto perteneciente a cart
      // si el id del producto de cart y el del producto seleccionado son iguales
      // toma el obj del producto, agregale la propiedad quantity y sumale 1,
      // continua con el siguiente producto.
      // regresa el producto y almacenalo en constante consolidateCart
      const consolidateCart = cart.map((product) => {
        if (product.id === payload.id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return { ...product };
      });
      // Esto grabara dentro de cart el contenido de la variable consolidateCart
      // luego se setea el valor del estado state
      // de esta forma se crea dentro de cada obj de producto la cantidad
      // de elementos seleccionados
      setState((prevState) => ({
        ...prevState,
        cart: [...consolidateCart],
      }));
    }
    // si no existe
    // se setea cart del estado state
    // como el producto no existio anteriormente y por naturaleza no
    // tiene quantity agregas el payload que a su vez tiene agregado
    // la cantidad de elementos. cmo no existia antes sera 1
    else {
      setState((prev) => ({
        ...prev,
        cart: [...prev.cart, { ...payload, quantity: 1 }],
      }));
    }
  };

  // para remover elemento de cart
  const removeFromCart = (payload) => {
    // extrae la cantidad y el id de payload
    const { quantity, id } = payload;

    // pregunta la cantidad es mayor a 1
    if (quantity > 1) {
      // se hace un setState del state general(que contiene cart y products)
      setState((prevState) => ({
        ...prevState,
        cart: prevState.cart.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return { ...product };
        }),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        cart: prevState.cart.filter((product) => product.id !== id),
      }));
    }
  };

  const calculeQuantityOnCart = () => {
    return state.cart.reduce((total, prod) => {
      return total + prod.quantity;
    }, 0);
  };

  const addToBuyer = (payload) => {
    setState((prevState) => ({
      ...prevState,
      buyer: [...prevState.buyer, payload],
    }));
  };

  return {
    addToCart,
    removeFromCart,
    calculeQuantityOnCart,
    addToBuyer,
    state,
  };
};
export default useInitialState;

/* import { useState } from 'react';
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

export default useInitialState; */
