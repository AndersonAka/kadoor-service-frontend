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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Heading */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("title")}</h3>
        <p className="text-gray-500">
          {t("no_account")}{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            {t("sign_up")}
          </Link>
        </p>
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}
        {googleError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{googleError}</div>
        )}
      </div>

      {/* Google Sign In */}
      <div>
        <GoogleSignInButton 
          mode="signin"
          onError={(err) => setGoogleError(err)}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400">{t("or_email") || "ou avec votre email"}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Email */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          type="text"
          required
          placeholder={t("email_placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Password */}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-600">{t("remember_me")}</span>
        </label>
        <a href="#" className="text-sm text-primary hover:underline">
          {t("forgot_password")}
        </a>
      </div>

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
            {t("logging_in")}
          </span>
        ) : t("login_button")}
      </button>
    </form>
  );
};

export default Form;
