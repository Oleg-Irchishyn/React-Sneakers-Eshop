import React from 'react';
import styles from '../../styles/components/Header.module.scss';
import cn from 'classnames';
import logo from '../../assets/images/logo.svg';
import cartIcon from '../../assets/images/cart.svg';
import favorIcon from '../../assets/images/favourite.svg';
import { Cart } from '../index';
import {
  getCartItemsTotalCount,
  getCartItemsTotalPrice,
} from '../../redux/selectors/cartSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Header = React.memo(({ totalCount, totalPrice }) => {
  React.useEffect(() => {
    localStorage.setItem('sneakersCartItemsTotalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('sneakersCartItemsTotalCount', JSON.stringify(totalCount));
  });
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
          {totalCount && totalCount > 0 ? (
            <i className={cn(styles.header__cart_amount)}>{totalCount}</i>
          ) : null}
          <img src={cartIcon} alt="cart icon" />
          <span className={cn(styles.cart__money_sum)}>{`${totalPrice} USD`}</span>
        </div>
        <div className={cn(styles.header__favourites)}>
          <img src={favorIcon} alt="favourites icon" />
        </div>
      </header>
      {visibleCart ? <Cart toggleVisibleCart={toggleVisibleCart} /> : null}
    </div>
  );
});

const mapStateToProps = (state) => ({
  totalPrice: getCartItemsTotalPrice(state),
  totalCount: getCartItemsTotalCount(state),
});

export default compose(connect(mapStateToProps, {}))(Header);
