'use client';

const HouseRules = ({ rules }) => {
    if (!rules || rules.length === 0) return null;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Règles de la maison</h3>
            <ul className="space-y-3">
                {rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {rule}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HouseRules;
