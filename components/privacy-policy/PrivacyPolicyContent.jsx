import Link from "next/link";

const PrivacyPolicyContent = () => {
  const privacyContent = [
    {
      id: 1,
      title: "Collecte d'informations",
      text1: `KADOOR SERVICE collecte des informations personnelles lorsque vous utilisez nos services, notamment lors de la création d'un compte, de la réservation d'un véhicule ou d'un appartement, ou lors de l'utilisation de nos services.`,
      text2: `Les informations collectées peuvent inclure votre nom, adresse e-mail, numéro de téléphone, adresse postale, informations de paiement et autres informations nécessaires pour fournir nos services.`,
    },
    {
      id: 2,
      title: "Utilisation des informations",
      text1: `Nous utilisons les informations collectées pour fournir, maintenir et améliorer nos services, traiter vos transactions, communiquer avec vous, et personnaliser votre expérience.`,
      text2: `Vos informations peuvent être utilisées pour vous envoyer des notifications importantes concernant vos réservations, des mises à jour sur nos services, et des communications marketing (avec votre consentement).`,
    },
    {
      id: 3,
      title: "Protection des données",
      text1: `KADOOR SERVICE met en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, la modification, la divulgation ou la destruction.`,
      text2: `Nous utilisons des technologies de cryptage et des protocoles de sécurité pour protéger vos données lors de leur transmission et de leur stockage.`,
    },
    {
      id: 4,
      title: "Partage des informations",
      text1: `Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations uniquement dans les cas suivants : avec votre consentement, pour fournir nos services, pour se conformer à la loi, ou pour protéger nos droits.`,
      text2: `Nous pouvons partager des informations agrégées et anonymisées avec des partenaires pour améliorer nos services.`,
    },
    {
      id: 5,
      title: "Vos droits",
      text1: `Vous avez le droit d'accéder, de modifier, de supprimer ou de limiter l'utilisation de vos informations personnelles. Vous pouvez également vous opposer au traitement de vos données ou demander la portabilité de vos données.`,
      text2: `Pour exercer ces droits, veuillez nous contacter à l'adresse kadoorserviceci@gmail.com.`,
    },
  ];

  const navigationList = [
    { id: 1, routeLink: "#collecte", name: "Collecte d'informations" },
    { id: 2, routeLink: "#utilisation", name: "Utilisation des informations" },
    { id: 3, routeLink: "#protection", name: "Protection des données" },
    { id: 4, routeLink: "#partage", name: "Partage des informations" },
    { id: 5, routeLink: "#droits", name: "Vos droits" },
  ];

  return (
    <div className="row">
      <div className="col-lg-8 col-xl-8">
        <div className="terms_condition_grid">
          {privacyContent.map((item) => (
            <div key={item.id} className="grid_item mb50" id={item.id === 1 ? "collecte" : item.id === 2 ? "utilisation" : item.id === 3 ? "protection" : item.id === 4 ? "partage" : "droits"}>
              <h4 className="title">{item.title}</h4>
              <p className="para">{item.text1}</p>
              <p className="para">{item.text2}</p>
            </div>
          ))}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-4">
        <div className="terms_condition_widget">
          <div className="terms_condition_list">
            <h4 className="title">Navigation</h4>
            <ul className="list">
              {navigationList.map((item) => (
                <li key={item.id}>
                  <Link href={item.routeLink}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default PrivacyPolicyContent;
