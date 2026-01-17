import { useTranslations } from 'next-intl';

const WhyChoose = ({ style = "" }) => {
  const t = useTranslations('HomePage');

  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: t('why_choose_1_title'),
      descriptions: t('why_choose_1_desc'),
    },
    {
      id: 2,
      icon: "flaticon-home-1",
      title: t('why_choose_2_title'),
      descriptions: t('why_choose_2_desc'),
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: t('why_choose_3_title'),
      descriptions: t('why_choose_3_desc'),
    },
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
