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
    arrows: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: "slick-dots !-bottom-12",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="pb-12">
      <Slider {...settings}>
        {testimonials.map((item) => (
          <div key={item.id} className="px-4">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              {/* Quote Icon */}
              <div className="text-primary/20 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              {/* Comment */}
              <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "{item.comment}"
              </p>
              
              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image 
                    width={64} 
                    height={64} 
                    src={item.imageUrl || "/assets/images/testimonial/1.png"} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.designation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
