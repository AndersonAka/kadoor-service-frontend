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

const home = [
  {
    name: "Home 1",
    routerPath: "/",
  },
  {
    name: "Home 2",
    routerPath: "/home-2",
  },
  {
    name: "Home 3",
    routerPath: "/home-3",
  },
  {
    name: "Home 4",
    routerPath: "/home-4",
  },
  {
    name: "Home 5",
    routerPath: "/home-5",
  },
  {
    name: "Home 6",
    routerPath: "/home-6",
  },
  {
    name: "Home 7",
    routerPath: "/home-7",
  },
  {
    name: "Home 8",
    routerPath: "/home-8",
  },
  {
    name: "Home 9",
    routerPath: "/home-9",
  },
  {
    name: "Home 10",
    routerPath: "/home-10",
  },
];

const listing = [
  {
    id: 1,
    title: "Listing Grid",
    items: [
      {
        name: "Grid v1",
        routerPath: "/listing-grid-v1",
      },
      {
        name: "Grid v2",
        routerPath: "/listing-grid-v2",
      },
      {
        name: "Grid v3",
        routerPath: "/listing-grid-v3",
      },
      {
        name: "Grid v4",
        routerPath: "/listing-grid-v4",
      },
      {
        name: "Grid v5",
        routerPath: "/listing-grid-v5",
      },
      {
        name: "Grid v6",
        routerPath: "/listing-grid-v6",
      },
    ],
  },
  {
    id: 2,
    title: "Listing List",
    items: [
      {
        name: "List V1",
        routerPath: "/listing-list-v1",
      },
    ],
  },
  {
    id: 3,
    title: "Listing Style",
    items: [
      {
        name: "Parallax Style",
        routerPath: "/parallax-style",
      },
      {
        name: "Slider Style",
        routerPath: "/slider-style",
      },
      {
        name: "Map Header",
        routerPath: "/map-header",
      },
    ],
  },
  {
    id: 4,
    title: "Listing Half",
    items: [
      {
        name: "Map V1",
        routerPath: "/listing-map-v1",
      },
      {
        name: "Map V2",
        routerPath: "/listing-map-v2",
      },
      {
        name: "Map V3",
        routerPath: "/listing-map-v3",
      },
      {
        name: "Map V4",
        routerPath: "/listing-map-v4",
      },
    ],
  },
  {
    id: 5,
    title: "Agent View",
    items: [
      {
        name: "Agent V1",
        routerPath: "/agent-v1",
      },
      {
        name: "Agent V2",
        routerPath: "/agent-v2",
      },
      {
        name: "Agent Details",
        routerPath: "/agent-details",
      },
    ],
  },
  {
    id: 6,
    title: "Agencies View",
    items: [
      {
        name: "Agencies V1",
        routerPath: "/agency-v1",
      },
      {
        name: "Agencies V2",
        routerPath: "/agency-v2",
      },
      {
        name: "Agencies Details",
        routerPath: "/agency-details",
      },
    ],
  },
  {
    id: 7,
    title: "Create Listing",
    items: [
      {
        name: "Create Listing",
        routerPath: "/create-listing",
      },
    ],
  },
];

const property = [
  {
    id: 1,
    title: "User Admin",
    items: [
      {
        name: "Dashboard",
        routerPath: "/my-dashboard",
      },
      {
        name: "My Properties",
        routerPath: "/my-properties",
      },
      {
        name: "My Message",
        routerPath: "/my-message",
      },
      {
        name: "My Review",
        routerPath: "/my-review",
      },
      {
        name: "My Favourites",
        routerPath: "/my-favourites",
      },
      {
        name: "My Profile",
        routerPath: "/my-profile",
      },
      {
        name: "My Package",
        routerPath: "/my-package",
      },
      {
        name: "My Saved Search",
        routerPath: "/my-saved-search",
      },
      {
        name: "Add Property",
        routerPath: "/create-listing",
      },
    ],
  },
  {
    id: 2,
    title: "Listing Single",
    items: [
      {
        name: "Single V1",
        routerPath: "/listing-details-v1",
      },
      {
        name: "Single V2",
        routerPath: "/listing-details-v2",
      },
      {
        name: "Single V3",
        routerPath: "/listing-details-v3",
      },
      {
        name: "Single V4",
        routerPath: "/listing-details-v4",
      },
    ],
  },
];

