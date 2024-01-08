"use client";

import { useRouter } from "next/navigation";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiTrash, FiFile, FiCheckSquare } from "react-icons/fi";

import { api } from "@/lib/api";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function Ticketitem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();

  async function handleUpdateStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16  last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket?.createdAt?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded text-white">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3" onClick={handleUpdateStatus}>
            <FiCheckSquare size="24" color="#747272" />
          </button>
          <button>
            <FiFile size="24" color="#3f84e6" />
          </button>
        </td>
      </tr>
    </>
  );
}
