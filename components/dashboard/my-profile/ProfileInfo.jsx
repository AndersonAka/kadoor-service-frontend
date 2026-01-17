'use client'

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

const ProfileInfo = () => {
    const { user, setUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const t = useTranslations('Admin');

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    // upload profile
    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            setLoading(true);
            setMessage(null);
            const updatedUser = await adminService.updateProfile(user.id, formData);
            setUser(updatedUser);
            setMessage({ type: 'success', text: t('profile_update_success') || 'Profil mis à jour avec succès' });
        } catch (error) {
            setMessage({ type: 'error', text: t('profile_update_error') || 'Erreur lors de la mise à jour du profil' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {message && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
                    {message.text}
                </div>
            )}

            <div className="row">
                <div className="col-lg-12">
                    <div className="wrap-custom-file">
                        <input
                            type="file"
                            id="image1"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={uploadProfile}
                        />
                        <label
                            style={
                                profile !== null
                                    ? {
                                          backgroundImage: `url(${URL.createObjectURL(
                                              profile
                                          )})`,
                                      }
                                    : user?.avatar
                                    ? {
                                          backgroundImage: `url(${user.avatar})`,
                                      }
                                    : undefined
                            }
                            htmlFor="image1"
                        >
                            <span>
                                <i className="flaticon-download"></i> {t('upload_photo') || "Télécharger une photo"}{" "}
                            </span>
                        </label>
                    </div>
                    <p>*{t('minimum_size') || "minimum 260px x 260px"}</p>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="firstName">{t('first_name') || "Prénom"}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="lastName">{t('last_name') || "Nom"}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="email">{t('email') || "Email"}</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            title={t('email_not_editable') || "L'email ne peut pas être modifié"}
                        />
                        <small className="text-muted">{t('email_not_editable') || "L'email ne peut pas être modifié"}</small>
                    </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                    <div className="my_profile_setting_input form-group">
                        <label htmlFor="phone">{t('phone') || "Téléphone"}</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+225 XX XX XX XX XX"
                        />
                    </div>
                </div>
                {/* End .col */}

                <div className="col-xl-12 text-right">
                    <div className="my_profile_setting_input">
                        <button type="submit" className="btn btn-thm" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    {t('updating') || "Mise à jour..."}
                                </>
                            ) : (
                                <>
                                    <i className="fa fa-save me-2"></i>
                                    {t('update_profile') || "Mettre à jour le profil"}
                                </>
                            )}
                        </button>
                    </div>
                </div>
                {/* End .col */}
            </div>
        </form>
    );
};

export default ProfileInfo;
