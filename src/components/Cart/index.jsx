import React from 'react';
import styles from '../../styles/components/Cart.module.scss';
import cn from 'classnames';

const Cart = ({ toggleVisibleCart }) => {
  const cartContentRef = React.useRef(null);

  const handleCartOutsideClick = React.useCallback((e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(cartContentRef.current)) {
      toggleVisibleCart(false);
    }
  }, []);

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
      </div>
    </div>
  );
};

export default Cart;
