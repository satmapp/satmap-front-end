import { z } from "zod"

export const addBusinessSchema = z.object({
  businessName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(200, "La dirección no puede exceder 200 caracteres"),
  city: z
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres"),
  country: z
    .string()
    .min(2, "El país debe tener al menos 2 caracteres")
    .max(100, "El país no puede exceder 100 caracteres"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, "Número de teléfono inválido")
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("URL inválida")
    .optional()
    .or(z.literal("")),
  category: z.enum(
    ["restaurant", "cafe", "hotel", "shop", "service", "other"],
    {
      required_error: "Debes seleccionar una categoría",
    }
  ),
  paymentMethod: z.enum(
    ["lightning", "onchain", "contactless"],
    {
      required_error: "Debes seleccionar un método de pago",
    }
  ),
})

export type AddBusinessFormData = z.infer<typeof addBusinessSchema>

