import * as z from "zod";

export const itemSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Назва обов'язкова")
    .max(50, "Назва занадто довга"),

  amount: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "Обов'язково",
    })
    .refine((val) => val > 0, {
      message: "Має бути більше 0",
    }),
});

export type ItemFormData = z.infer<typeof itemSchema>;
