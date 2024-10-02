import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Carousel = ({ photos, isAdmin, onPhotoDelete }) => {
  return (
    <div className="max-w-6xl mx-auto mb-8 p-6 bg-f2e9e4 rounded-xl shadow-xl border border-9a8c98 overflow-hidden">
      {photos.length > 0 ? (
        <ResponsiveCarousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          interval={2000}
          className="rounded-lg overflow-hidden"
        >
          {photos.map((photo, index) => (
            <div
              key={photo._id || `${photo.url}-${index}`}
              className="relative group"
            >
              <img
                src={photo}
                alt={`Slide ${photo._id || index}`}
                className="w-full h-96 object-contain transition-transform duration-500 group-hover:scale-105"
              />
              {isAdmin && (
                <button
                  onClick={() => onPhotoDelete(photo)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </ResponsiveCarousel>
      ) : (
        <p className="text-center text-4a4e69 font-medium">
          No photos available
        </p>
      )}
    </div>
  );
};

export default Carousel;
