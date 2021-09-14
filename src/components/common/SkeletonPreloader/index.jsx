import React from 'react';
import ContentLoader from 'react-content-loader';
import cn from 'classnames';
import styles from './../../../styles/components/SkeletonPreloader.module.scss';

const SekeletonPrelaoder = () => (
  <ContentLoader
    speed={2}
    width={`100%`}
    height={268}
    viewBox="0 0 21% 268"
    backgroundColor="#f3f3f3"
    foregroundColor="#eaeaeb"
    className={cn(styles.skeleton_loader)}>
    <rect x="0" y="0" rx="40" ry="40" width={`100%`} height="268" />
  </ContentLoader>
);

export default SekeletonPrelaoder;
