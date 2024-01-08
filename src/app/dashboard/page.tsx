import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/container";
import { Ticketitem } from "@/app/dashboard/components/ticket";

import { authOptions } from "@/lib/auth";
import prismaCLient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaCLient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "ABERTO",
    },
    include: {
      Customer: true,
    },
  });

  console.log(tickets);

  return (
    <Container>
      <main className="mt-9 mb-2 overflow-hidden h-full">
        <div className="flex items-center justify-between mr-1">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            className="bg-blue-500  text-white rounded ml-1 px-4 py-1 hover:scale-105 duration-300"
            href="/dashboard/new"
          >
            Novo Chamado
          </Link>
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
              <>
                <Ticketitem
                  key={ticket.id}
                  customer={ticket.Customer}
                  ticket={ticket}
                />
              </>
            ))}
          </tbody>
        </table>
      </main>
    </Container>
  );
}
