import React from 'react';
import styles from './styles/components/App.module.scss';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getInitialization } from './redux/selectors/appSelectors';
import { Preloader } from './components/common';
import { Header, Main } from './components';
import { initializeApp } from './redux/reducers/appReducer';
import cn from 'classnames';
import { withSuspense } from './hoc/WithSuspense';

const Order = React.lazy(() => import('./components/Order/'));
const Favourites = React.lazy(() => import('./components/Favourites'));
const SuspendedOrder = withSuspense(Order);
const SuspendedFavourites = withSuspense(Favourites);

const App = React.memo(({ initializeApp, initialized }) => {
  React.useEffect(() => {
    initializeApp();
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  return (
    <div className={styles.App}>
      <div className={cn(styles.app_container)}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route path="/order" render={() => <SuspendedOrder />} />
          <Route path="/favourites" render={() => <SuspendedFavourites />} />
          <Route path="*" render={() => <div>404 NOT FOUND</div>} />
        </Switch>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  initialized: getInitialization(state),
});

export default compose(connect(mapStateToProps, { initializeApp }), withRouter)(App);
