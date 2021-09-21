import React from 'react';
import styles from '../../../styles/components/OrderItem.module.scss';
import cn from 'classnames';

const OrderItem = React.memo(({ title, imageUrl, totalPrice, totalCount }) => {
  return (
    <div className={cn(styles.item)}>
      <span className={cn(styles.item__count)}>{totalCount}</span>
      <div className={cn(styles.item__top_section)}>
        <div className={cn(styles.item__img)}>
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <div className={cn(styles.item__bottom_section)}>
        <p className={cn(styles.item__title)}>{title}</p>
        <div className={cn(styles.item__price_section)}>
          <p className={cn(styles.section__price_title)}> Price: </p>
          <p className={cn(styles.item__price)}>{`${Number(totalPrice).toFixed(2)} USD`}</p>
        </div>
      </div>
    </div>
  );
});

export default OrderItem;
