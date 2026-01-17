"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import GoogleSignInButton from "../common/GoogleSignInButton";

const Form = () => {
  const t = useTranslations("LoginPage");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>{t("title")}</h3>
        <p className="text-center">
          {t("no_account")}{" "}
          <Link href="/register" className="text-thm">
            {t("sign_up")}
          </Link>
        </p>
        {error && <div className="alert alert-danger">{error}</div>}
        {googleError && <div className="alert alert-danger">{googleError}</div>}
      </div>
      {/* End .heading */}

      {/* Google Sign In Button */}
      <div className="mb-3">
        <GoogleSignInButton 
          mode="signin"
          onError={(err) => setGoogleError(err)}
        />
      </div>

      <div className="divider-with-text my-3">
        <span>{t("or_email") || "ou avec votre email"}</span>
      </div>

      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
          className="form-control"
          required
          placeholder={t("email_placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          required
          placeholder={t("password_placeholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>
      {/* End .input-group */}

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="remeberMe"
        />
        <label
          className="form-check-label form-check-label"
          htmlFor="remeberMe"
        >
          {t("remember_me")}
        </label>

        <a className="btn-fpswd float-end" href="#">
          {t("forgot_password")}
        </a>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-log w-100 btn-thm" disabled={loading}>
        {loading ? t("logging_in") : t("login_button")}
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
