'use client'
import Image from "next/image";
import testimonials from "../../data/testimonial";
import Slider from "react-slick";
import { useTranslations } from 'next-intl';

const Testimonial = () => {
  const t = useTranslations('HomePage');

  const settings = {
    dots: true,
    arrow: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonials.slice(0, 5).map((item, index) => (
          <div className="item" key={item.id}>
            <div className="testimonial_grid">
              <div className="thumb">
                <Image width={95} height={95} src={item.img} alt="1.jpg" />
              </div>
              <div className="details">
                <h4>{item.name}</h4>
                <p>{t(`testimonial_${index + 1}_designation`)}</p>
                <p className="mt25">{t(`testimonial_${index + 1}`)}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
