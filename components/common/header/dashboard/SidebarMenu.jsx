'use client'

import { Link, useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const t = useTranslations('Admin');

  const services = [
    { id: 1, name: t('vehicles') || "Véhicules", route: "/admin/vehicles" },
    { id: 2, name: t('apartments') || "Appartements", route: "/admin/apartments" },
  ];

  const manageAccount = [
    {
      id: 1,
      name: t('my_profile') || "Mon Profil",
      route: "/my-profile",
      icon: "flaticon-user",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link href="/">
            <Image
              width={160}
              height={100}
              src="/assets/images/header-logo2.png"
              alt="KADOOR SERVICE Logo"
            />
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <span>{t('main_menu') || "Menu Principal"}</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/my-dashboard", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-dashboard">
                <i className="flaticon-layers"></i>
                <span> {t('dashboard') || "Tableau de bord"}</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/admin/reservations", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/admin/reservations">
                <i className="flaticon-calendar"></i>
                <span> {t('reservations') || "Réservations"}</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/admin/clients", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/admin/clients">
                <i className="flaticon-user"></i>
                <span> {t('clients') || "Clients"}</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/admin/newsletter", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/admin/newsletter">
                <i className="flaticon-envelope"></i>
                <span> {t('newsletter') || "Newsletter"}</span>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/admin/incidents", pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/admin/incidents">
                <i className="fa fa-exclamation-triangle"></i>
                <span> {t('incidents') || "Incidents"}</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* End Main */}

        <li className="title">
          <span>{t('services_management') || "Gestion des Services"}</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(services, pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#services-menu">
                <i className="flaticon-home"></i> <span>{t('services') || "Services"}</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="services-menu">
                {services.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <i className="fa fa-circle"></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* End Services */}
          </ul>
        </li>
        {/* End Services Management */}

        <li className="title">
          <span>{t('account_management') || "Gestion du Compte"}</span>
          <ul>
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, pathname) ? "active" : ""
                }
                key={item.id}
              >
                <Link href={item.route}>
                  <i className={item.icon}></i> <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="treeview">
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                <i className="flaticon-logout"></i> <span>{t('logout') || "Déconnexion"}</span>
              </a>
            </li>
          </ul>
        </li>
        {/* End Account Management */}
      </ul>
    </>
  );
};

export default SidebarMenu;
