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
  const stanSmithSLider = React.useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={cn('main_slider__wrapper')}>
      <div
        className={cn('slider_prev_arrow')}
        onClick={() => stanSmithSLider?.current?.slickPrev()}>
        <span>&#94;</span>
      </div>
      <div
        className={cn('slider_next_arrow')}
        onClick={() => stanSmithSLider?.current?.slickNext()}>
        <span>&#94;</span>
      </div>

      <Slider className={cn('main__slider')} {...settings} {...sliders} ref={stanSmithSLider}>
        {sliders.map((slider) => {
          return (
            <div key={slider.id} className={cn('slider_item')}>
              <img src={slider.logo} className={cn('slider_item__logo')} alt={slider.title} />
              <div className={cn('slider_item__content')}>
                <p className={cn('content_title')}>
                  <span className={cn('title_first_part')}>
                    {slider.title.split('').slice(0, 11).join('')}
                  </span>
                  <span className={cn('title_second_part')}>
                    {slider.title.split('').slice(-9).join('')}
                  </span>
                </p>
                <button className={cn('content_btn')}>Purchase</button>
              </div>
              <div className={cn('slider_item__img')}>
                <img src={slider.imageUrl} alt={slider.title} />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
});

const mapStateToProps = (state) => ({
  sliders: getSilersList(state),
});

export default compose(connect(mapStateToProps, {}))(SliderContainer);
