import React from 'react';
import styles from '../../styles/components/Order.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { getCartItems, getCartItemsTotalCount } from '../../redux/selectors/cartSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { OrderItem } from '..';
import emptyCartSmile from '../../assets/images/cart-empty-smile.svg';

const Order = React.memo(({ items, totalCount }) => {
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
    </div>
  );
});

const mapStateToProps = (state) => ({
  items: getCartItems(state),
  totalCount: getCartItemsTotalCount(state),
});

export default compose(connect(mapStateToProps, {}))(Order);
