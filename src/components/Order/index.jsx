import React from 'react';
import styles from '../../styles/components/Order.module.scss';
import cn from 'classnames';
import { NavLink, withRouter } from 'react-router-dom';
import {
  getCartItems,
  getCartItemsTotalCount,
  getCartItemsTotalPrice,
} from '../../redux/selectors/cartSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { OrderItem } from '..';
import { setOrderSuccess } from '../../redux/reducers/cartReducer';
import { actions as cartActions } from '../../redux/reducers/cartReducer';
import emptyCartSmile from '../../assets/images/cart-empty-smile.svg';

const Order = React.memo(
  ({ items, totalPrice, totalCount, setOrderSuccess, clearCart, history }) => {
    const handleOrder = () => {
      if (window.confirm('Are you ready to make an order?')) {
        setOrderSuccess(items, totalPrice, totalCount);
        clearCart();
        history.push('/');
      }
    };
    const addedOrderItems = Object.keys(items).map((item) => {
      return items[item].items[0];
    });
    return (
      <div className={cn(styles.order__section)}>
        <div className={cn(styles.order__section_title_wrapper)}>
          <NavLink to="/">
            <div className={cn(styles.order__section_title_arrow)}>
              <span>&#94;</span>
            </div>
          </NavLink>
          <h2 className={cn(styles.order__section_title)}>My Purchases</h2>
        </div>
        {totalCount && totalCount > 0 ? (
          <div className={cn(styles.order__section_items)}>
            {addedOrderItems.map((item, index) => (
              <OrderItem
                key={`${item}_${index}`}
                {...item}
                totalPrice={items[item.id].totalPrice}
                totalCount={items[item.id].items.length}
              />
            ))}
          </div>
        ) : null}
        {!totalCount ? (
          <div className={cn(styles.order__section_content_empty)}>
            <img src={emptyCartSmile} alt="empty cart icon" />
            <p>No orders</p>
            <p>Please add at least one pair of sneakers to make an order</p>
            <NavLink to="/">
              <div className={cn(styles.btn_add)}>Back to purchases</div>
            </NavLink>
          </div>
        ) : null}
        {totalCount && totalCount > 0 ? (
          <div
            className={cn(styles.order__section_submit_btn, styles.btn_add)}
            onClick={() => handleOrder()}>
            Purchase
          </div>
        ) : null}
      </div>
    );
  },
);

const mapStateToProps = (state) => ({
  items: getCartItems(state),
  totalCount: getCartItemsTotalCount(state),
  totalPrice: getCartItemsTotalPrice(state),
});

export default compose(
  connect(mapStateToProps, {
    setOrderSuccess,
    clearCart: cartActions.clearCart,
  }),
  withRouter,
)(Order);
