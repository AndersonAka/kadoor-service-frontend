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

  const inputClass = "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-700 placeholder-gray-400";

  return (
    <form onSubmit={onRegister} className="space-y-4">
      {/* Heading */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("title")}</h3>
        <p className="text-gray-500">
          {t("have_account")}{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            {t("login_link")}
          </Link>
        </p>
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}
        {googleError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{googleError}</div>
        )}
      </div>

      {/* Google Sign Up */}
      <div>
        <GoogleSignInButton 
          mode="signup"
          onError={(err) => setGoogleError(err)}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">{t("or_email") || "ou avec votre email"}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            required
            placeholder={t("first_name_placeholder")}
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            required
            placeholder={t("last_name_placeholder")}
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <input
          type="tel"
          required
          placeholder={t("phone_placeholder")}
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          type="email"
          required
          placeholder={t("email_placeholder")}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={inputClass}
        />
      </div>

      {/* Password Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            required
            placeholder={t("password_placeholder")}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            required
            placeholder={t("confirm_password_placeholder")}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          id="terms"
          className="w-4 h-4 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <span className="text-sm text-gray-600">{t("terms_label")}</span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t("registering")}
          </span>
        ) : t("register_button")}
      </button>
    </form>
  );
};

export default Form;
