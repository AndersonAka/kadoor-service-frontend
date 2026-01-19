'use client';

import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

const CopyrightFooter = () => {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

  const menuItems = [
    { id: 1, name: t('home'), routeLink: "/" },
    { id: 2, name: t('vehicles'), routeLink: "/vehicles" },
    { id: 3, name: t('apartments'), routeLink: "/apartments" },
    { id: 4, name: t('gifts'), routeLink: "/gifts" },
    { id: 5, name: t('about_us'), routeLink: "/about-us" },
    { id: 6, name: t('contact'), routeLink: "/contact" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()} KADOOR SERVICE - {tFooter('developed_by')}{" "}
            <a
              href="https://anderson-aka-pro.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Anderson Aka
            </a>
            . {tFooter('copyright_text')}.
          </p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
