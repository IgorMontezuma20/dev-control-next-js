"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";

import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiFile, FiCheckSquare } from "react-icons/fi";

import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, handleTicketInfo } = useContext(ModalContext);

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

  function handleOpenModal() {
    handleModalVisible();
    handleTicketInfo({
      customer: customer,
      ticket: ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16  last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {ticket?.created_at?.toLocaleDateString("pt-br")}
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
          <button onClick={handleOpenModal}>
            <FiFile size="24" color="#3f84e6" />
          </button>
        </td>
      </tr>
    </>
  );
}
