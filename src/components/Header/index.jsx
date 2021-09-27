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
import { NavLink } from 'react-router-dom';
import { getFavouritesItemList } from '../../redux/selectors/appSelectors';
import { actions as cartActions } from '../../redux/reducers/cartReducer';
import { setOrderSuccess } from '../../redux/reducers/cartReducer';

const Header = React.memo(({ totalCount, totalPrice, items, clearCart, setOrderSuccess }) => {
  const itemsCount = items.length;
  const fixedTotalPrice = Number(totalPrice.toFixed(2));
  React.useEffect(() => {
    sessionStorage.setItem('sneakersCartItemsTotalPrice', JSON.stringify(totalPrice));
    sessionStorage.setItem('sneakersCartItemsTotalCount', JSON.stringify(totalCount));
  });
  const [visibleCart, toggleVisibleCart] = React.useState(false);
  const handleCartVisibility = () => {
    toggleVisibleCart(true);
  };

  const handleClearCart = () => {
    if (window.confirm('Do you want to clear cart?')) {
      setOrderSuccess({}, 0, 0);
      clearCart();
    }
  };
  return (
    <div className={cn(styles.headerWrapper)}>
      <header className={cn(styles.header)}>
        <div className={cn(styles.header__logo)}>
          <NavLink to="/">
            <img src={logo} alt="logo" />
            <p className={cn(styles.header__logo_title)}>React Sneakers</p>
            <p className={cn(styles.header__logo_descr)}>The Best Sneakers Shop</p>
          </NavLink>
        </div>
        <div className={cn(styles.header__cart)} onClick={handleCartVisibility}>
          {totalCount && totalCount > 0 ? (
            <i className={cn(styles.header__cart_amount)}>{totalCount}</i>
          ) : null}
          <img src={cartIcon} alt="cart icon" />
          <span className={cn(styles.cart__money_sum)}>{`${fixedTotalPrice} USD`}</span>
        </div>
        <div className={cn(styles.header__favourites)}>
          {items && itemsCount > 0 ? (
            <i className={cn(styles.favourites_count)}>{itemsCount}</i>
          ) : null}
          <NavLink to="/favourites">
            <img src={favorIcon} alt="favourites icon" />
          </NavLink>
        </div>
        <a
          rel="nofollow"
          target="_self"
          title="clear cart"
          className={cn(styles.header__trash)}
          onClick={handleClearCart}>
          <i className="fa fa-trash-o"></i>
        </a>
      </header>
      {visibleCart ? <Cart toggleVisibleCart={toggleVisibleCart} /> : null}
    </div>
  );
});

const mapStateToProps = (state) => ({
  items: getFavouritesItemList(state),
  totalPrice: getCartItemsTotalPrice(state),
  totalCount: getCartItemsTotalCount(state),
});

export default compose(
  connect(mapStateToProps, { clearCart: cartActions.clearCart, setOrderSuccess }),
)(Header);
