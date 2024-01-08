import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiTrash, FiFile } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function Ticketitem({ ticket, customer }: TicketItemProps) {
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
          <button className="mr-2">
            <FiTrash size="24" color="#EF4444" />
          </button>
          <button>
            <FiFile size="24" color="#3f84e6" />
          </button>
        </td>
      </tr>
    </>
  );
}
