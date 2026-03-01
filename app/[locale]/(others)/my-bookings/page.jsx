import Bookings from "@/components/bookings";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  const title = locale === 'fr' ? 'Mes Réservations' : 'My Bookings';
  const description = locale === 'fr' ? 'Consultez vos réservations' : 'View your bookings';
  
  return {
    title: `${title} | KADOOR SERVICE`,
    description: description,
  };
}

const MyBookingsPage = () => {
  return (
    <>
      <Bookings />
    </>
  );
};

export default MyBookingsPage;
