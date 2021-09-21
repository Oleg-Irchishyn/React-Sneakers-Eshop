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
import { NavLink, Route } from 'react-router-dom';
import emptyCart from '../../assets/images/cart-empty.png';

const Cart = React.memo(({ toggleVisibleCart, items, totalCount, totalPrice }) => {
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

  const closeEmptyCart = () => {
    toggleVisibleCart(false);
  };

  React.useEffect(() => {
    localStorage.setItem('sneakersCartItems', JSON.stringify(items));
    localStorage.setItem('sneakersCartItemsTotalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('sneakersCartItemsTotalCount', JSON.stringify(totalCount));
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
        {totalCount && totalCount > 0 ? (
          <div className={cn(styles.cart__items_wrapper)}>
            <div className={cn(styles.cart__items)}>
              {addedCartItems.map((item, index) => (
                <CartItem
                  key={`${item}_${index}`}
                  {...item}
                  totalPrice={items[item.id].totalPrice}
                  totalCount={items[item.id].items.length}
                />
              ))}
            </div>
          </div>
        ) : null}
        {totalCount && totalCount > 0 ? (
          <Route exact path="/">
            <div className={cn(styles.cart__content_bottom)}>
              <div className={cn(styles.content_bottom__amount)}>
                <p>Total Amount</p>
                <p className={cn(styles.line)}></p>
                <p>{totalCount}</p>
              </div>
              <div className={cn(styles.content_bottom__price)}>
                <p>Total Price</p>
                <p className={cn(styles.line)}></p>
                <p>{`${Number(totalPrice).toFixed(2)} USD`}</p>
              </div>

              <NavLink to="/order">
                <div className={cn(styles.btn_add)}>Make an order</div>
              </NavLink>
            </div>
          </Route>
        ) : null}
        {!totalCount ? (
          <div className={cn(styles.cart__content_empty)}>
            <img src={emptyCart} alt="empty cart icon" />
            <p>Cart is empty</p>
            <p>Please add at least one pair of sneakers to make an order</p>
            <NavLink to="/">
              <div
                className={cn(styles.btn_add)}
                onClick={() => {
                  closeEmptyCart();
                }}>
                Back to purchases
              </div>
            </NavLink>
          </div>
        ) : null}
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
