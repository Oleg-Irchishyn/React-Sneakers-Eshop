import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Main.module.scss';
import favouriteIcon from '../../../assets/images/item-icons/favourite.png';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as cartActions } from '../../../redux/reducers/cartReducer';
import { setFavouritesList } from '../../../redux/reducers/appReducer';
import { Preloader } from '../../common';

const SneakersItem = React.memo(
  ({
    setNewSneakersItemSelectedStatus,
    addSneakersToCart,
    removeCartItem,
    setFavouritesList,
    isLoading,
    ...restProps
  }) => {
    const { id, imageUrl, title, price } = restProps;

    const addItemToFavourites = () => {
      const object = {
        id,
        imageUrl,
        title,
        price,
      };
      setFavouritesList(object);
    };

    const handleAddItemToCart = () => {
      const object = {
        id,
        imageUrl,
        title,
        price,
      };
      addSneakersToCart(object);
    };

    if (isLoading) {
      return <Preloader />;
    }
    return (
      <div
        className={cn(styles.item, {
          [styles.loading]: isLoading === true,
        })}>
        <div className={cn(styles.item__favourite_icon)} onClick={() => addItemToFavourites()}>
          {<img src={favouriteIcon} alt="add to favourites" />}
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
              className={cn(styles.section__btn_add)}
              onClick={() => handleAddItemToCart()}></a>
          </div>
        </div>
      </div>
    );
  },
);

export default compose(
  connect(null, {
    addSneakersToCart: cartActions.addSneakersToCart,
    setFavouritesList,
  }),
)(SneakersItem);
