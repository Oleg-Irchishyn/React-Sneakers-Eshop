import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Main.module.scss';
import favouriteIcon from '../../../assets/images/item-icons/favourite.png';
import favouriteIconActive from '../../../assets/images/item-icons/favourite-pink.png';

export const SneakersItem = (props) => {
  const { id, imageUrl, title, price, favourite, selected } = props;
  return (
    <div className={cn(styles.item)}>
      <div
        className={cn(styles.item__favourite_icon, {
          [styles.active]: favourite,
        })}>
        {<img src={!favourite ? favouriteIcon : favouriteIconActive} alt="add to favourites" />}
      </div>
      <div className={cn(styles.item__img)}>
        <img src={imageUrl} alt={title} />
      </div>
      <h2 className={cn(styles.item__title)}>{title}</h2>
      <div className={cn(styles.item__price_section)}>
        <div className={cn(styles.section__left_side)}>
          <span className={cn(styles.section__title)}>Price:</span>
          <span className={cn(styles.section__cost)}>{`${price} USD`}</span>
        </div>
        <div className={cn(styles.section__right_side)}>
          <a
            title="add to cart"
            rel="nofollow"
            target="_self"
            className={cn(styles.section__add_to_cart_btn, {
              [styles.active]: selected,
            })}>
            {selected ? <span className={cn(styles.checkmarked)}>&#10003;</span> : ''}
          </a>
        </div>
      </div>
      {selected ? (
        <div className={cn(styles.item__add_amount_section)}>
          <p className={cn(styles.plus)}></p>
          <span className={cn(styles.amount)}>0</span>
          <p className={cn(styles.minus)}></p>
        </div>
      ) : null}
    </div>
  );
};

export default SneakersItem;
