import Link from "next/link";

import { Container } from "@/components/container";

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4">
        <Link
          className="text-white hover:font-bold hover:text-blue-400 duration-300"
          href="/dashboard"
        >
          Chamados
        </Link>
        <Link
          className="text-white hover:font-bold hover:text-blue-400 duration-300"
          href="/dashboard/customer"
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
}
