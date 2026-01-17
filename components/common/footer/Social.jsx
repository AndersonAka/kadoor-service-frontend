const Social = () => {
  const socialContent = [
    { 
      id: 1, 
      liveLink: "https://www.facebook.com/share/1F9RB2m8P9/?mibextid=wwXIfr", 
      icon: "fa-facebook",
      label: "Facebook"
    },
    { 
      id: 2, 
      liveLink: "https://wa.me/2250716673212", 
      icon: "fa-whatsapp",
      label: "WhatsApp",
      // Fallback si fa-whatsapp n'est pas disponible dans Font Awesome 4.x
      fallbackIcon: "fa-phone"
    },
    { 
      id: 3, 
      liveLink: "https://www.instagram.com/kadoorservice", 
      icon: "fa-instagram",
      label: "Instagram"
    },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <li className="list-inline-item" key={item.id}>
          <a 
            href={item.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={item.label}
            title={item.label}
          >
            <i className={`fa ${item.icon}`}></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default Social;
