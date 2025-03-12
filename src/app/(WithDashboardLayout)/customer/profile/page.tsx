import CustomerProfile from '@/components/modules/customerProfile/CustomerProfile';
import { getCustomerProfile } from '@/services/Profile';

export default async function CustomerProfilePage() {
  const profile = await getCustomerProfile();
  return (
    <div>
      <CustomerProfile profile={profile?.data} />
    </div>
  );
}
