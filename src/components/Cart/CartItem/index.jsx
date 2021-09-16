import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/CartItem.module.scss';

const CartItem = React.memo(({ id, title, imageUrl, price, totalPrice }) => {
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
        <div className={cn(styles.item__delete)}></div>
      </div>
      <div className={cn(styles.item__add_section)}>
        <p className={cn(styles.plus)}></p>
        <span className={cn(styles.amount)}>0</span>
        <p className={cn(styles.minus)}></p>
      </div>
    </div>
  );
});

export default CartItem;
