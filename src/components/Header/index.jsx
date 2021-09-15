import React from 'react';
import styles from '../../styles/components/Header.module.scss';
import cn from 'classnames';
import logo from '../../assets/images/logo.svg';
import cartIcon from '../../assets/images/cart.svg';
import favorIcon from '../../assets/images/favourite.svg';
import { Cart } from '../index';

const Header = React.memo(() => {
  const [visibleCart, toggleVisibleCart] = React.useState(false);
  const handleCartVisibility = () => {
    toggleVisibleCart(true);
  };
  return (
    <div className={cn(styles.headerWrapper)}>
      <header className={cn(styles.header)}>
        <div className={cn(styles.header__logo)}>
          <img src={logo} alt="logo" />
          <p className={cn(styles.header__logo_title)}>React Sneakers</p>
          <p className={cn(styles.header__logo_descr)}>The Best Sneakers Shop</p>
        </div>
        <div className={cn(styles.header__cart)} onClick={handleCartVisibility}>
          <img src={cartIcon} alt="cart icon" />
          <span className={cn(styles.cart__money_sum)}>0 usd</span>
        </div>
        <div className={cn(styles.header__favourites)}>
          <img src={favorIcon} alt="favourites icon" />
        </div>
      </header>
      {visibleCart ? <Cart toggleVisibleCart={toggleVisibleCart} /> : null}
    </div>
  );
});

export default Header;
