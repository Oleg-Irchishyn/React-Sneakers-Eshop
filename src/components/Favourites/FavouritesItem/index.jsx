import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/FavouritesItem.module.scss';
import favouriteIcon from '../../../assets/images/item-icons/favourite-pink.png';
import { Preloader } from '../../common';

const FavouritesItem = React.memo(
  ({ id, imageUrl, title, price, removeFavouriteItemSuccess, isLoading }) => {
    const handleDeleteItem = (id) => {
      removeFavouriteItemSuccess(id);
    };

    if (isLoading) {
      return <Preloader />;
    }
    return (
      <div className={cn(styles.item)}>
        <a
          title="add to cart"
          rel="nofollow"
          target="_self"
          className={cn(styles.section__btn_remove)}
          onClick={() => handleDeleteItem(id)}></a>
        <div className={cn(styles.item__favourite_icon)}>
          {<img src={favouriteIcon} alt="favourites icon" />}
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
        </div>
      </div>
    );
  },
);

export default FavouritesItem;
