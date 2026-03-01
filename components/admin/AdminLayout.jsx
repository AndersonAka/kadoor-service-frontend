'use client';

import { useState } from 'react';
import { Link, useRouter } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const t = useTranslations('Admin');

  const isActive = (path) => pathname?.includes(path);

  const menuItems = [
    { name: t('dashboard') || "Tableau de bord", href: "/my-dashboard", icon: "grid" },
    { name: t('reservations') || "Réservations", href: "/admin/reservations", icon: "calendar" },
    { name: t('clients') || "Clients", href: "/admin/clients", icon: "users" },
    { name: t('newsletter') || "Newsletter", href: "/admin/newsletter", icon: "mail" },
    { name: t('incidents') || "Incidents", href: "/admin/incidents", icon: "alert-triangle" },
  ];

  const servicesItems = [
    { name: t('vehicles') || "Véhicules", href: "/admin/vehicles", icon: "car" },
    { name: t('apartments') || "Appartements", href: "/admin/apartments", icon: "home" },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const IconComponent = ({ name, className = "w-5 h-5" }) => {
    const icons = {
      grid: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
      calendar: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      users: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      mail: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      "alert-triangle": <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      car: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
      home: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      chevronDown: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
      logout: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
      menu: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
      x: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
      user: <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    };
    return icons[name] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-2 border-b border-gray-100">
            <Link href="/" className="flex items-center">
              <Image
                width={140}
                height={40}
                src="/assets/images/header-logo2.png"
                alt="KADOOR SERVICE"
                className="h-24 w-auto"
              />
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <IconComponent name="x" className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{user.firstName} {user.lastName}</p>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {t('main_menu') || "Menu Principal"}
            </p>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent name={item.icon} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Services Section */}
            <div className="mt-6">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3"
              >
                <span>{t('services_management') || "Services"}</span>
                <IconComponent 
                  name="chevronDown" 
                  className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              {servicesOpen && (
                <ul className="space-y-1">
                  {servicesItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <IconComponent name={item.icon} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Account Section */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {t('account_management') || "Compte"}
              </p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/my-profile"
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive('/my-profile')
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent name="user" />
                    <span className="font-medium">{t('my_profile') || "Mon Profil"}</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <IconComponent name="logout" />
                    <span className="font-medium">{t('logout') || "Déconnexion"}</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <IconComponent name="menu" className="w-6 h-6 text-gray-600" />
              </button>
              {title && (
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
                ← {t('back_to_site') || "Retour au site"}
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
