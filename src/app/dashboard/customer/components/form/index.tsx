"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { Input } from "@/components/input";
import { api } from "@/lib/api";

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
      message: "O número de telefone deve conter 11 dígitos!",
    }
  ),

  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleCustomerRegister(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId,
    });

    router.replace("/dashboard/customer");
    router.refresh();
  }

  return (
    <>
      <form
        className="flex flex-col mt-6"
        onSubmit={handleSubmit(handleCustomerRegister)}
      >
        <label className="mb-1 text-lg font-medium">Nome Completo</label>
        <Input
          type="text"
          name="name"
          placeholder="Informe seu nome completo..."
          error={errors.name?.message}
          register={register}
        />
        <section className="flex flex-col sm:flex-row my-2 gap-2">
          <div className="flex-1">
            <label className="mb-1 text-lg font-medium">Telefone: </label>
            <Input
              type="text"
              name="phone"
              placeholder="EX: (99) 99999-9999"
              error={errors.phone?.message}
              register={register}
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 text-lg font-medium">Email: </label>
            <Input
              type="email"
              name="email"
              placeholder="Informe seu email..."
              error={errors.email?.message}
              register={register}
            />
          </div>
        </section>

        <label className="mb-1 text-lg font-medium">Endereço: </label>
        <Input
          type="text"
          name="address"
          placeholder="Informe seu endereço..."
          error={errors.address?.message}
          register={register}
        />

        <button
          className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:scale-105 duration-300"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
