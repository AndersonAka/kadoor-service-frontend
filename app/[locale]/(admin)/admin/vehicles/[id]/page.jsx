'use client';

'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminVehicleDetails from "@/components/dashboard/admin-vehicles/VehicleDetails";

const VehicleDetailsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Rediriger les utilisateurs USER vers la page d'accueil
    // Seuls ADMIN et MANAGER peuvent accéder à cette page
    if (!loading && user && user.role === 'USER') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // Ne pas afficher si l'utilisateur est USER (sera redirigé)
  if (user && user.role === 'USER') {
    return null;
  }

  // Seuls ADMIN et MANAGER peuvent accéder à cette page
  if (user && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
    return (
      <>
        <AdminVehicleDetails />
      </>
    );
  }

  // Si pas connecté, rediriger vers login
  if (!user) {
    router.push('/login');
    return null;
  }

  return null;
};

export default VehicleDetailsPage;
