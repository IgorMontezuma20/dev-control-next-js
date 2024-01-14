"use client";

import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/input";
import { TicketForm } from "./components/ticketForm";
import { api } from "@/lib/api";

import { FiSearch, FiX } from "react-icons/fi";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

const schema = z.object({
  email: z
    .string()
    .email("Informe o email do cliente para que ele seja encontrado.")
    .min(1, "O campo email é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    });

    if (response.data === null) {
      setError("email", {
        type: "custom",
        message: "Ops! CLiente não encontrado.",
      });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>
      <main className="flex- flex-col mt-4 mb-2">
        {customer ? (
          <div className="flex items-center justify-between bg-slate-200 py-6 px-4 rounded border-2">
            <p className="text-lg">
              <strong>Cliente selecionado: {customer.name} </strong>
            </p>
            <button
              className="flex items-center justify-center h-11 px-2 rounded hover:scale-125 duration-300"
              onClick={handleClearCustomer}
            >
              <FiX size={30} color="#ff2929" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-200 py-6 px-2 rounded border-2"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                name="email"
                placeholder="Informe o email do cliente..."
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="flex flex-row md:pl-60 px-2 h-11 items-center justify-between text-white font-bold rounded bg-blue-500 hover:scale-105 duration-300"
              >
                Buscar cliente
                <FiSearch size={24} color="#FFF" />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <TicketForm customer={customer} />}
      </main>
    </div>
  );
}
