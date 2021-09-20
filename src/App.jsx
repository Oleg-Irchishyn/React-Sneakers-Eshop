import React from 'react';
import styles from './styles/components/App.module.scss';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getInitialization } from './redux/selectors/appSelectors';
import { Preloader, SliderExample } from './components/common';
import { Header, Main } from './components';
import { initializeApp } from './redux/reducers/appReducer';
import { Container } from 'semantic-ui-react';
import cn from 'classnames';

/* React Lazy example
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedProfile = withSuspense(ProfileContainer);
*/

const App = React.memo(({ initializeApp, initialized }) => {
  React.useEffect(() => {
    initializeApp();
  }, []);

  if (!initialized) {
    return <Preloader />;
  }

  let sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.App}>
      <Container className={cn(styles.app_container)}>
        {/* <SliderExample /> */}
        <Switch>
          <Route path="/" render={() => <Main />} />
          <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          {/*<Route path="/profile/:userId?" render={() => <SuspendedProfile />} />*/}
        </Switch>
      </Container>
      <Header />
    </div>
  );
});

const mapStateToProps = (state) => ({
  initialized: getInitialization(state),
});

export default compose(connect(mapStateToProps, { initializeApp }), withRouter)(App);
