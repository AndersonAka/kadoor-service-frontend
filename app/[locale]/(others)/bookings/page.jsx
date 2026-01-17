import Bookings from "@/components/bookings";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  // Utiliser des valeurs par défaut pour éviter les erreurs si les traductions ne sont pas encore disponibles
  const title = locale === 'fr' ? 'Mes Réservations' : 'My Bookings';
  const description = locale === 'fr' ? 'Consultez vos réservations' : 'View your bookings';
  
  return {
    title: `${title} | KADOOR SERVICE`,
    description: description,
  };
}

const BookingsPage = () => {
  return (
    <>
      <Bookings />
    </>
  );
};

export default BookingsPage;
