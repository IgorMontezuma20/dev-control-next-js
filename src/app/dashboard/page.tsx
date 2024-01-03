import { Container } from "@/components/container";
import { Ticketitem } from "@/app/dashboard/components/ticket";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="mt-9 mb-2 overflow-hidden h-full">
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            className="bg-blue-500 px-4 py-1 rounded text-white"
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
            <Ticketitem />
            <Ticketitem />
          </tbody>
        </table>
      </main>
    </Container>
  );
}
