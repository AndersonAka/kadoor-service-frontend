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
        const loadUserData = async () => {
            if (user) {
                // Charger les données depuis le contexte
                setFormData({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    phone: user.phone || '',
                });
                
                // Si les données sont incomplètes, essayer de les charger depuis l'API
                if (!user.firstName && !user.lastName && !user.phone && user.id) {
                    try {
                        const userData = await adminService.getClient(user.id);
                        if (userData) {
                            setFormData({
                                firstName: userData.firstName || '',
                                lastName: userData.lastName || '',
                                email: userData.email || '',
                                phone: userData.phone || '',
                            });
                        }
                    } catch (error) {
                        console.error('Error loading user data:', error);
                    }
                }
            }
        };
        
        loadUserData();
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
                <div className={`p-4 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div 
                            className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center flex items-center justify-center overflow-hidden"
                            style={
                                profile !== null
                                    ? { backgroundImage: `url(${URL.createObjectURL(profile)})` }
                                    : user?.avatar
                                    ? { backgroundImage: `url(${user.avatar})` }
                                    : undefined
                            }
                        >
                            {!profile && !user?.avatar && (
                                <span className="text-2xl font-semibold text-gray-500">
                                    {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <label
                            htmlFor="image1"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </label>
                        <input
                            type="file"
                            id="image1"
                            className="hidden"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={uploadProfile}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">{t('upload_photo') || "Télécharger une photo"}</p>
                        <p className="text-xs text-gray-500">*{t('minimum_size') || "minimum 260px x 260px"}</p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('first_name') || "Prénom"}
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('last_name') || "Nom"}
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('email') || "Email"}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">{t('email_not_editable') || "L'email ne peut pas être modifié"}</p>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            {t('phone') || "Téléphone"}
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+225 XX XX XX XX XX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {t('updating') || "Mise à jour..."}
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('update_profile') || "Mettre à jour le profil"}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ProfileInfo;
