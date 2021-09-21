import React from 'react';
import styles from '../../styles/components/Order.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { getCartItems } from '../../redux/selectors/cartSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { OrderItem } from '..';

const Order = React.memo(({ items }) => {
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
    </div>
  );
});

const mapStateToProps = (state) => ({
  items: getCartItems(state),
});

export default compose(connect(mapStateToProps, {}))(Order);
