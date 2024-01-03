"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, "O campo nome é obrigatório!").max(255),
  email: z
    .string()
    .email("Informe um email válido!")
    .min(1, "O campo email é obrigatório!")
    .max(255),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    {
      message: "O númeero de telefone deve conter 11 dígitos!",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <form>
        <label>Nome Completo</label>
        <input type="text" placeholder="Informe o nome completo..." />
      </form>
    </>
  );
}
