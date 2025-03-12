import { z } from 'zod';

export const createMealSchema = z.object({
  name: z.string().min(1, 'Meal name is required'),
  description: z.string().min(1, 'Description is required'),
  cuisineSpecialties: z.array(z.string()).min(1, 'At least one cuisine specialty is required'),
  price: z.string().min(1, 'Price is required'),
  experience: z.string().min(1, 'Experience is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
  mealTypes: z.array(z.string()).min(1, 'At least one meal type is required'),
  dietaryTags: z.array(z.string()).min(1, 'At least one dietary tag is required'),
});
