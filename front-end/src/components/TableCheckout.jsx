import React, { useContext } from 'react';
import Context from '../context/context';
import FinishForm from './FinishForm';

export default function TableCheckout() {
  const { storage, setStorage } = useContext(Context);
  const tableHead = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor unitário',
    'Sub-total',
    'Remover item',
  ];

  const removeQuantity = (id) => {
    const indexItem = storage.findIndex((item) => item.id === id);
    storage.splice(indexItem, 1);
    return setStorage([...storage]);
  };

  return (
    <div>
      <p>Finalizar Pedido</p>
      <table>
        <thead>
          <tr>
            {tableHead.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
          </tr>
        </thead>
        {
          storage.map((e, i) => (
            <tr key={ e.id }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {e.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {e.quantity}

              </td>
              <td>
                R$
                {' '}
                <span
                  data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
                >
                  {e.price.replace(/\./, ',')}

                </span>
              </td>
              <td>
                R$
                {' '}
                <span
                  data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
                >
                  {(e.price * e.quantity).toFixed(2).replace(/\./, ',')}

                </span>
              </td>
              <td>
                <button
                  onClick={ () => removeQuantity(e.id) }
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  type="button"
                >
                  Remover

                </button>
              </td>
            </tr>
          ))
        }
      </table>
      <p>
        TOTAL DO PEDIDO R$
        {' '}
        <span data-testid="customer_checkout__element-order-total-price">
          {storage.reduce((acc, c) => c.price * c.quantity + acc, 0).toFixed(2).replace(/\./, ',')}
        </span>
      </p>
      <FinishForm />
    </div>
  );
}