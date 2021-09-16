import React from 'react';
import styles from '../../styles/components/Cart.module.scss';
import cn from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  getCartItems,
  getCartItemsTotalCount,
  getCartItemsTotalPrice,
} from '../../redux/selectors/cartSelectors';
import { CartItem } from '../index';

const Cart = React.memo(({ toggleVisibleCart, items }) => {
  const addedCartItems = Object.keys(items).map((item) => {
    return items[item].items[0];
  });

  const cartContentRef = React.useRef(null);

  const handleCartOutsideClick = React.useCallback((e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(cartContentRef.current)) {
      toggleVisibleCart(false);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('sneakersCartItems', JSON.stringify(items));
  });

  React.useEffect(() => {
    document.body.addEventListener('click', handleCartOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleCartOutsideClick);
    };
  }, [handleCartOutsideClick]);
  return (
    <div className={cn(styles.cart)}>
      <div className={cn(styles.cart__content)} ref={cartContentRef}>
        <h2 className={cn(styles.cart__title)}>Cart</h2>
        <div className={cn(styles.close_btn)} onClick={() => toggleVisibleCart(false)}></div>
        <div className={cn(styles.cart__items_wrapper)}>
          <div className={cn(styles.cart__items)}>
            {addedCartItems.map((item, index) => (
              <CartItem key={`${item}_${index}`} {...item} totalPrice={items[item.id].totalPrice} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  items: getCartItems(state),
  totalPrice: getCartItemsTotalPrice(state),
  totalCount: getCartItemsTotalCount(state),
});

export default compose(connect(mapStateToProps, {}))(Cart);
