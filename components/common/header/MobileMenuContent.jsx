'use client'

// import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  Sidebar
} from "react-pro-sidebar";
import Link from "next/link";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";


const MobileMenuContent = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, loading } = useAuth()
  const tAuth = useTranslations('Auth')
  const tNav = useTranslations('Navigation')
  
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
      return `${user.firstName} ${user.lastName || ''}`.trim();
    }
    return user.email?.split('@')[0] || 'Utilisateur';
  };
  
  // Services pour le sous-menu
  const services = [
    {
      name: tNav('vehicles') || "Véhicules",
      routerPath: "/vehicles",
    },
    {
      name: tNav('apartments') || "Appartements",
      routerPath: "/apartments",
    },
    {
      name: tNav('gifts') || "Cadeaux",
      routerPath: "/gifts",
    },
  ];

  // Pages pour le sous-menu
  const pages = [
    {
      name: tNav('about_us') || "À propos de nous",
      routerPath: "/about-us",
    },
    {
      name: "Conditions générales de location",
      routerPath: "/terms",
    },
    // Ajouter le lien dashboard si l'utilisateur est admin ou manager
    ...(user && (user.role === 'ADMIN' || user.role === 'MANAGER') ? [{
      name: `Dashboard ${user.role === 'ADMIN' ? 'Admin' : 'Manager'}`,
      routerPath: "/my-dashboard",
    }] : []),
  ];

  return (
<>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-header-inner">
            <Image
              width={40}
              height={45}
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/header-logo2.png"
              alt="header-logo.png"
            />
          </Link>
          {/* End .logo */}

          <div
            className="fix-icon"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <span className="flaticon-close"></span>
          </div>
          {/* Mobile Menu close icon */}
        </div>

        {/* User Info Section */}
        {user && (
          <div 
            style={{
              padding: '15px 20px',
              borderBottom: '1px solid #eee',
              background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Avatar */}
            <div 
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #d4af37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: user.avatar ? 'transparent' : 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                color: '#fff',
                fontWeight: '600',
                fontSize: '18px',
                flexShrink: 0
              }}
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={getDisplayName()}
                  width={50}
                  height={50}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                getUserInitials()
              )}
            </div>
            {/* User info */}
            <div style={{ overflow: 'hidden' }}>
              <div style={{ 
                fontWeight: '600', 
                color: '#333',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {getDisplayName()}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#666',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user.email}
              </div>
              {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
                <span style={{
                  display: 'inline-block',
                  marginTop: '4px',
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
            </div>
          </div>
        )}

        {/* End logo */}
    {/* <Sidebar> */}
    <div style={{maxHeight:'calc(100vh - 100px)', overflowY:'auto'}}>
        <Menu>
          {/* Accueil */}
          <MenuItem>
            <div
              onClick={()=>router.push("/")}
              className={
                pathname === "/" ? "ui-active" : 'inactive-mobile-menu'
              }
            >
              <i className="fa fa-home me-2"></i> {tNav('home') || 'Accueil'}
            </div>
          </MenuItem>

          {/* Services */}
          <SubMenu
            label={tNav('services') || 'Services'}
            className={
              services.some((page) => pathname?.includes(page.routerPath.replace('/', '')))
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {services.map((val, i) => (
              <MenuItem key={i}>
                <div
                  onClick={()=>router.push(val.routerPath)}
                  className={
                    pathname?.includes(val.routerPath.replace('/', '')) ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  {val.name}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End Services */}

          {/* Pages */}
          <SubMenu
            label={tNav('pages') || 'Pages'}
            className={
              pages.some((page) => pathname?.includes(page.routerPath.replace('/', '')))
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {pages.map((val, i) => (
              <MenuItem key={i}>
                <div
                  onClick={()=>router.push(val.routerPath)}
                  className={
                    pathname?.includes(val.routerPath.replace('/', '')) ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  {val.name}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End Pages */}

          {/* Contact */}
          <MenuItem>
            <div
              onClick={()=>router.push("/contact")}
              className={
                pathname?.includes('/contact') ? "ui-active" : 'inactive-mobile-menu'
              }
            >
              <i className="fa fa-envelope me-2"></i> {tNav('contact') || 'Contact'}
            </div>
          </MenuItem>

          {user ? (
            <>
              {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
                <MenuItem>
                  <div
                    onClick={()=>router.push("/my-dashboard")}
                    className={pathname === "/my-dashboard" ? "ui-active" : 'inactive-mobile-menu'}
                  >
                    <i className="fa fa-dashboard me-2"></i> Dashboard
                  </div>
                </MenuItem>
              )}
              <MenuItem>
                <div
                  onClick={()=>router.push(user.role === 'ADMIN' || user.role === 'MANAGER' ? "/my-profile" : "/profile")}
                  className={pathname === "/my-profile" || pathname === "/profile" ? "ui-active" : 'inactive-mobile-menu'}
                >
                  <i className="fa fa-user me-2"></i> {tAuth('my_profile') || 'Mon profil'}
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={()=>router.push(user.role === 'ADMIN' || user.role === 'MANAGER' ? "/my-bookings" : "/bookings")}
                  className={pathname === "/my-bookings" || pathname === "/bookings" ? "ui-active" : 'inactive-mobile-menu'}
                >
                  <i className="fa fa-calendar me-2"></i> {tAuth('my_bookings') || 'Mes réservations'}
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                      logout();
                    }
                  }}
                  className='inactive-mobile-menu'
                  style={{ cursor: 'pointer', color: '#dc3545' }}
                >
                  <i className="fa fa-sign-out me-2"></i> {tAuth('logout')}
                </div>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <div
                onClick={()=>router.push("/login")}
        
                  className={pathname === "/login" ? "ui-active" : 'inactive-mobile-menu'}
                >
                  <span className="flaticon-user"></span> {tAuth('login')}
                </div>
              </MenuItem>

              <MenuItem>
                <div
                onClick={()=>router.push("/register")}
            
                  className={
                    pathname === "/register" ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  <span className="flaticon-edit"></span> {tAuth('register')}
                </div>
              </MenuItem>
            </>
          )}
        </Menu>
    </div>
      {/* </Sidebar> */}
      </>
     
   
  );
};

export default MobileMenuContent;
