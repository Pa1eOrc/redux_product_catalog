import classNames from 'classnames';
import { Carts } from '../../type/Carts';

import './Cart.scss';

type Props = {
  cart: Carts,
  handleCartAction: (
    id: string, action: 'add' | 'delete' | 'deleteAll') => void,
};

export const Cart: React.FC<Props> = ({
  cart,
  handleCartAction,
}) => {
  const {
    id,
    name,
    price,
    count,
    image,
    itemId,
    category,
  } = cart;

  const totalPrice = price * count;
  const imgFormat = () => {
    if (itemId.includes('iphone-12')
      || itemId.includes('iphone-13')
      || itemId.includes('iphone-14')) {
      return 'img/phones/apple-iphone-7/black/00.jpg';
    }

    if (category === 'phones') {
      return image.replace(/\.webp$/, '.jpg');
    }

    return image;
  };

  return (
    <section className="cart" key={id}>
      <div className="cart__container">
        <div className="cart__cross-container">
          <button
            type="button"
            title="delete item"
            className="cart__button cart__button--cross"
            data-cy="cartDeleteButton"
            onClick={() => handleCartAction(id, 'deleteAll')}
          >
            <span className="icon icon--cross" />
          </button>
        </div>
        <div className="cart__img-container">
          <img
            src={`${imgFormat()}`}
            alt={itemId}
            className="cart__img"
          />
        </div>
        <div className="cart__name-container">
          <p className="text">{name}</p>
        </div>
      </div>

      <div className="cart__container">
        <div className="cart__button-container">
          <button
            type="button"
            title="minus"
            className={classNames(
              'cart__button',
              { 'cart__button--minus': count === 1 },
            )}
            onClick={() => handleCartAction(id, 'delete')}
          >
            <span className={classNames(
              'icon',
              { 'icon--minus': count > 1 },
              { 'icon--minus-gray': count === 1 },
            )}
            />
          </button>
          <div className="cart__count">
            <p className="text">{count}</p>
          </div>
          <button
            type="button"
            title="plus"
            className="cart__button cart__button--plus"
            onClick={() => handleCartAction(id, 'add')}
          >
            <span className="icon icon--plus" />
          </button>
        </div>
        <p className="text text--h2 cart__price">{`$${totalPrice}`}</p>
      </div>
    </section>
  );
};
