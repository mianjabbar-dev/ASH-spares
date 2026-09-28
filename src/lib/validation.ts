import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  sku: z.string().min(1, "SKU is required"),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  vehicle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  price: z.coerce.number().positive("Price must be positive"),
  discountPrice: z.coerce.number().optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  active: z.boolean().default(true),
});

export const supplierSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().default("Pakistan"),
  supplierType: z.enum(["MANUFACTURER", "IMPORTER", "WHOLESALER", "DISTRIBUTOR", "DEALER"]),
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export const discountCodeSchema = z.object({
  code: z.string().min(1, "Code is required"),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.coerce.number().positive("Value must be positive"),
  minOrderAmount: z.coerce.number().optional(),
  maxDiscount: z.coerce.number().optional(),
  startDate: z.coerce.date().optional(),
  expiryDate: z.coerce.date().optional(),
  usageLimit: z.coerce.number().int().optional(),
  active: z.boolean().default(true),
});

export const orderSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(5, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  area: z.string().min(2, "Area is required"),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
  discountCode: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1, "At least one item is required"),
});

export const businessSettingsSchema = z.object({
  businessName: z.string().min(1),
  logoUrl: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedIn: z.string().optional(),
  ceoName: z.string().min(1),
  ceoLinkedInUrl1: z.string().optional(),
  ceoLinkedInUrl2: z.string().optional(),
  address: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  importSource: z.string().min(1),
  aboutText: z.string().optional(),
  maintenanceMode: z.boolean().default(false),
});
