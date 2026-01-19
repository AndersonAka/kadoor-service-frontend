'use client';

import { useState, useEffect } from "react";
import { testimonialService } from "../../services/testimonialService";
import Testimonial from "./Testimonial";
import { useTranslations } from 'next-intl';

const TestimonialSection = () => {
  const [hasTestimonials, setHasTestimonials] = useState(false);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('HomePage');

  useEffect(() => {
    const checkTestimonials = async () => {
      try {
        setLoading(true);
        const testimonials = await testimonialService.getActiveTestimonials();
        setHasTestimonials(testimonials && testimonials.length > 0);
      } catch (error) {
        console.error('Error checking testimonials:', error);
        setHasTestimonials(false);
      } finally {
        setLoading(false);
      }
    };

    checkTestimonials();
  }, []);

  // Ne rien afficher pendant le chargement ou s'il n'y a pas de témoignages
  if (loading || !hasTestimonials) {
    return null;
  }

  return (
    <section id="our-testimonials" className="our-testimonial">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center">
              <h2>{t('testimonials_title')}</h2>
              <p>{t('testimonials_subtitle')}</p>
            </div>
          </div>
        </div>
        {/* End .row */}
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="testimonial_grid_slider">
              <Testimonial />
            </div>
          </div>
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default TestimonialSection;
