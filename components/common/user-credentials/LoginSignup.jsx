'use client';

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import GoogleSignInButton from "../GoogleSignInButton";

const LoginSignup = ({ onClose }) => {
  const tAuth = useTranslations("Auth");
  const tLogin = useTranslations("LoginPage");
  const tRegister = useTranslations("RegisterPage");

  const { login, register } = useAuth();
  const [googleError, setGoogleError] = useState("");
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const result = await login(loginEmail, loginPassword);
    if (!result.success) {
      setLoginError(result.error);
    } else {
      // Close modal on successful login
      onClose && onClose();
    }
    setLoginLoading(false);
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError(tRegister("passwords_not_match"));
      return;
    }

    setRegisterError("");
    setRegisterLoading(true);

    const result = await register({
      email: registerData.email,
      password: registerData.password,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      phone: registerData.phone,
    });

    if (!result.success) {
      setRegisterError(result.error);
    } else {
      // Close modal on successful registration
      onClose && onClose();
    }
    setRegisterLoading(false);
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="btn-close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="modal-body container pb20">
        <div className="row">
          <div className="col-lg-12">
            <ul className="sign_up_tab nav nav-tabs" role="tablist">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveTab('login')}
                  role="tab"
                >
                  {tAuth("login")}
                </button>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveTab('register')}
                  role="tab"
                >
                  {tAuth("register")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content container">
          {/* Login Tab */}
          <div
            style={{ display: activeTab === 'login' ? 'flex' : 'none' }}
            className="row mt25 tab-pane"
            role="tabpanel"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="login_thumb">
                <Image
                  width={357}
                  height={494}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/login-img.png"
                  alt={tLogin("image_alt") || "Connexion"}
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-6 col-xl-6">
              <div className="login_form">
                <form onSubmit={handleLogin}>
                  <div className="heading">
                    <h4>{tAuth("login")}</h4>
                  </div>
                  {/* End heading */}

                  {loginError && <div className="alert alert-danger">{loginError}</div>}
                  {googleError && <div className="alert alert-danger">{googleError}</div>}

                  {/* Google Sign In Button */}
                  <div className="row mt25 mb-3">
                    <div className="col-lg-12">
                      <GoogleSignInButton 
                        mode="signin"
                        onSuccess={() => onClose && onClose()}
                        onError={(error) => setGoogleError(error)}
                      />
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="divider-with-text my-3">
                    <span>{tLogin("or_email") || "ou avec votre email"}</span>
                  </div>

                  <div className="input-group mb-2 mr-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      id="inlineFormInputGroupUsername2"
                      placeholder={tLogin("email_placeholder")}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="input-group form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder={tLogin("password_placeholder")}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

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
                      {tLogin("remember_me")}
                    </label>

                    <a className="btn-fpswd float-end" href="#">
                      {tLogin("forgot_password")}
                    </a>
                  </div>
                  {/* End remember me checkbox */}

                  <button type="submit" className="btn btn-log w-100 btn-thm" disabled={loginLoading}>
                    {loginLoading ? tLogin("logging_in") : tLogin("login_button")}
                  </button>
                  {/* End submit button */}
                </form>
              </div>
              {/* End .col .login_form */}
            </div>
          </div>
          {/* End .tab-pane */}

          {/* Register Tab */}
          <div
            style={{ display: activeTab === 'register' ? 'flex' : 'none' }}
            className="row mt25 tab-pane"
            role="tabpanel"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="regstr_thumb">
                <Image
                  width={357}
                  height={659}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/register-img.jpg"
                  alt={tRegister("image_alt") || "Inscription"}
                />
              </div>
            </div>
            {/* End . left side image for register */}

            <div className="col-lg-6 col-xl-6">
              <div className="sign_up_form">
                <div className="heading">
                  <h4>{tAuth("register")}</h4>
                </div>
                {/* End .heading */}

                {registerError && <div className="alert alert-danger">{registerError}</div>}
                {googleError && <div className="alert alert-danger">{googleError}</div>}

                <form onSubmit={handleRegister}>
                  <div className="row mb-2">
                    <div className="col-lg-12">
                      <GoogleSignInButton 
                        mode="signup"
                        onSuccess={() => onClose && onClose()}
                        onError={(error) => setGoogleError(error)}
                      />
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="divider-with-text my-3">
                    <span>{tRegister("or_email") || "ou avec votre email"}</span>
                  </div>

                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputFirstName"
                      placeholder={tRegister("first_name_placeholder")}
                      name="firstName"
                      value={registerData.firstName}
                      onChange={handleRegisterInputChange}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .form-group */}

                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputLastName"
                      placeholder={tRegister("last_name_placeholder")}
                      name="lastName"
                      value={registerData.lastName}
                      onChange={handleRegisterInputChange}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .form-group */}

                  <div className="form-group input-group mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder={tRegister("phone_placeholder")}
                      name="phone"
                      value={registerData.phone}
                      onChange={handleRegisterInputChange}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-phone"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .form-group */}

                  <div className="form-group input-group  mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail2"
                      placeholder={tRegister("email_placeholder")}
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterInputChange}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-envelope-o"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group input-group  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder={tRegister("password_placeholder")}
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterInputChange}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group input-group  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword3"
                      placeholder={tRegister("confirm_password_placeholder")}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterInputChange}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="terms"
                      required
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="terms"
                    >
                      {tRegister("terms_label")}
                    </label>
                  </div>
                  {/* End from-group */}

                  <button type="submit" className="btn btn-log w-100 btn-thm" disabled={registerLoading}>
                    {registerLoading ? tRegister("registering") : tRegister("register_button")}
                  </button>
                  {/* End btn */}
                </form>
                {/* End .form */}
              </div>
            </div>
            {/* End register content */}
          </div>
          {/* End .tab-pane */}
        </div>
      </div>
      
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
    </div>
  );
};

export default LoginSignup;
