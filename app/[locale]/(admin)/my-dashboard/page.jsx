'use client';

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import MyDashboard from "@/components/dashboard/my-dashboard";

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Rediriger les utilisateurs USER vers la page d'accueil
    // Seuls ADMIN et MANAGER peuvent accéder au dashboard
    if (!loading && user && user.role === 'USER') {
      router.push('/');
      return;
    }
    
    // Si pas connecté, rediriger vers login
    if (!loading && !user) {
      router.push('/login');
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
        <MyDashboard />
      </>
    );
  }

  // Si pas connecté ou utilisateur USER, afficher un loader (la redirection est gérée dans useEffect)
  return null;
};

export default DashboardPage;
