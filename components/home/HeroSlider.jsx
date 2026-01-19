'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { api } from '../../utils/api';

const HeroSlider = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const locale = useLocale();

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await api.getHeroSlides();
                setSlides(data);
            } catch (error) {
                console.error('Error fetching hero slides:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        cssEase: 'ease-in-out',
    };

    const getTitle = (slide) => locale === 'fr' ? slide.titleFr : slide.titleEn;
    const getSubtitle = (slide) => locale === 'fr' ? slide.subtitleFr : slide.subtitleEn;

    // Normaliser les liens pour qu'ils fonctionnent avec next-intl
    const normalizeLink = (link) => {
      if (!link) return '/';
      
      // Si le lien commence par /, c'est un lien interne
      if (link.startsWith('/')) {
        // Mapper les routes obsolètes ou invalides vers des routes valides
        const routeMap = {
          '/services': '/vehicles', // Rediriger vers les véhicules par défaut
        };
        
        // Si c'est une route à mapper, utiliser la route valide
        if (routeMap[link]) {
          return routeMap[link];
        }
        
        // Sinon, retourner le lien tel quel (next-intl gérera la traduction automatiquement)
        // Les routes définies dans routing.ts seront automatiquement traduites
        return link;
      }
      
      // Si c'est une URL externe (http/https), retourner tel quel
      return link;
    };

    if (loading) {
        return (
            <div
                className="hero-loading d-flex align-items-center justify-content-center"
                style={{
                    minHeight: '80vh',
                    background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)'
                }}
            >
                <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="hero-slider-wrapper">
            <style jsx global>{`
                .hero-slider-wrapper {
                    position: relative;
                }
                .hero-slider-wrapper .slick-slide {
                    height: auto;
                }
                .hero-slide {
                    position: relative;
                    min-height: 85vh;
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .hero-slide::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(185, 28, 28, 0.7) 0%,
                        rgba(0, 0, 0, 0.5) 50%,
                        rgba(212, 175, 55, 0.3) 100%
                    );
                    z-index: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    padding: 40px 20px 40px 20px;
                    max-width: 900px;
                }
                .hero-subtitle {
                    font-size: 1.3rem;
                    font-weight: 300;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #d4af37;
                    margin-bottom: 20px;
                    opacity: 0.95;
                }
                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 30px;
                    line-height: 1.2;
                    text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
                }
                .hero-btn {
                    display: inline-block;
                    padding: 16px 40px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    background: linear-gradient(135deg, #b91c1c 0%, #d4af37 100%);
                    color: #fff;
                    border: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(185, 28, 28, 0.4);
                    text-decoration: none;
                }
                .hero-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(185, 28, 28, 0.5);
                    color: #fff;
                }

                .hero-slider-wrapper .slick-dots {
                    bottom: 30px;
                    z-index: 3;
                }
                .hero-slider-wrapper .slick-dots li button:before {
                    font-size: 12px;
                    color: #fff;
                    opacity: 0.5;
                }
                .hero-slider-wrapper .slick-dots li.slick-active button:before {
                    color: #d4af37;
                    opacity: 1;
                }
                .hero-slider-wrapper .slick-prev,
                .hero-slider-wrapper .slick-next {
                    z-index: 3;
                    width: 50px;
                    height: 50px;
                }
                .hero-slider-wrapper .slick-prev {
                    left: 30px;
                }
                .hero-slider-wrapper .slick-next {
                    right: 30px;
                }
                .hero-slider-wrapper .slick-prev:before,
                .hero-slider-wrapper .slick-next:before {
                    font-size: 40px;
                    color: #fff;
                    opacity: 0.8;
                }

                @media (max-width: 768px) {
                    .hero-slide {
                        min-height: 70vh;
                    }
                    .hero-title {
                        font-size: 2rem;
                    }
                    .hero-subtitle {
                        font-size: 1rem;
                    }
                    .hero-content {
                        padding-bottom: 40px;
                    }
                    .hero-slider-wrapper .slick-prev,
                    .hero-slider-wrapper .slick-next {
                        display: none !important;
                    }
                }
            `}</style>

            <Slider {...settings}>
                {(slides.length > 0 ? slides : [{
                    id: 'fallback',
                    titleFr: "Bienvenue chez KADOOR SERVICE",
                    titleEn: "Welcome to KADOOR SERVICE",
                    subtitleFr: "Votre partenaire auto & immobilier",
                    subtitleEn: "Your auto & real estate partner",
                    imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1920",
                    buttonText: "Nos Services",
                    buttonLink: "/vehicles"
                }]).map((slide) => (
                    <div key={slide.id}>
                        <div
                            className="hero-slide"
                            style={{ backgroundImage: `url(${slide.imageUrl})` }}
                        >
                            <div className="hero-content">
                                <h4 className="hero-subtitle">{getSubtitle(slide)}</h4>
                                <h1 className="hero-title">{getTitle(slide)}</h1>
                                {slide.buttonText && (
                                    <Link href={normalizeLink(slide.buttonLink)} className="hero-btn">
                                        {slide.buttonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;
