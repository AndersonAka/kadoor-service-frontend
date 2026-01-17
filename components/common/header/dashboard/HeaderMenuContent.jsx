
'use client'

import Link from "next/link";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

import MyAccount from "./MyAccount";
import Image from "next/image";
import { usePathname } from "next/navigation";

const HeaderMenuContent = ({ float = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const t = useTranslations('Admin');

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
          <i className="fa fa-home me-2"></i>
          {t('back_to_site') || "Retour au site"}
        </Link>
      </li>
      {/* End .dropitem */}

      <li className="user_setting">
        <div className="dropdown">
          <a className="btn dropdown-toggle" href="#" data-bs-toggle="dropdown">
            <Image
              width={45}
              height={45}
              className="rounded-circle"
              src={user?.avatar || "/assets/images/team/e1.png"}
              alt={user?.firstName || "User"}
            />
            <span className="dn-1199 ms-1">
              {user?.firstName || "Admin"} {user?.lastName || ""}
            </span>
          </a>
          <div className="dropdown-menu">
            <MyAccount />
          </div>
        </div>
      </li>
      {/* End ."user_setting */}
    </ul>
  );
};

export default HeaderMenuContent;
