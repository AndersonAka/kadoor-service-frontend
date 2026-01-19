'use client'
import Image from "next/image";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { testimonialService } from "../../services/testimonialService";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialService.getActiveTestimonials();
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    arrow: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonials.map((item) => (
          <div className="item" key={item.id}>
            <div className="testimonial_grid">
              <div className="thumb">
                <Image 
                  width={95} 
                  height={95} 
                  src={item.imageUrl || "/assets/images/testimonial/1.png"} 
                  alt={item.name} 
                />
              </div>
              <div className="details">
                <h4>{item.name}</h4>
                <p>{item.designation}</p>
                <p className="mt25">{item.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
