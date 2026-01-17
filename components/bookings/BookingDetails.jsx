'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import Header from "../home-10/Header";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumb from "../common/BreadCrumb";
import Footer from "../common/footer/Footer";
import CopyrightFooter from "../common/footer/CopyrightFooter";

const BookingDetails = () => {
  const { user } = useAuth();
  const params = useParams();
  const t = useTranslations('Bookings');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && params.id) {
      fetchBookingDetails();
    }
  }, [user, params.id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError(t('login_required') || 'Vous devez être connecté pour voir les détails de la réservation');
        setLoading(false);
        return;
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
      const url = `${API_BASE}/reservations/${params.id}`;
      console.log('[BookingDetails] Fetching booking from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('[BookingDetails] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[BookingDetails] Error response:', errorText);
        throw new Error(`Erreur ${response.status}: ${errorText || response.statusText || 'Erreur lors de la récupération de la réservation'}`);
      }

      const data = await response.json();
      console.log('[BookingDetails] Booking data received:', data);
      
      // Vérifier que la réservation appartient à l'utilisateur
      const userId = user.id || user.userId;
      if (data.userId !== userId && data.user?.id !== userId) {
        throw new Error('Vous n\'avez pas accès à cette réservation');
      }
      
      setBooking(data);
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError(err.message || t('error_loading_booking') || 'Erreur lors du chargement de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'PENDING': { class: 'warning', text: t('status_pending') || 'En attente' },
      'CONFIRMED': { class: 'success', text: t('status_confirmed') || 'Confirmée' },
      'CANCELLED': { class: 'danger', text: t('status_cancelled') || 'Annulée' },
      'COMPLETED': { class: 'info', text: t('status_completed') || 'Terminée' },
    };

    const config = statusConfig[status] || { class: 'secondary', text: status };
    return (
      <span className={`badge bg-${config.class}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <>
        <Header />
        <MobileMenu />
        <PopupSignInUp />
        <BreadCrumb title={t("booking_details") || "Détails de la réservation"} />
        <section className="our-bookings bgc-fa">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="footer_one">
          <div className="container">
            <div className="row">
              <Footer />
            </div>
          </div>
        </section>
        <CopyrightFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <MobileMenu />
        <PopupSignInUp />
        <BreadCrumb title={t("booking_details") || "Détails de la réservation"} />
        <section className="our-bookings bgc-fa">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
                <div className="text-center mt-4">
                  <Link href="/bookings" className="btn btn-thm">
                    <i className="fa fa-arrow-left me-2"></i>
                    {t('back_to_bookings') || 'Retour aux réservations'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="footer_one">
          <div className="container">
            <div className="row">
              <Footer />
            </div>
          </div>
        </section>
        <CopyrightFooter />
      </>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <>
      <Header />
      <MobileMenu />
      <PopupSignInUp />
      <BreadCrumb title={t("booking_details") || "Détails de la réservation"} />

      <section className="our-bookings bgc-fa">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="booking-details-wrapper">
                <div className="d-flex justify-content-between align-items-center mb30">
                  <h4>{t('booking_details') || 'Détails de la réservation'}</h4>
                  <Link href="/bookings" className="btn btn-thm-outline">
                    <i className="fa fa-arrow-left me-2"></i>
                    {t('back_to_bookings') || 'Retour aux réservations'}
                  </Link>
                </div>

                <div className="row">
                  {/* Informations de la réservation */}
                  <div className="col-lg-8">
                    <div className="card mb30" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <div className="card-header bg-thm text-white">
                        <h5 className="mb-0">
                          <i className="fa fa-calendar-check-o me-2"></i>
                          {t('reservation_information') || 'Informations de la réservation'}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong><i className="fa fa-hashtag me-2 text-thm"></i>{t('reservation_id') || 'ID Réservation'}:</strong>
                            </p>
                            <p className="text-muted">{booking.id}</p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong><i className="fa fa-info-circle me-2 text-thm"></i>{t('status') || 'Statut'}:</strong>
                            </p>
                            <p>{getStatusBadge(booking.status)}</p>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong><i className="fa fa-calendar me-2 text-thm"></i>{t('start_date') || 'Date de début'}:</strong>
                            </p>
                            <p className="text-muted">{formatDateTime(booking.startDate)}</p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong><i className="fa fa-calendar-check-o me-2 text-thm"></i>{t('end_date') || 'Date de fin'}:</strong>
                            </p>
                            <p className="text-muted">{formatDateTime(booking.endDate)}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong><i className="fa fa-money me-2 text-thm"></i>{t('total_price') || 'Prix total'}:</strong>
                            </p>
                            <p className="text-muted h5 text-thm">
                              <strong>{booking.totalPrice?.toLocaleString('fr-FR')} FCFA</strong>
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p className="mb-2">
                              <strong><i className="fa fa-clock-o me-2 text-thm"></i>{t('created_at') || 'Créée le'}:</strong>
                            </p>
                            <p className="text-muted">{formatDateTime(booking.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informations du service réservé */}
                    <div className="card mb30" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <div className="card-header bg-info text-white">
                        <h5 className="mb-0">
                          <i className={booking.vehicle ? 'fa fa-car me-2' : 'fa fa-home me-2'}></i>
                          {t('reserved_service') || 'Service réservé'}
                        </h5>
                      </div>
                      <div className="card-body">
                        {booking.vehicle ? (
                          <>
                            <h5 className="mb-3">{booking.vehicle.title}</h5>
                            <div className="row">
                              <div className="col-md-6 mb-2">
                                <p><strong>{t('type') || 'Type'}:</strong> {t('vehicle') || 'Véhicule'}</p>
                              </div>
                              {booking.vehicle.brand && (
                                <div className="col-md-6 mb-2">
                                  <p><strong>{t('brand') || 'Marque'}:</strong> {booking.vehicle.brand}</p>
                                </div>
                              )}
                              {booking.vehicle.model && (
                                <div className="col-md-6 mb-2">
                                  <p><strong>{t('model') || 'Modèle'}:</strong> {booking.vehicle.model}</p>
                                </div>
                              )}
                              {booking.vehicle.pricePerDay && (
                                <div className="col-md-6 mb-2">
                                  <p><strong>{t('price_per_day') || 'Prix par jour'}:</strong> {booking.vehicle.pricePerDay.toLocaleString('fr-FR')} FCFA</p>
                                </div>
                              )}
                            </div>
                            <Link 
                              href={`/vehicle-details/${booking.vehicle.id || booking.vehicleId}`}
                              className="btn btn-sm btn-thm-outline mt-3"
                            >
                              <i className="fa fa-eye me-2"></i>
                              {t('view_service') || 'Voir le service'}
                            </Link>
                          </>
                        ) : booking.apartment ? (
                          <>
                            <h5 className="mb-3">{booking.apartment.title}</h5>
                            <div className="row">
                              <div className="col-md-6 mb-2">
                                <p><strong>{t('type') || 'Type'}:</strong> {t('apartment') || 'Appartement'}</p>
                              </div>
                              {booking.apartment.pricePerDay && (
                                <div className="col-md-6 mb-2">
                                  <p><strong>{t('price_per_day') || 'Prix par jour'}:</strong> {booking.apartment.pricePerDay.toLocaleString('fr-FR')} FCFA</p>
                                </div>
                              )}
                              {booking.apartment.bedrooms && (
                                <div className="col-md-6 mb-2">
                                  <p><strong>{t('bedrooms') || 'Chambres'}:</strong> {booking.apartment.bedrooms}</p>
                                </div>
                              )}
                              {booking.apartment.bathrooms && (
                                <div className="col-md-6 mb-2">
                                  <p><strong>{t('bathrooms') || 'Salles de bain'}:</strong> {booking.apartment.bathrooms}</p>
                                </div>
                              )}
                            </div>
                            <Link 
                              href={`/apartment-details/${booking.apartment.id || booking.apartmentId}`}
                              className="btn btn-sm btn-thm-outline mt-3"
                            >
                              <i className="fa fa-eye me-2"></i>
                              {t('view_service') || 'Voir le service'}
                            </Link>
                          </>
                        ) : (
                          <p className="text-muted">{t('service_not_found') || 'Service non trouvé'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-lg-4">
                    <div className="card" style={{ border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <div className="card-header bg-thm text-white">
                        <h5 className="mb-0">
                          <i className="fa fa-cog me-2"></i>
                          {t('actions') || 'Actions'}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="d-grid gap-2">
                          {booking.status === 'PENDING' && (
                            <button 
                              className="btn btn-danger"
                              onClick={() => {
                                if (confirm(t('confirm_cancel') || 'Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                                  // TODO: Implémenter l'annulation
                                  alert(t('cancel_not_implemented') || 'Fonctionnalité d\'annulation à venir');
                                }
                              }}
                            >
                              <i className="fa fa-times me-2"></i>
                              {t('cancel_booking') || 'Annuler la réservation'}
                            </button>
                          )}
                          <Link 
                            href={booking.vehicle ? `/vehicle-details/${booking.vehicle.id || booking.vehicleId}` : `/apartment-details/${booking.apartment.id || booking.apartmentId}`}
                            className="btn btn-thm-outline"
                          >
                            <i className="fa fa-eye me-2"></i>
                            {t('view_service') || 'Voir le service'}
                          </Link>
                          <Link 
                            href="/bookings"
                            className="btn btn-secondary"
                          >
                            <i className="fa fa-arrow-left me-2"></i>
                            {t('back_to_bookings') || 'Retour aux réservations'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>
      <CopyrightFooter />
    </>
  );
};

export default BookingDetails;
