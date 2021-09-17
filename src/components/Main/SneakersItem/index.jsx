import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Main.module.scss';
import favouriteIcon from '../../../assets/images/item-icons/favourite.png';
import favouriteIconActive from '../../../assets/images/item-icons/favourite-pink.png';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { actions as cartActions } from '../../../redux/reducers/cartReducer';

const SneakersItem = React.memo(
  ({ setNewSneakersItemSelectedStatus, addSneakersToCart, removeCartItem, ...restProps }) => {
    const { id, imageUrl, title, price, favourite } = restProps;

    const handleAddItemToCart = () => {
      const object = {
        id,
        imageUrl,
        title,
        price,
      };
      addSneakersToCart(object);
    };
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
  }),
)(SneakersItem);
