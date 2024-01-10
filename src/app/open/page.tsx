"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/input";

import { FiSearch } from "react-icons/fi";

const schema = z.object({
  email: z
    .string()
    .email("Informe o email do cliente.")
    .min(1, "O campo email é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>({
    id: "1",
    name: "Igor",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>
      <main className="flex- flex-col mt-4 mb-2">
        {customer ? (
          <div></div>
        ) : (
          <form className="bg-slate-200 py-6 px-2 rounded border-2">
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                name="email"
                placeholder="Informe o email do cliente..."
                error={errors.email?.message}
                register={register}
              />

              <button className="flex flex-row md:pl-60 px-2 h-11 items-center justify-between text-white font-bold rounded bg-blue-500 hover:scale-105 duration-300">
                Buscar cliente
                <FiSearch size={24} color="#FFF" />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
