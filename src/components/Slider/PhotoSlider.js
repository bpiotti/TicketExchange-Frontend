import React from 'react'

import './PhotoSlider.css'
import mackeyLights from '../../Assets/Images/mackeylights.jpg'
import elliot from '../../Assets/Images/elliot.jpg'
import football from '../../Assets/Images/football.jpg'
import Slider from 'react-slick'
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import '../../../node_modules/slick-carousel/slick/slick.css';


class PhotoSlider extends React.Component {
    render() {
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
        };
        const images = [
            mackeyLights,
            elliot,
            football
        ];
        return (
            <div className="Slider">
                <Slider {...sliderSettings}>
                    {images.map((image, key) =>
                        <div className="l" style={{
                            backgroundImage: `url(${image})`,
                        }}
                            key={key}>
                            <img src={image} alt={key} style={{
                                height: '400px',
                                width: '800px',
                                overflow: 'hidden',
                                margin: 'auto'
                            }} />
                        </div>
                    )}

                </Slider>
            </div >
        );
    }
}

export default PhotoSlider;