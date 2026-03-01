'use client'

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";

const ListingGallery = ({ item }) => {
  const { formatPrice } = useCurrency();
  
  if (!item) {
    return null;
  }

  const images = item.images || [];
  const mainImage = images[0] || '/assets/images/placeholder.jpg';

  return (
    <Gallery>
      <div className="container-kadoor py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{item.title}</h2>
            <p className="text-gray-500">{item.location || item.city}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(item.pricePerDay || item.pricePerNight || item.price)}
              <span className="text-base font-normal text-gray-500"> /{item.pricePerDay ? 'jour' : 'nuit'}</span>
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Item original={mainImage} thumbnail={mainImage} width={752} height={450}>
              {({ ref, open }) => (
                <div ref={ref} onClick={open} className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group">
                  <Image
                    src={mainImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.slice(1, 5).map((img, i) => (
              <Item key={i} original={img} thumbnail={img} width={752} height={450}>
                {({ ref, open }) => (
                  <div ref={ref} onClick={open} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
                    <Image src={img} alt={`${item.title} ${i + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
              </Item>
            ))}
          </div>
        </div>
      </div>
    </Gallery>
  );
};

export default ListingGallery;
