'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Check, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
// import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMealSchema } from './addMealValidationSchema';
import { addMenu } from '@/services/Menus';
import { toast } from 'sonner';

const AddMealDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const availableTags = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'dairy-free',
    'high-protein',
    'low-carb',
    'spicy',
    'organic',
  ];

  const cuisineOptions = [
    'Italian',
    'Mexican',
    'Chinese',
    'Japanese',
    'Indian',
    'Thai',
    'Mediterranean',
    'American',
    'French',
    'Vegetarian',
    'Healthy',
  ];

  const mealTypeOptions = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'];

  // Initialize React Hook Form
  interface IMeal {
    name: string;
    description: string;
    cuisineSpecialties: string[];
    price: string;
    experience: string;
    imageUrl: string;
    category: string;
    mealTypes: string[];
    dietaryTags: string[];
  }

  const form = useForm<IMeal>({
    defaultValues: {
      name: '',
      description: '',
      price: '0',
      category: '',
      dietaryTags: [],
      cuisineSpecialties: [],
      mealTypes: [],
      experience: '0',
      imageUrl: '',
    },
    resolver: zodResolver(createMealSchema),
  });

  const onSubmit: SubmitHandler<IMeal> = async data => {
    const modifiedData = {
      ...data,
      experience: Number(data.experience),
      price: Number(data.price),
    };
    try {
      const res = await addMenu(modifiedData);
      if (res?.success) {
        toast.success(res?.message);
        setIsDialogOpen(false);
        form.reset();
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add New Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
          <DialogDescription>Fill in the details for your new meal offering</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">
                          Meal Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            placeholder="e.g. Vegetable Stir Fry"
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="price">
                          Price ($) <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="price"
                            placeholder="12.99"
                            type="number"
                            step="0.01"
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">
                        Description <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Describe the ingredients and meal details"
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="breakfast">Breakfast</SelectItem>
                              <SelectItem value="lunch">Lunch</SelectItem>
                              <SelectItem value="dinner">Dinner</SelectItem>
                              <SelectItem value="dessert">Dessert</SelectItem>
                              <SelectItem value="sides">Sides</SelectItem>
                              <SelectItem value="drinks">Drinks</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="experience">Experience (years)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="experience"
                            type="number"
                            min="0"
                            placeholder="Experience in years"
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="imageUrl"
                          placeholder="Image URL"
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="cuisineSpecialties"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Cuisine Specialties <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {cuisineOptions.map(cuisine => (
                            <Badge
                              key={cuisine}
                              variant={field.value?.includes(cuisine) ? 'default' : 'outline'}
                              className={`cursor-pointer ${
                                field.value?.includes(cuisine) ? 'bg-orange-500' : ''
                              }`}
                              onClick={() => {
                                const currentValues = field.value || [];
                                if (currentValues.includes(cuisine)) {
                                  field.onChange(
                                    currentValues.filter((c: string) => c !== cuisine)
                                  );
                                } else {
                                  field.onChange([...currentValues, cuisine]);
                                }
                              }}
                            >
                              {cuisine}
                              {field.value?.includes(cuisine) && <Check className="ml-1 h-3 w-3" />}
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="mealTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Available Meal Types <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {mealTypeOptions.map(mealType => (
                            <Badge
                              key={mealType}
                              variant={field.value?.includes(mealType) ? 'default' : 'outline'}
                              className={`cursor-pointer ${
                                field.value?.includes(mealType) ? 'bg-orange-500' : ''
                              }`}
                              onClick={() => {
                                const currentValues = field.value || [];
                                if (currentValues.includes(mealType)) {
                                  field.onChange(
                                    currentValues.filter((type: string) => type !== mealType)
                                  );
                                } else {
                                  field.onChange([...currentValues, mealType]);
                                }
                              }}
                            >
                              {mealType}
                              {field.value?.includes(mealType) && (
                                <Check className="ml-1 h-3 w-3" />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="dietaryTags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Tags</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {availableTags.map(tag => (
                            <Badge
                              key={tag}
                              variant={field.value?.includes(tag) ? 'default' : 'outline'}
                              className={`cursor-pointer ${
                                field.value?.includes(tag) ? 'bg-orange-500' : ''
                              }`}
                              onClick={() => {
                                const currentValues = field.value || [];
                                if (currentValues.includes(tag)) {
                                  field.onChange(currentValues.filter((t: string) => t !== tag));
                                } else {
                                  field.onChange([...currentValues, tag]);
                                }
                              }}
                            >
                              {tag}
                              {field.value?.includes(tag) && <Check className="ml-1 h-3 w-3" />}
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                Add to Menu
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealDialog;
