import React from 'react';
import styles from '../../styles/components/Main.module.scss';
import cn from 'classnames';

const Main = () => {
  return (
    <div className={cn(styles.main)}>
      <div className={cn(styles.main__slider_section)}></div>
      <div className={cn(styles.main__top_section)}>
        <h1>All Sneakers</h1>
        <div className={cn(styles.search_section)}>
          <input type="text" autoComplete="off" placeholder="Search By Name..." />
        </div>
      </div>
    </div>
  );
};

export default Main;
