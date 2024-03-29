import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/container";
import { TicketItem } from "@/app/dashboard/components/ticket";
import { RefreshButton } from "./components/refreshButton";

import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2 overflow-hidden h-full">
        <div className="flex items-center justify-between mr-1">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center gap-4">
            <RefreshButton />
            <Link
              className="bg-blue-500  text-white rounded ml-1 px-4 py-1 hover:scale-105 duration-300"
              href="/dashboard/new"
            >
              Novo Chamado
            </Link>
          </div>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                CADASTRO
              </th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                customer={ticket.customer}
                ticket={ticket}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <>
            <h1 className="px-2  text-gray-600">Nenhum chamado aberto</h1>
          </>
        )}
      </main>
    </Container>
  );
}
