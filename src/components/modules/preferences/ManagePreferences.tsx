'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Form schema with Zod
const preferencesSchema = z.object({
  dietaryRestrictions: z.array(z.string()).optional(),
  preferredCuisines: z.array(z.string()).optional(),
  portionSize: z.string().min(1, 'Please select a portion size'),
});

type PreferencesForm = z.infer<typeof preferencesSchema>;

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
];

const cuisineOptions = [
  { id: 'italian', label: 'Italian' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'indian', label: 'Indian' },
];

const portionOptions = ['Small', 'Medium', 'Large'];

export default function ManagePreferences() {

  const form = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      dietaryRestrictions: [],
      preferredCuisines: [],
      portionSize: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data: PreferencesForm) => {
    if (
      data?.dietaryRestrictions?.length &&
      data?.dietaryRestrictions?.length > 0 &&
      data?.preferredCuisines?.length &&
      data?.preferredCuisines?.length > 0 &&
      data.portionSize
    ) {
      toast.success('Preference added successfully!');
      form.reset();
    } else {
      toast.error('Please fill in the form first');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Preferences</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dietary Restrictions */}
          <FormField
            control={form.control}
            name="dietaryRestrictions"
            render={() => (
              <FormItem>
                <FormLabel className="text-gray-700">Dietary Restrictions</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {dietaryOptions.map(option => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="dietaryRestrictions"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={checked => {
                                const newValue = checked
                                  ? [...(field.value || []), option.id]
                                  : field.value?.filter(val => val !== option.id);
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm text-gray-600">{option.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Cuisines */}
          <FormField
            control={form.control}
            name="preferredCuisines"
            render={() => (
              <FormItem>
                <FormLabel className="text-gray-700">Preferred Cuisines</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {cuisineOptions.map(option => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="preferredCuisines"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={checked => {
                                const newValue = checked
                                  ? [...(field.value || []), option.id]
                                  : field.value?.filter(val => val !== option.id);
                                field.onChange(newValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm text-gray-600">{option.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Portion Size */}
          <FormField
            control={form.control}
            name="portionSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Portion Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select portion size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {portionOptions.map(size => (
                      <SelectItem key={size} value={size.toLowerCase()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
          Save Preferences
          </Button>
        </form>
      </Form>
    </div>
  );
}
