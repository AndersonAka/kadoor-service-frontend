'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const CommentsSection = ({ itemId, itemType, itemTitle }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [averageRating, setAverageRating] = useState({ average: 0, count: 0 });
  const { user } = useAuth();
  const t = useTranslations('Comments');

  useEffect(() => {
    fetchComments();
    fetchRating();
  }, [itemId, itemType]);

  const fetchComments = async () => {
    try {
      const endpoint = itemType === 'vehicle' 
        ? `${API_URL}/reviews/vehicle/${itemId}`
        : `${API_URL}/reviews/apartment/${itemId}`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRating = async () => {
    try {
      const endpoint = itemType === 'vehicle'
        ? `${API_URL}/reviews/rating/vehicle/${itemId}`
        : `${API_URL}/reviews/rating/apartment/${itemId}`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setAverageRating(data);
      }
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert(t('login_required') || 'Vous devez être connecté pour commenter');
      return;
    }

    if (!comment.trim()) {
      alert(t('comment_required') || 'Veuillez saisir un commentaire');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment: comment.trim(),
          userId: user.id,
          [itemType === 'vehicle' ? 'vehicleId' : 'apartmentId']: itemId,
        }),
      });

      if (response.ok) {
        setComment('');
        setRating(5);
        await fetchComments();
        await fetchRating();
      } else {
        const error = await response.json();
        alert(error.message || t('error_submitting') || 'Erreur lors de l\'envoi du commentaire');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert(t('error_submitting') || 'Erreur lors de l\'envoi du commentaire');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (value, interactive = false, onChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => interactive && onChange && onChange(star)}
            className={`text-xl ${interactive ? 'cursor-pointer' : ''} ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {t('title') || 'Commentaires et Témoignages'}
          </h3>
          <p className="text-gray-500 mt-1">
            {t('subtitle') || `Partagez votre expérience avec ${itemTitle}`}
          </p>
        </div>
        {averageRating.count > 0 && (
          <div className="text-center">
            <div className="text-5xl font-bold text-primary leading-none">{averageRating.average.toFixed(1)}</div>
            {renderStars(Math.round(averageRating.average))}
            <div className="text-sm text-gray-500 mt-1">
              {averageRating.count} {averageRating.count === 1 ? t('review') || 'avis' : t('reviews') || 'avis'}
            </div>
          </div>
        )}
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('your_rating') || 'Votre note'}
            </label>
            {renderStars(rating, true, setRating)}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('your_comment') || 'Votre commentaire'}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('comment_placeholder') || 'Partagez votre expérience...'}
              required
              className="w-full min-h-[120px] p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-700 placeholder-gray-400 resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (t('submitting') || 'Envoi...') : (t('submit') || 'Publier le commentaire')}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center text-gray-500">
          {t('login_to_comment') || 'Connectez-vous pour laisser un commentaire'}
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl">
          {t('no_comments') || 'Aucun commentaire pour le moment. Soyez le premier !'}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {c.user?.firstName?.[0]?.toUpperCase() || c.user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">
                    {c.user?.firstName && c.user?.lastName
                      ? `${c.user.firstName} ${c.user.lastName}`
                      : c.user?.email || 'Utilisateur'}
                  </div>
                  <div className="text-xs text-gray-400">{formatDate(c.createdAt)}</div>
                </div>
                <div>{renderStars(c.rating)}</div>
              </div>
              <p className="text-gray-600 leading-relaxed">{c.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
