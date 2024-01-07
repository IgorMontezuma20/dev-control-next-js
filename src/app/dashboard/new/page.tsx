import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <Container>
        <main className="mt-9 mb-2">
          <div className="flex items-center gap-3">
            <Link
              className="text-white px-4 py-1 rounded bg-gray-900"
              href="/dashboard"
            >
              Voltar
            </Link>
            <h1 className="text-3xl font-bold">Novo Chamado</h1>
          </div>

          <form className="flex flex-col mt-6">
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <input
              className="w-full border-2 rounded-md px-2 mb-2 h-11"
              type="text"
              placeholder="Informe o nome do chamado..."
              required
            />
            <label className="mb-1 font-medium text-lg">
              Descreva o problema
            </label>
            <textarea
              className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
              placeholder="Descreva o problema..."
              required
            ></textarea>
            {customers.length !== 0 && (
              <>
                <label className="mb-1 font-medium text-lg">
                  Informe o cliente
                </label>
                <select className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white">
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            {customers.length === 0 && (
              <>
                <h2 className="mb-1 font-medium text-gray-500">
                  Você ainda não possui clientes cadastrados.
                  <Link href="/dashboard/customer/new">
                    <span className="px-1 text-blue-500 font-medium hover:text-blue-700 duration-300">
                      Cadastrar cliente
                    </span>
                  </Link>
                </h2>
              </>
            )}

            <button
              className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={customers.length === 0}
            >
              Cadastrar
            </button>
          </form>
        </main>
      </Container>
    </>
  );
}