const blog = [
  { id: 1, name: "Blog List 1", routerPath: "/blog-list-1" },
  { id: 2, name: "Blog List 2", routerPath: "/blog-list-2" },
  { id: 3, name: "Blog List 3", routerPath: "/blog-list-3" },
  {
    id: 4,
    name: "Blog Details",
    routerPath: "/blog-details",
  },
];

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
          <SubMenu
            label="Home"
           
            className={
              home.some((page) => page.routerPath?.split('/')[1] === pathname.split('/')[1])
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {home.map((val, i) => (
              <MenuItem key={i} active={true}>
                <div
                 
                  onClick={()=>router.push(val.routerPath)}
                  className={
                    val.routerPath?.split('/')[1] === pathname.split('/')[1] ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  {val.name}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End Home Home */}

          <SubMenu
            label="Listing"
            className={
              listing.some((parent) => {
                return parent.items.some(
                  (page) => page.routerPath?.split('/')[1] === pathname.split('/')[1]
                );
              })
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {listing.map((item) => (
              <SubMenu
              label={item.title}
                className={
                  item.items.some((page) => page.routerPath?.split('/')[1] === pathname.split('/')[1])
                    ? "ui-active plus alt"
                    : "plus alt inactive-mobile-menu"
                }
                key={item.id}
              >
                {item.items.map((val, i) => (
                  <MenuItem key={i}>
                    <div
                     onClick={()=>router.push(val.routerPath)}
                      className={
                        pathname?.split('/')[1] === val.routerPath?.split('/')[1]
                          ? "ui-active"
                          : 'inactive-mobile-menu'
                      }
                    >
                      {val.name}
                    </div>
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </SubMenu>
          {/* End Pages Listing */}

          <SubMenu
            label="Property"
            className={
              property.some((parent) => {
                return parent.items.some(
                  (page) =>
                    page.routerPath?.split('/')[1] === pathname.split('/')[1] ||
                    page.routerPath?.split('/')[1] + "/[id]" === pathname.split('/')[1]
                );
              })
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {property.map((item) => (
              <SubMenu
              label={item.title}
                className={
                  item.items.some(
                    (page) =>
                      page.routerPath?.split('/')[1] === pathname.split('/')[1] ||
                      page.routerPath?.split('/')[1] + "/[id]" === pathname.split('/')[1]
                  )
                    ? "ui-active plus alt"
                    : "plus alt inactive-mobile-menu"
                }
                key={item.id}
              >
                {item.items.map((val, i) => (
                  <MenuItem key={i}>
                    <div
                      onClick={()=>router.push(val.routerPath)}
                      className={
                        pathname.split('/')[1] === val.routerPath?.split('/')[1]
                        // val.routerPath === pathname.split('/')[1]
                          ? "ui-active"
                          : 'inactive-mobile-menu'
                      }
                    >
                      {val.name}
                    </div>
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </SubMenu>
          {/* End Pages Property */}

          <SubMenu
            label="Blog"
            className={
              blog.some(
                (page) =>
                  page.routerPath?.split('/')[1] === pathname.split('/')[1] 
                  // page.routerPath?.split('/')[1] + "/[id]" === pathname.split('/')[1]
              )
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {blog.map((val, i) => (
              <MenuItem key={i}>
                <div
                  onClick={()=>router.push(val.routerPath)}
                  className={
                    pathname?.split('/')[1] === val.routerPath?.split('/')[1] 
                    // val.routerPath + "/[id]" === pathname.split('/')[1]
                      ? "ui-active"
                      : 'inactive-mobile-menu'
                  }
                >
                  {val.name}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End pages Blog */}

          <SubMenu
            label="Pages"
            className={
              pages.some((page) => page.routerPath?.split('/')[1] === pathname.split('/')[1])
                ? "parent-menu-active"
                : 'inactive-mobile-menu'
            }
          >
            {pages.map((val, i) => (
              <MenuItem key={i}>
                <div
                  onClick={()=>router.push(val.routerPath)}
                  className={
                    pathname?.split('/')[1] === val.routerPath?.split('/')[1] ? "ui-active" : 'inactive-mobile-menu'
                  }
                >
                  {val.name}
                </div>
              </MenuItem>
            ))}
          </SubMenu>
          {/* End pages Pages */}

          <MenuItem>
            <div
            onClick={()=>router.push("/contact")}
             
              className={
                pathname === "/contact" ? "ui-active" : 'inactive-mobile-menu'
              }
            >
              Contact
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

      
        <Link
          href="/create-listing"
          className="btn btn-block btn-lg btn-thm circle"
          style={{width:'90%',margin:'0px auto'}}
        >
          <span className="flaticon-plus"></span> Create Listing
        </Link></>
     
   
  );
};

export default MobileMenuContent;
