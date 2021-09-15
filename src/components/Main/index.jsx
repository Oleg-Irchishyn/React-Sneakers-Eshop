import React from 'react';
import styles from '../../styles/components/Main.module.scss';
import { SneakersItem } from '../';
import cn from 'classnames';
import {
  getIsLoading,
  getSneakersItemsList,
  getTotalSneakersCount,
} from '../../redux/selectors/appSelectors';
import { loadMoreSneakers } from '../../redux/reducers/appReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Preloader, SekeletonPrelaoder } from '../common/';

const Main = React.memo(({ sneakers, loadMoreSneakers, totalSneakersCount, isLoading }) => {
  let [startPortion, setStartPortion] = React.useState(null);
  let [endPortion, setEndPortion] = React.useState(4);
  const loadMoreItems = (e) => {
    setEndPortion((endPortion = endPortion + 4));
    setStartPortion(0);
    loadMoreSneakers(startPortion, endPortion);
  };

  React.useEffect(() => {
    localStorage.setItem('sneakersListItems', JSON.stringify(sneakers));
  }, [loadMoreItems]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.main__slider_section)}></div>
      <div className={cn(styles.main__top_section)}>
        <h1>All Sneakers</h1>
        <div className={cn(styles.search_section)}>
          <input type="text" autoComplete="off" placeholder="Search By Name..." />
        </div>
      </div>
      <div className={cn(styles.main__content_section)}>
        <div className={cn(styles.section_items)}>
          {sneakers &&
            sneakers.map((elem, index) => {
              {
                return isLoading ? (
                  <SekeletonPrelaoder key={`${index}_yo`} />
                ) : (
                  <SneakersItem key={elem.id} {...elem} />
                );
              }
            })}
        </div>
        <button
          className={cn(styles.section__add_btn, styles.btn_add, {
            [styles.disabled]: sneakers && sneakers.length === totalSneakersCount,
          })}
          onClick={(e) => loadMoreItems(e)}>
          Load More
        </button>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  sneakers: getSneakersItemsList(state),
  totalSneakersCount: getTotalSneakersCount(state),
  isLoading: getIsLoading(state),
});

export default compose(connect(mapStateToProps, { loadMoreSneakers }))(Main);
