"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import GoogleSignInButton from "../common/GoogleSignInButton";

const Form = () => {
  const t = useTranslations("RegisterPage");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t("passwords_not_match"));
      return;
    }

    setError("");
    setLoading(true);

    const result = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    });

    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onRegister}>
      <div className="heading text-center">
        <h3>{t("title")}</h3>
        <p className="text-center">
          {t("have_account")}{" "}
          <Link href="/login" className="text-thm">
            {t("login_link")}
          </Link>
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        {googleError && <div className="alert alert-danger">{googleError}</div>}
      </div>
      {/* End .heading */}

      {/* Google Sign Up Button */}
      <div className="mb-3">
        <GoogleSignInButton 
          mode="signup"
          onError={(err) => setGoogleError(err)}
        />
      </div>

      <div className="divider-with-text my-3">
        <span>{t("or_email") || "ou avec votre email"}</span>
      </div>

      <div className="form-group input-group ">
        <input
          type="text"
          className="form-control"
          required
          placeholder={t("first_name_placeholder")}
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group ">
        <input
          type="text"
          className="form-control"
          required
          placeholder={t("last_name_placeholder")}
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group ">
        <input
          type="tel"
          className="form-control"
          required
          placeholder={t("phone_placeholder")}
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-phone"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="email"
          className="form-control"
          required
          placeholder={t("email_placeholder")}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa fa-envelope-o"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="password"
          className="form-control"
          required
          placeholder={t("password_placeholder")}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group input-group  ">
        <input
          type="password"
          className="form-control"
          required
          placeholder={t("confirm_password_placeholder")}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .form-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          required
          id="terms"
        />
        <label className="form-check-label form-check-label" htmlFor="terms">
          {t("terms_label")}
        </label>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm" disabled={loading}>
        {loading ? t("registering") : t("register_button")}
      </button>
      {/* login button */}

      <style jsx>{`
        .divider-with-text {
          display: flex;
          align-items: center;
          text-align: center;
          color: #6c757d;
        }
        .divider-with-text::before,
        .divider-with-text::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #dee2e6;
        }
        .divider-with-text span {
          padding: 0 10px;
          font-size: 0.9rem;
        }
      `}</style>
    </form>
  );
};

export default Form;
