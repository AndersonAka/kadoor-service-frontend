'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
      <div className="star-rating" style={{ display: 'flex', gap: '5px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => interactive && onChange && onChange(star)}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              fontSize: '20px',
              color: star <= value ? '#ffc107' : '#ddd',
            }}
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
    <div className="comments-section">
      <style jsx>{`
        .comments-section {
          margin-top: 40px;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        .comments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
        }
        .rating-summary {
          text-align: center;
        }
        .rating-summary .average {
          font-size: 48px;
          font-weight: bold;
          color: #b91c1c;
          line-height: 1;
        }
        .rating-summary .count {
          color: #666;
          margin-top: 5px;
        }
        .comment-form {
          background: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .comment-form textarea {
          width: 100%;
          min-height: 120px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-family: inherit;
          resize: vertical;
        }
        .comment-form button {
          background: linear-gradient(135deg, #b91c1c 0%, #d4af37 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          margin-top: 15px;
        }
        .comment-form button:hover {
          opacity: 0.9;
        }
        .comment-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .comment-item {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .comment-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .comment-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #b91c1c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 15px;
        }
        .comment-author {
          flex: 1;
        }
        .comment-author-name {
          font-weight: 600;
          color: #333;
        }
        .comment-date {
          font-size: 12px;
          color: #999;
        }
        .comment-text {
          color: #555;
          line-height: 1.6;
          margin-top: 10px;
        }
      `}</style>

      <div className="comments-header">
        <div>
          <h3 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
            {t('title') || 'Commentaires et Témoignages'}
          </h3>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            {t('subtitle') || `Partagez votre expérience avec ${itemTitle}`}
          </p>
        </div>
        {averageRating.count > 0 && (
          <div className="rating-summary">
            <div className="average">{averageRating.average.toFixed(1)}</div>
            {renderStars(Math.round(averageRating.average))}
            <div className="count">
              {averageRating.count} {averageRating.count === 1 ? t('review') || 'avis' : t('reviews') || 'avis'}
            </div>
          </div>
        )}
      </div>

      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              {t('your_rating') || 'Votre note'}:
            </label>
            {renderStars(rating, true, setRating)}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              {t('your_comment') || 'Votre commentaire'}:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t('comment_placeholder') || 'Partagez votre expérience...'}
              required
            />
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? (t('submitting') || 'Envoi...') : (t('submit') || 'Publier le commentaire')}
          </button>
        </form>
      ) : (
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '30px',
          textAlign: 'center',
          color: '#666'
        }}>
          {t('login_to_comment') || 'Connectez-vous pour laisser un commentaire'}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          {t('loading') || 'Chargement des commentaires...'}
        </div>
      ) : comments.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#999',
          background: 'white',
          borderRadius: '8px'
        }}>
          {t('no_comments') || 'Aucun commentaire pour le moment. Soyez le premier à commenter !'}
        </div>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-avatar">
                  {comment.user?.firstName?.[0]?.toUpperCase() || comment.user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="comment-author">
                  <div className="comment-author-name">
                    {comment.user?.firstName && comment.user?.lastName
                      ? `${comment.user.firstName} ${comment.user.lastName}`
                      : comment.user?.email || 'Utilisateur'}
                  </div>
                  <div className="comment-date">{formatDate(comment.createdAt)}</div>
                </div>
                <div>{renderStars(comment.rating)}</div>
              </div>
              <div className="comment-text">{comment.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
