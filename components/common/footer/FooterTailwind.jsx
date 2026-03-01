'use client';

import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from "next/image";

const FooterTailwind = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const socialLinks = [
    { 
      href: "https://www.facebook.com/share/1F9RB2m8P9/?mibextid=wwXIfr", 
      label: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      href: "https://wa.me/2250716673212", 
      label: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    },
    { 
      href: "https://www.instagram.com/kadoorservice", 
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
        </svg>
      )
    },
  ];

  const quickLinks = [
    { href: "/about-us", label: t('about_us') },
    { href: "/terms", label: t('cgl') },
    { href: "/privacy-policy", label: t('privacy_policy') },
  ];

  const menuItems = [
    { href: "/", label: tNav('home') },
    { href: "/vehicles", label: tNav('vehicles') },
    { href: "/apartments", label: tNav('apartments') },
    { href: "/gifts", label: tNav('gifts') },
    { href: "/about-us", label: tNav('about_us') },
    { href: "/contact", label: tNav('contact') },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t('invalid_email') || 'Email invalide');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(t('subscribe_success') || 'Abonnement réussi !');
        setEmail('');
        setTimeout(() => { setStatus('idle'); setMessage(''); }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || t('subscribe_error') || 'Erreur');
      }
    } catch {
      setStatus('error');
      setMessage(t('subscribe_error') || 'Erreur');
    }
  };

  return (
    <footer className="bg-dark text-white">
      {/* Main Footer */}
      <div className="container-kadoor py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Image
              src="/assets/images/header-logo2.png"
              alt="KADOOR SERVICE"
              width={550}
              height={200}
              className="h-32 w-auto mb-6"
            />
            <p className="text-gray-400 leading-relaxed">
              {t('about_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('links_title')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('contact_title')}</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:kadoorserviceci@gmail.com" className="hover:text-primary transition-colors">
                  kadoorserviceci@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Abidjan, Côte d'Ivoire</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('follow_title')}</h4>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <h4 className="text-lg font-semibold mb-4 text-white">{t('subscribe_title')}</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email_placeholder') || 'Votre email'}
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-3 rounded-lg text-white transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#ff5a5f' }}
              >
                {status === 'loading' ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-kadoor py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} KADOOR SERVICE - {t('developed_by')}{" "}
              <a
                href="https://anderson-aka-pro.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Anderson Aka
              </a>
              . {t('copyright_text')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTailwind;
