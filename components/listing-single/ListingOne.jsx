'use client';

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";
import FavoriteButton from "@/components/common/FavoriteButton";
import ShareButton from "@/components/common/ShareButton";

const ListingOne = ({ property }) => {
  const { formatPrice } = useCurrency();
  
  if (!property) return null;

  const rawImages = property.images || property.imgList || [];
  const mainImage = rawImages[0] || property.img || '/assets/images/placeholder.jpg';
  const hasMultipleImages = rawImages.length > 1;
  const galleryImages = hasMultipleImages ? rawImages.slice(1, 5) : [];

  return (
    <div className="container-kadoor py-6">
      <Gallery>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location || property.city || 'Abidjan'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl md:text-3xl font-bold" style={{ color: '#ff5a5f' }}>
              {formatPrice(property.pricePerDay || property.pricePerNight || property.price)}
              <span className="text-base font-normal text-gray-500">
                {property.pricePerDay ? ' /jour' : property.pricePerNight ? ' /nuit' : ''}
              </span>
            </span>
            <div className="flex gap-2">
              <FavoriteButton 
                itemId={property.id} 
                itemType={property.pricePerDay ? 'vehicle' : 'apartment'}
                size="md"
              />
              <ShareButton 
                title={property.title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
                description={property.description || `${property.title} - ${property.location}`}
              />
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {hasMultipleImages ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <Item original={mainImage} thumbnail={mainImage} width={800} height={500}>
                {({ ref, open }) => (
                  <div ref={ref} onClick={open} className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group">
                    <Image src={mainImage} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                )}
              </Item>
            </div>
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img, i) => (
                <Item key={i} original={img} thumbnail={img} width={800} height={500}>
                  {({ ref, open }) => (
                    <div ref={ref} onClick={open} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
                      <Image src={img} alt={`${property.title} - ${i + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      {i === 3 && rawImages.length > 5 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">+{rawImages.length - 5}</span>
                        </div>
                      )}
                    </div>
                  )}
                </Item>
              ))}
              {galleryImages.length < 4 && Array.from({ length: 4 - galleryImages.length }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Single image: full width */
          <Item original={mainImage} thumbnail={mainImage} width={1200} height={600}>
            {({ ref, open }) => (
              <div ref={ref} onClick={open} className="relative aspect-[21/9] rounded-xl overflow-hidden cursor-pointer group">
                <Image src={mainImage} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            )}
          </Item>
        )}
      </Gallery>
    </div>
  );
};

export default ListingOne;
