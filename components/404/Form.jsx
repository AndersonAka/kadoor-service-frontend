import { useTranslations } from 'next-intl';

const Form = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <form className="form-inline mailchimp_form">
      <label className="sr-only" htmlFor="inlineFormInputName">
        {t('search_placeholder')}
      </label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        id="inlineFormInputName"
        placeholder={t('search_placeholder')}
      />
      <button type="submit" className="btn btn-primary mb-2">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default Form;
