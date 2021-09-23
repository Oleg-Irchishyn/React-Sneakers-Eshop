import React from 'react';
import Slider from 'react-slick';
import cn from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getSilersList } from '../../../redux/selectors/appSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './index.scss';

const SliderContainer = React.memo(({ sliders }) => {
  const settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider className={cn('main__slider')} {...settings} {...sliders}>
      {sliders.map((slider) => {
        return (
          <div key={slider.id} className={cn('slider_item')}>
            <img src={slider.logo} />
            <p>{slider.title}</p>
            <img src={slider.imageUrl} />
          </div>
        );
      })}
    </Slider>
  );
});

const mapStateToProps = (state) => ({
  sliders: getSilersList(state),
});

export default compose(connect(mapStateToProps, {}))(SliderContainer);
