import * as z from "zod";

// SCHEMA DEFINITION
export const itemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "errors.required" })
    .max(50, { message: "errors.too_long" }),

  amount: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "errors.invalid_number",
    })
    .refine((val) => val > 0, {
      message: "errors.min_value",
    }),
});

// TYPES
export type ItemFormData = z.infer<typeof itemSchema>;
