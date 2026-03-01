const PrivacyPolicyContent = () => {
  const privacyContent = [
    {
      id: 1,
      anchor: "collecte",
      title: "Collecte d'informations",
      text1: `KADOOR SERVICE collecte des informations personnelles lorsque vous utilisez nos services, notamment lors de la création d'un compte, de la réservation d'un véhicule ou d'un appartement, ou lors de l'utilisation de nos services.`,
      text2: `Les informations collectées peuvent inclure votre nom, adresse e-mail, numéro de téléphone, adresse postale, informations de paiement et autres informations nécessaires pour fournir nos services.`,
    },
    {
      id: 2,
      anchor: "utilisation",
      title: "Utilisation des informations",
      text1: `Nous utilisons les informations collectées pour fournir, maintenir et améliorer nos services, traiter vos transactions, communiquer avec vous, et personnaliser votre expérience.`,
      text2: `Vos informations peuvent être utilisées pour vous envoyer des notifications importantes concernant vos réservations, des mises à jour sur nos services, et des communications marketing (avec votre consentement).`,
    },
    {
      id: 3,
      anchor: "protection",
      title: "Protection des données",
      text1: `KADOOR SERVICE met en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.`,
      text2: `Nous utilisons des technologies de cryptage et des protocoles de sécurité pour protéger vos données lors de leur transmission et de leur stockage.`,
    },
    {
      id: 4,
      anchor: "partage",
      title: "Partage des informations",
      text1: `Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations uniquement dans les cas suivants : avec votre consentement, pour fournir nos services, pour se conformer à la loi, ou pour protéger nos droits.`,
      text2: `Nous pouvons partager des informations agrégées et anonymisées avec des partenaires pour améliorer nos services.`,
    },
    {
      id: 5,
      anchor: "droits",
      title: "Vos droits",
      text1: `Vous avez le droit d'accéder, de modifier, de supprimer ou de limiter l'utilisation de vos informations personnelles. Vous pouvez également vous opposer au traitement de vos données ou demander la portabilité de vos données.`,
      text2: `Pour exercer ces droits, veuillez nous contacter à l'adresse kadoorserviceci@gmail.com.`,
    },
  ];

  const navigationList = [
    { id: 1, anchor: "#collecte", name: "Collecte d'informations" },
    { id: 2, anchor: "#utilisation", name: "Utilisation des informations" },
    { id: 3, anchor: "#protection", name: "Protection des données" },
    { id: 4, anchor: "#partage", name: "Partage des informations" },
    { id: 5, anchor: "#droits", name: "Vos droits" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Main Content */}
      <div className="flex-1">
        <div className="space-y-10">
          {privacyContent.map((item) => (
            <div key={item.id} id={item.anchor} className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">{item.id}</span>
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">{item.text1}</p>
              <p className="text-gray-600 leading-relaxed">{item.text2}</p>
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

export default PrivacyPolicyContent;
