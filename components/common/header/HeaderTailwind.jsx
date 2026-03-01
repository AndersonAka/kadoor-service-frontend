'use client';

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import CurrencySelector from "@/components/common/CurrencySelector";

const HeaderTailwind = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const tNav = useTranslations('Navigation');
  const tAuth = useTranslations('Auth');
  const { user, logout, loading } = useAuth();
  const { openLoginModal } = useLoginModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getUserInitials = () => {
    if (!user) return '';
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.firstName || user.email?.split('@')[0] || 'Utilisateur';
  };

  const navLinks = [
    { href: "/", label: tNav('home'), exact: true },
  ];

  const servicesLinks = [
    { 
      href: "/vehicles", 
      label: tNav('vehicles'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      desc: 'Location de véhicules premium'
    },
    { 
      href: "/apartments", 
      label: tNav('apartments'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      desc: 'Appartements de standing'
    },
    { 
      href: "/gifts", 
      label: tNav('gifts'),
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      desc: 'Chèques cadeaux personnalisés'
    },
  ];

  const pagesLinks = [
    { 
      href: "/about-us", 
      label: tNav('about_us') || 'À propos',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      href: "/terms", 
      label: 'CGV',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  const isActive = (href, exact = false) => {
    if (exact) return pathname === href;
    return pathname?.includes(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container-kadoor">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/images/header-logo2.png"
              alt="KADOOR SERVICE"
              width={180}
              height={60}
              className="h-32 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden text-black lg:flex items-center space-x-1">
            {/* Home */}
            <Link
              href="/"
              className={`px-4 py-2 text-black font-medium transition-colors ${
                isActive('/', true)
                  ? 'text-primary bg-primary/10 font-bold'
                  : 'hover:text-primary hover:bg-primary/5'
              }`}
            >
              {tNav('home')}
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-4 py-2  font-medium transition-colors flex items-center gap-1 ${
                  servicesLinks.some(l => isActive(l.href))
                    ? 'text-primary bg-primary/10 font-bold'
                    : 'hover:text-primary hover:bg-primary/5'
                }`}
              >
                {tNav('services')}
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'services' && (
                <div className="absolute top-full left-0 pt-2 z-[9999]">
                  <div className="bg-white  shadow-xl border border-gray-200 py-2 min-w-[280px]">
                  {servicesLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-start gap-3 px-4 py-3  transition-all ${
                        isActive(link.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span className={`mt-0.5 ${isActive(link.href) ? 'text-primary' : 'text-gray-400'}`}>
                        {link.icon}
                      </span>
                      <div>
                        <span className="font-medium block">{link.label}</span>
                        {link.desc && <span className="text-xs text-gray-500">{link.desc}</span>}
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pages Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('pages')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-4 py-2  font-medium transition-colors flex items-center gap-1 ${
                  pagesLinks.some(l => isActive(l.href))
                    ? 'text-primary bg-primary/10 font-bold'
                    : ' hover:text-primary hover:bg-primary/5'
                }`}
              >
                {tNav('pages')}
                <svg className={`w-4 h-4 transition-transform ${openDropdown === 'pages' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'pages' && (
                <div className="absolute top-full left-0 pt-2 z-[9999]">
                  <div className="bg-white  shadow-xl border border-gray-200 py-2 min-w-[220px]">
                    {pagesLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 transition-all ${
                          isActive(link.href)
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        <span className={`${isActive(link.href) ? 'text-primary' : 'text-gray-400'}`}>
                          {link.icon}
                        </span>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-4 py-2 text-black font-medium transition-colors ${
                isActive('/contact', true)
                  ? 'text-primary bg-primary/10 font-bold'
                  : 'hover:text-primary hover:bg-primary/5'
              }`}
            >
              {tNav('contact')}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* User Menu */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-amber-500 ${
                      user.avatar ? '' : 'bg-gradient-to-br from-primary to-amber-500 text-white'
                    }`}
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={getDisplayName()}
                        width={36}
                        height={36}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <span className="hidden md:block font-medium text-secondary-700 max-w-[100px] truncate">
                    {getDisplayName()}
                  </span>
                  <svg className="w-4 h-4 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* User Dropdown */}
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white  shadow-xl border border-gray-100 py-2 min-w-[240px]">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-secondary-900">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-secondary-500 truncate">{user.email}</p>
                      {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
                          user.role === 'ADMIN' ? 'bg-red-600' : 'bg-blue-600'
                        }`}>
                          {user.role}
                        </span>
                      )}
                    </div>
                    
                    {/* Menu Items */}
                    {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
                      <Link
                        href="/my-dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-secondary-700 hover:text-primary hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href={user.role === 'ADMIN' || user.role === 'MANAGER' ? "/my-profile" : "/profile"}
                      className="flex items-center gap-3 px-4 py-3 text-secondary-700 hover:text-primary hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mon profil
                    </Link>
                    <Link
                      href={user.role === 'ADMIN' || user.role === 'MANAGER' ? "/my-bookings" : "/bookings"}
                      className="flex items-center gap-3 px-4 py-3 text-secondary-700 hover:text-primary hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Mes réservations
                    </Link>
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={() => {
                          if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                            logout();
                          }
                        }}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {tAuth('logout')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="btn-primary "
                onClick={openLoginModal}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden sm:inline">{tAuth('login_register')}</span>
              </button>
            )}

            {/* Currency Selector */}
            <CurrencySelector />

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-secondary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <nav className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3  font-medium ${
              isActive('/', true) ? 'text-primary bg-primary/10' : 'text-black'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {tNav('home')}
          </Link>
          
          {/* Services Mobile */}
          <div className="pt-2">
            <p className="px-4 py-2 text-xs font-semibold text-black uppercase tracking-wider">
              {tNav('services')}
            </p>
            {servicesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3  ${
                  isActive(link.href) ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
              >
                <span className={isActive(link.href) ? 'text-primary' : 'text-gray-400'}>{link.icon}</span>
                <div>
                  <span className="font-medium block">{link.label}</span>
                  {link.desc && <span className="text-xs text-gray-500">{link.desc}</span>}
                </div>
              </Link>
            ))}
          </div>

          {/* Pages Mobile */}
          <div className="pt-2">
            <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {tNav('pages')}
            </p>
            {pagesLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3  ${
                  isActive(link.href) ? 'text-primary bg-primary/10' : 'text-gray-700'
                }`}
              >
                <span className={isActive(link.href) ? 'text-primary' : 'text-gray-400'}>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3  font-medium ${
              isActive('/contact', true) ? 'text-primary bg-primary/10' : 'text-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {tNav('contact')}
          </Link>

          {/* Login Button for Mobile */}
          {!user && !loading && (
            <div className="pt-4 border-t border-gray-100 mt-4">
              <button
                className="w-full btn-primary justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLoginModal();
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {tAuth('login_register')}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HeaderTailwind;
