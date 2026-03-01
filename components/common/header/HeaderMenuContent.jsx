import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import CurrencySelector from "@/components/common/CurrencySelector";
import { useTranslations } from 'next-intl';
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();
  const tNav = useTranslations('Navigation');
  const tAuth = useTranslations('Auth');
  const { user, logout, loading } = useAuth();

  // Obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user) return '';
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  };

  // Obtenir le nom d'affichage
  const getDisplayName = () => {
    if (!user) return '';
    if (user.firstName) {
      return user.firstName;
    }
    return user.email?.split('@')[0] || 'Utilisateur';
  };

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="last">
        <Link
          href="/"
          className={pathname === "/" ? "ui-active" : undefined}
        >
          {tNav('home')}
        </Link>
      </li>

      <li className="dropitem">
        <a href="#">
          <span className="title">{tNav('services')}</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          <li>
            <Link
              href="/vehicles"
              className={pathname?.includes('vehicles') ? "ui-active" : undefined}
            >
              {tNav('vehicles')}
            </Link>
          </li>
          <li>
            <Link
              href="/apartments"
              className={pathname?.includes('apartments') ? "ui-active" : undefined}
            >
              {tNav('apartments')}
            </Link>
          </li>
          <li>
            <Link
              href="/gifts"
              className={pathname?.includes('gifts') ? "ui-active" : undefined}
            >
              {tNav('gifts')}
            </Link>
          </li>
        </ul>
      </li>

      <li className="dropitem">
        <a href="#">
          <span className="title">{tNav('pages')}</span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          <li>
            <Link 
              href="/about-us"
              className={pathname?.includes('about-us') ? "ui-active" : undefined}
            >
              {tNav('about_us') || 'À propos de nous'}
            </Link>
          </li>
          <li>
            <Link 
              href="/terms"
              className={pathname?.includes('terms') ? "ui-active" : undefined}
            >
              Conditions générales de location
            </Link>
          </li>
          {/* {(user && (user.role === 'ADMIN' || user.role === 'MANAGER')) && (
            <li>
              <Link href="/my-dashboard">Dashboard {user.role === 'ADMIN' ? 'Admin' : 'Manager'}</Link>
            </li>
          )} */}
        </ul>
      </li>

      <li className="last">
        <Link
          href="/contact"
          className={pathname === "/contact" ? "ui-active" : undefined}
        >
          {tNav('contact')}
        </Link>
      </li>

      {/* Zone utilisateur */}
      {loading ? (
        <li className={`list-inline-item list_s ${float}`}>
          <span className="btn" style={{ opacity: 0.5 }}>
            <i className="fa fa-spinner fa-spin"></i>
          </span>
        </li>
      ) : user ? (
        <li className={`dropitem list-inline-item list_s ${float}`}>
          <a href="#" className="user-menu-trigger d-flex align-items-center">
            {/* Avatar */}
            <div 
              className="user-avatar"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '8px',
                border: '2px solid #d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: user.avatar ? 'transparent' : 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                color: '#fff',
                fontWeight: '600',
                fontSize: '14px',
                flexShrink: 0
              }}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={getDisplayName()}
                  width={36}
                  height={36}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                getUserInitials()
              )}
            </div>
            <span className="user-name dn-md" style={{ 
              maxWidth: '120px', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: '500',
              lineHeight: '1.2'
            }}>
              {getDisplayName()}
            </span>
            <span className="arrow" style={{ marginLeft: '4px' }}></span>
          </a>
          <ul className="sub-menu" style={{ minWidth: '200px' }}>
            {/* Info utilisateur dans le menu */}
            <li style={{ 
              padding: '10px 15px', 
              borderBottom: '1px solid #eee',
              pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                {user.firstName} {user.lastName}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {user.email}
              </div>
              {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
                <span style={{
                  display: 'inline-block',
                  marginTop: '5px',
                  padding: '2px 8px',
                  backgroundColor: user.role === 'ADMIN' ? '#b91c1c' : '#2563eb',
                  color: '#fff',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: '600'
                }}>
                  {user.role}
                </span>
              )}
            </li>
            {/* Menu items */}
            {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
              <li>
                <Link href="/my-dashboard">
                  <i className="fa fa-dashboard me-2"></i>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link href={user.role === 'ADMIN' || user.role === 'MANAGER' ? "/my-profile" : "/profile"}>
                <i className="fa fa-user me-2"></i>
                Mon profil
              </Link>
            </li>
            <li>
              <Link href={user.role === 'ADMIN' || user.role === 'MANAGER' ? "/my-bookings" : "/bookings"}>
                <i className="fa fa-calendar me-2"></i>
                Mes réservations
              </Link>
            </li>
            <li style={{ borderTop: '1px solid #eee' }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                    logout();
                  }
                }}
                style={{ color: '#dc3545' }}
              >
                <i className="fa fa-sign-out me-2"></i>
                {tAuth('logout')}
              </a>
            </li>
          </ul>
        </li>
      ) : (
        <li className={`list-inline-item list_s ${float}`}>
          <a
            href="#"
            className="btn flaticon-user"
            data-bs-toggle="modal"
            data-bs-target=".bd-example-modal-lg"
          >
            <span className="dn-lg">{tAuth('login_register')}</span>
          </a>
        </li>
      )}

      <li className={`list-inline-item list_s ${float}`}>
        <CurrencySelector />
      </li>

      <li className={`list-inline-item list_s ${float}`}>
        <LanguageSwitcher />
      </li>

    </ul>
  );
};

export default HeaderMenuContent;
