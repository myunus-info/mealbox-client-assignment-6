import ProviderProfile from '@/components/modules/porviderProfile/ProviderProfile';
import { getProviderProfile } from '@/services/Profile';

export default async function ProvidersProfile() {
  const profile = await getProviderProfile();

  return (
    <div>
      <ProviderProfile profile={profile?.data} />
    </div>
  );
}
