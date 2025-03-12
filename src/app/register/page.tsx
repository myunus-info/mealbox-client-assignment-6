import CustomerRegisterForm from '@/components/modules/auth/register/CustomerRegisterForm';
import ProviderRegisterForm from '@/components/modules/auth/register/ProviderRegisterForm';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Register() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Tabs defaultValue="customer">
        <TabsList className="grid w-[450px] grid-cols-2">
          <TabsTrigger value="customer">Register as customer</TabsTrigger>
          <TabsTrigger value="provider">Register as provider</TabsTrigger>
        </TabsList>
        <TabsContent value="customer">
          <CustomerRegisterForm />
        </TabsContent>
        <TabsContent value="provider">
          <ProviderRegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
