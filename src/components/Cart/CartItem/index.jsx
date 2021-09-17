import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/CartItem.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as cartActions } from '../../../redux/reducers/cartReducer';

const CartItem = React.memo(
  ({
    id,
    title,
    imageUrl,
    totalPrice,
    totalCount,
    removeCartItem,
    plusCartItem,
    minusCartItem,
  }) => {
    const handleRemoveCartItem = (id) => {
      if (window.confirm('Do yo want to remove this sneaker?')) {
        removeCartItem(id);
      }
    };

    const onPlusCartItem = (id) => {
      plusCartItem(id);
    };

    const onMinusCartItem = (id) => {
      minusCartItem(id);
    };

    return (
      <div className={cn(styles.cart__item)}>
        <div className={cn(styles.item__left_side)}>
          <div className={cn(styles.item__img)}>
            <img src={imageUrl} alt={title} />
          </div>
        </div>
        <div className={cn(styles.item__right_side)}>
          <p className={cn(styles.item__title)}>{title}</p>
          <p className={cn(styles.item__price)}>{`${totalPrice} USD`}</p>
          <div className={cn(styles.item__delete)} onClick={() => handleRemoveCartItem(id)}></div>
        </div>
        <div className={cn(styles.item__add_section)}>
          <p className={cn(styles.plus)} onClick={() => onPlusCartItem(id)}></p>
          <span className={cn(styles.amount)}>{totalCount}</span>
          <p className={cn(styles.minus)} onClick={() => onMinusCartItem(id)}></p>
        </div>
      </div>
    );
  },
);

export default compose(
  connect(null, {
    removeCartItem: cartActions.removeCartItem,
    plusCartItem: cartActions.plusCartItem,
    minusCartItem: cartActions.minusCartItem,
  }),
)(CartItem);
