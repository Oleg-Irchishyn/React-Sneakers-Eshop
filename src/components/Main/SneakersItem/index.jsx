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
    const [selected, setSelected] = React.useState(false);
    const { id, imageUrl, title, price, favourite } = restProps;

    const handleAddItemToCart = () => {
      const object = {
        id,
        imageUrl,
        title,
        price,
      };
      addSneakersToCart(object);
      setSelected(true);
    };

    const handleRemoveCartItem = (id) => {
      if (window.confirm('Do yo want to remove this sneaker?')) {
        removeCartItem(id);
        setSelected(false);
      }
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
            {!selected && (
              <a
                title="add to cart"
                rel="nofollow"
                target="_self"
                className={cn(styles.section__btn_select)}
                onClick={() => handleAddItemToCart()}></a>
            )}
            {selected && (
              <a
                title="item added to cart"
                rel="nofollow"
                target="_self"
                className={cn(styles.section__btn_unselect)}
                onClick={() => handleRemoveCartItem(id)}>
                <span className={cn(styles.checkmarked)}>&#10003;</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default compose(
  connect(null, {
    addSneakersToCart: cartActions.addSneakersToCart,
    removeCartItem: cartActions.removeCartItem,
  }),
)(SneakersItem);
