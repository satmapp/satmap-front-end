import { z } from "zod"

export const addBusinessSchema = z.object({
  businessName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters"),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country cannot exceed 100 characters"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number")
    .min(8, "Phone must be at least 8 digits")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
  category: z.enum(
    ["restaurant", "cafe", "hotel", "shop", "service", "other"],
    { message: "You must select a category" }
  ),
  paymentMethod: z.enum(
    ["lightning", "onchain", "contactless"],
    { message: "You must select a payment method" }
  ),
})

export type AddBusinessFormData = z.infer<typeof addBusinessSchema>

