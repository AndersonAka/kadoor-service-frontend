const TermsCondions = () => {
  const termsContent = [
    {
      id: 1,
      title: "Politique de Confidentialité",
      text1: `KADOOR SERVICE s'engage à protéger la vie privée de ses utilisateurs. Les informations personnelles collectées lors de l'utilisation de nos services sont traitées conformément aux réglementations en vigueur.`,
      text2: `Les données recueillies incluent vos nom, prénom, adresse e-mail, numéro de téléphone et informations de paiement. Elles sont utilisées exclusivement pour le traitement de vos réservations et l'amélioration de nos services.`,
    },
    {
      id: 2,
      title: "Conditions d'Utilisation",
      text1: `En utilisant les services de KADOOR SERVICE, vous acceptez les présentes conditions générales d'utilisation. Nous nous réservons le droit de modifier ces conditions à tout moment.`,
      text2: `L'utilisateur s'engage à fournir des informations exactes et à utiliser nos services de manière responsable. Toute utilisation frauduleuse ou abusive pourra entraîner la suspension du compte.`,
    },
    {
      id: 3,
      title: "Conditions de Réservation",
      text1: `Les réservations sont soumises à disponibilité et doivent être confirmées par KADOOR SERVICE. Un acompte peut être requis pour garantir la réservation.`,
      text2: `Les annulations doivent être effectuées au moins 48 heures avant la date prévue. En cas d'annulation tardive, des frais peuvent s'appliquer conformément à notre politique d'annulation.`,
    },
    {
      id: 4,
      title: "Responsabilité",
      text1: `KADOOR SERVICE met tout en œuvre pour garantir la qualité de ses véhicules et appartements. Cependant, notre responsabilité est limitée aux cas de négligence avérée.`,
      text2: `L'utilisateur est responsable de tout dommage causé aux biens loués pendant la durée de la location. Une caution peut être demandée à cet effet.`,
    },
  ];

  const navigationList = [
    { id: 1, anchor: "#confidentialite", name: "Politique de Confidentialité" },
    { id: 2, anchor: "#utilisation", name: "Conditions d'Utilisation" },
    { id: 3, anchor: "#reservation", name: "Conditions de Réservation" },
    { id: 4, anchor: "#responsabilite", name: "Responsabilité" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Main Content */}
      <div className="flex-1">
        <div className="space-y-10">
          {termsContent.map((item) => (
            <div key={item.id} className="p-4 ">
              <h3 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">{item.id}</span>
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{item.text1}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{item.text2}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="w-full lg:w-72 flex-shrink-0">
        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h4>
          <nav className="space-y-2">
            {navigationList.map((item) => (
              <a
                key={item.id}
                href={item.anchor}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TermsCondions;
