import React from 'react';
import styles from '../../styles/components/Favourites.module.scss';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FavouritesItem } from '..';
import emptyFAvouritesSmile from '../../assets/images/favourites-empty-icon.svg';
import { getFavouritesItemList } from '../../redux/selectors/appSelectors';
import { getFavouritesList } from '../../redux/reducers/appReducer';

const Favourites = React.memo(({ items, getFavouritesList }) => {
  React.useEffect(() => {
    getFavouritesList();
  }, []);

  return (
    <div className={cn(styles.favourites__section)}>
      <div className={cn(styles.favourites__section_title_wrapper)}>
        <NavLink to="/">
          <div className={cn(styles.favourites__section_title_arrow)}>
            <span>&#94;</span>
          </div>
        </NavLink>
        <h2 className={cn(styles.favourites__section_title)}>My Favourites</h2>
      </div>
      {items && items.length > 0 ? (
        <div className={cn(styles.favourites__section_items)}>
          {items.map((item, index) => (
            <FavouritesItem key={`${item}_${index}`} {...item} />
          ))}
        </div>
      ) : null}
      {items && items.length > 0 ? (
        <div className={cn(styles.favourites__section_content_empty)}>
          <img src={emptyFAvouritesSmile} alt="empty facourites icon" />
          <p>No favourites</p>
          <p>You have not added any sneakers to favourites</p>
          <NavLink to="/">
            <div className={cn(styles.btn_add)}>Back to main page</div>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
});

const mapStateToProps = (state) => ({
  items: getFavouritesItemList(state),
});

export default compose(connect(mapStateToProps, { getFavouritesList }))(Favourites);
