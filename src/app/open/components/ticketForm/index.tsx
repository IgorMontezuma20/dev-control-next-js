"use client";

import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório!"),
  description: z.string().min(1, "Descreva seu problema..."),
});

type FormData = z.infer<typeof schema>;

interface TicketFormProps {
  customer: CustomerDataInfo;
}

export function TicketForm({ customer }: TicketFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleTicketRegister(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
  }

  return (
    <>
      <form
        className="bg-slate-200 mt-6 px-4 py-6 rounded border-2"
        onSubmit={handleSubmit(handleTicketRegister)}
      >
        <label className="mb-1 font-medium text-lg">Nome do chamado:</label>
        <Input
          register={register}
          type="text"
          placeholder="Nome do chamado"
          name="name"
        />
        {errors.name?.message && (
          <p className="text-red-500 mt-1 mb-4">{errors.name.message}</p>
        )}

        <label className="mb-1 pt-6 font-medium text-lg">
          Descreva o problema:
        </label>
        <textarea
          className="w-full border-2 rounded-md h-24 mt-2 resize-none px-2"
          placeholder="Descreva o seu problema..."
          id="description"
          {...register("description")}
        ></textarea>
        {errors.description?.message && (
          <p className="text-red-500 mt-1 mb-4">{errors.description.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 w-full h-11 px-2 text-white font-bold rounded-md hover:scale-105 duration-300"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}
