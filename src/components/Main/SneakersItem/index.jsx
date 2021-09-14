import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Main.module.scss';
import favouriteIcon from '../../../assets/images/item-icons/favourite.png';
import favouriteIconActive from '../../../assets/images/item-icons/favourite-pink.png';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setNewSneakersItemSelectedStatus } from '../../../redux/reducers/appReducer';

export const SneakersItem = ({ setNewSneakersItemSelectedStatus, ...restProps }) => {
  const { id, imageUrl, title, price, favourite, selected } = restProps;

  const changeSelectedStatus = (id, newVal) => {
    setNewSneakersItemSelectedStatus(id, newVal);
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
              className={cn(styles.section__add_to_cart_btn)}
              onClick={() => changeSelectedStatus(id, true)}></a>
          )}
          {selected && (
            <a
              title="item added to cart"
              rel="nofollow"
              target="_self"
              className={cn(styles.section__selected_btn)}
              onClick={() => changeSelectedStatus(id, false)}>
              <span className={cn(styles.checkmarked)}>&#10003;</span>
            </a>
          )}
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

export default compose(connect(null, { setNewSneakersItemSelectedStatus }))(SneakersItem);
