import Profile from "@/components/profile";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  // Utiliser des valeurs par défaut pour éviter les erreurs si les traductions ne sont pas encore disponibles
  const title = locale === 'fr' ? 'Mon Profil' : 'My Profile';
  const description = locale === 'fr' ? 'Gérez votre profil utilisateur' : 'Manage your user profile';
  
  return {
    title: `${title} | KADOOR SERVICE`,
    description: description,
  };
}

const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
