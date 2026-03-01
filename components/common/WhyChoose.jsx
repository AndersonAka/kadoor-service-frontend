import { useTranslations } from 'next-intl';

const WhyChoose = ({ style = "" }) => {
  const t = useTranslations('HomePage');

  const whyChooseContent = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: t('why_choose_1_title'),
      description: t('why_choose_1_desc'),
      color: 'from-primary to-red-400',
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t('why_choose_2_title'),
      description: t('why_choose_2_desc'),
      color: 'from-primary-700 to-primary-400',
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('why_choose_3_title'),
      description: t('why_choose_3_desc'),
      color: 'from-amber-500 to-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {whyChooseContent.map((item) => (
        <div 
          key={item.id} 
          className="group bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WhyChoose;
