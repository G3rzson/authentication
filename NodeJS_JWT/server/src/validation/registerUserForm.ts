import z from "zod";

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Felhasználónév megadása kötelező!" })
    .max(50, { message: "Túl hosszú felhasználónév!" })
    .trim(),

  email: z
    .string()
    .nonempty({ message: "E-mail cím megadása kötelező!" })
    .email({ message: "Hibás e-mail cím!" })
    .trim(),

  password: z
    .string()
    .min(4, { message: "Jelszó minimum 4 karakter hosszú legyen!" })
    .max(50, { message: "Jelszó maximum 50 karakter hosszú legyen!" })
    .trim(),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
