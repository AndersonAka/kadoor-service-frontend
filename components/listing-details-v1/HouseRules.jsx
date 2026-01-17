'use client';

import React from 'react';

const HouseRules = ({ rules }) => {
    if (!rules || rules.length === 0) return null;

    return (
        <div className="application_statics mt30">
            <h4 className="mb30">Règles de la maison</h4>
            <div className="row">
                <div className="col-lg-12">
                    <ul className="order_list list-style-none">
                        {rules.map((rule, index) => (
                            <li key={index} className="mb10 d-flex align-items-center">
                                <span className="flaticon-tick text-success me-3"></span>
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HouseRules;
