import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';
import Context from './context';

function ThisProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [qty, setQty] = useState(0);
  const [storage, setStorage] = useLocalStorage('carrinho', []);
  const [total, setTotal] = useState([]);

  const addQuantity = ({ id, name, price, urlImage, quantity }) => {
    const indexItem = storage.findIndex((item) => item.id === id);
    if (indexItem >= 0) {
      storage[indexItem].quantity += 1;
      setStorage([...storage]);
    } else {
      setStorage([...storage, { id, name, price, urlImage, quantity }]);
    }
  };

  const removeQuantity = (id) => {
    const indexItem = storage.findIndex((item) => item.id === id);
    if (indexItem >= 0 && storage[indexItem].quantity > 1) {
      storage[indexItem].quantity -= 1;
      return setStorage([...storage]);
    }
    storage.splice(indexItem, 1);
    return setStorage([...storage]);
  };

  const setQuantityWithInput = ({ id, name, price, url_image: urlImage, quantity }) => {
    console.log('provider', { id, name, price, urlImage, quantity });
    const indexItem = storage.findIndex((item) => item.id === id);
    if (indexItem >= 0 && quantity > 0) {
      storage[indexItem].quantity = quantity;
      return setStorage([...storage]);
    }
    if (indexItem >= 0 && quantity <= 0) {
      storage.splice(indexItem, 1);
      return setStorage([...storage]);
    }
    return setStorage([...storage, { id, name, price, urlImage, quantity }]);
  };

  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      qty,
      setQty,
      sellers,
      setSellers,
      cartItems,
      setCartItems,
      storage,
      setStorage,
      addQuantity,
      removeQuantity,
      setQuantityWithInput,
      total,
      setTotal,
    }),
    [cartItems, products, qty, sellers, setStorage, storage],
  );

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

ThisProvider.propTypes = { children: PropTypes.node.isRequired };

export default ThisProvider;
