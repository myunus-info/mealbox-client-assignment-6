/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Utensils } from 'lucide-react';

import { toast } from 'sonner';
import { updateCustomerProfile } from '@/services/Profile';

const CustomerProfile = ({ profile }: { profile: { name: string; email: string } }) => {
  const form = useForm({
    defaultValues: {
      name: profile?.name || '',
      email: profile?.email || '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    try {
      const res = await updateCustomerProfile(data);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Customer Profile</h1>
        <p className="text-muted-foreground">Manage your profile information</p>
      </div>

      <div className="border-2 border-gray-200 rounded-xl p-5 max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center space-x-4 mb-5">
              <Utensils className="h-6 w-6 text-orange-500" />
              <h1 className="text-xl font-bold">Edit Profile</h1>
            </div>

            {/* Basic Information Section */}
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-orange-500 font-bold text-xl">Basic Information</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              Save Profile Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CustomerProfile;
