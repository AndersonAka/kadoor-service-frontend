'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one style2 home10 navbar-scrolltofixed stricky main-menu ${navbar ? "stricky-fixed" : ""}`}
      style={{
        backgroundColor: navbar ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: navbar ? '1px solid #eee' : 'none',
        boxShadow: navbar ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container p0">
        {/* <!-- Ace Responsive Menu --> */}

        <Link href="/" className="navbar_brand float-start dn-smd">
          <Image
            width={150}
            height={150}
            className="logo1 img-fluid"
            src="/assets/images/header-logo2.png"
            alt="Kadoor Service Logo"
          />
          <Image
            width={150}
            height={150}
            className="logo2 img-fluid"
            src="/assets/images/header-logo2.png"
            alt="Kadoor Service Logo"
          />
        </Link>
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
