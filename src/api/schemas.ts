import { z } from 'zod';

export const restaurantItemSchema = z.object({
  id: z.string(),
  restaurantName: z.string(),
  shortDesc: z.string(),
  currency: z.string(),
  deliveryCost: z.number(),
  rating: z.number(),
  minOrder: z.number(),
  deliveryTime: z.string(),
  speciality: z.string().optional(),
  imageUrl: z.string(),
});
export const apiErrorSchema = z.object({
  data: z.object({
    error: z.string().optional(),
    message: z.string().optional(),
  }),
});
export const cuisineGroupSchema = z.object({
  open: z.array(restaurantItemSchema),
  close: z.array(restaurantItemSchema),
});

export const cuisinesApiResponseSchema = z.record(z.string(), cuisineGroupSchema);

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const loginResponseSchema = z.object({
  message: z.string(),
  userId: z.number(),
});
