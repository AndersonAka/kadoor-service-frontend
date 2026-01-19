'use client'

import { Link } from "@/i18n/routing";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const MyAccount = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('Admin');

  // Obtenir les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user) return 'A';
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'A';
  };

  // Obtenir le nom d'affichage
  const getDisplayName = () => {
    if (!user) return 'Admin';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName || user.email?.split('@')[0] || 'Admin';
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const profileMenuItems = [
    { 
      id: 1, 
      name: t('my_profile') || "Mon Profil", 
      ruterPath: "/my-profile",
      icon: "fa fa-user"
    },
    { 
      id: 2, 
      name: t('dashboard') || "Tableau de bord", 
      ruterPath: "/my-dashboard",
      icon: "fa fa-dashboard"
    },
    { 
      id: 3, 
      name: t('back_to_site') || "Retour au site", 
      ruterPath: "/",
      icon: "fa fa-home"
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="user_set_header">
        {user.avatar ? (
          <Image
            width={40}
            height={40}
            className="float-start rounded-circle"
            src={user.avatar}
            alt={getDisplayName()}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div
            className="float-start rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
              color: '#fff',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            {getUserInitials()}
          </div>
        )}
        <p>
          {getDisplayName()} <br />
          <span className="address">{user.email}</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, pathname)
                ? { color: "#b91c1c" }
                : undefined
            }
          >
            <i className={`${item.icon} me-2`}></i>
            {item.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="dropdown-item"
          style={{ borderTop: '1px solid #eee', marginTop: '5px', paddingTop: '10px' }}
        >
          <i className="fa fa-sign-out me-2"></i>
          {t('logout') || "Déconnexion"}
        </button>
      </div>
    </>
  );
};

export default MyAccount;
