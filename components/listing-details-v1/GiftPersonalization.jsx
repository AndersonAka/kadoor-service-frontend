'use client';

import React, { useState } from 'react';

const GiftPersonalization = () => {
    const [selectedTheme, setSelectedTheme] = useState('Classic');

    const themes = [
        { id: 'Classic', name: 'Classique', color: '#333' },
        { id: 'Love', name: 'Amour', color: '#e02424' },
        { id: 'Birthday', name: 'Anniversaire', color: '#f59e0b' },
        { id: 'Work', name: 'Professionnel', color: '#1e40af' }
    ];

    return (
        <div className="application_statics mt30 gift-personalization">
            <h4 className="mb30">Personnalisez votre cadeau</h4>

            <div className="row">
                <div className="col-lg-12 mb20">
                    <h6>Choisir le thème de la carte</h6>
                    <div className="theme-selector d-flex gap-2 flex-wrap mt10">
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                className={`btn btn-outline-secondary btn-sm ${selectedTheme === theme.id ? 'active' : ''}`}
                                onClick={() => setSelectedTheme(theme.id)}
                                style={{
                                    borderLeft: `4px solid ${theme.color}`,
                                    fontWeight: selectedTheme === theme.id ? '600' : '400'
                                }}
                            >
                                {theme.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-lg-12">
                    <h6>Votre message (Optionnel)</h6>
                    <div className="form-group mt10">
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Écrivez un message personnel ici..."
                        ></textarea>
                        <small className="form-text text-muted">Ce message sera imprimé sur la carte jointe.</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftPersonalization;
