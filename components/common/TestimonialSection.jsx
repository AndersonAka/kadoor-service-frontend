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

  if (loading || !hasTestimonials) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container-kadoor">
        <div className="text-center mb-12">
          <h2 className="section-title">{t('testimonials_title')}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">{t('testimonials_subtitle')}</p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Testimonial />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
