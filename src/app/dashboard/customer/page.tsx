import { Container } from "@/components/container";
import { CardCustomer } from "./components/card";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Customer() {
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
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <Link
            className="bg-blue-500 text-white rounded px-4 py-1 hover:scale-105 duration-300"
            href="/dashboard/customer/new"
          >
            Novo Cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2 gap-3">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>

        {!customers.length && (
          <div className="flex items-center justify-center mt-4">
            <p className="text-xl text-gray-600">Nenhum cliente cadastrado</p>
          </div>
        )}
      </main>
    </Container>
  );
}
