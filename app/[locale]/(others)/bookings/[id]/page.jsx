import BookingDetails from "@/components/bookings/BookingDetails";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  const title = locale === 'fr' ? 'Détails de la réservation' : 'Booking Details';
  const description = locale === 'fr' ? 'Consultez les détails de votre réservation' : 'View your booking details';
  
  return {
    title: `${title} | KADOOR SERVICE`,
    description: description,
  };
}

const BookingDetailsPage = () => {
  return (
    <>
      <BookingDetails />
    </>
  );
};

export default BookingDetailsPage;
