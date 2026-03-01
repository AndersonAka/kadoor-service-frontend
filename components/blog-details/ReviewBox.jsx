'use client';

import { useState } from 'react';

const ReviewBox = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log({ rating, review });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Laisser un avis</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <svg
                  className={`w-6 h-6 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Votre avis</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Partagez votre expérience..."
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ReviewBox;
