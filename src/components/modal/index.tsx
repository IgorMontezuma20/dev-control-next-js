"use client";

import { useRef, useContext, MouseEvent } from "react";

import { ModalContext } from "@/providers/modal";

export function TicketModal() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <section
      className="absolute bg-gray-900/80 w-full min-h-screen"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do chamado
            </h1>
            <button
              className="bg-red-500 p-1 px-2 text-white rounded hover:scale-105 duration-300"
              onClick={handleModalVisible}
            >
              Fechar
            </button>
          </div>
          <div className="flex flex-col flex-wrap gap- mb-2">
            <div className="flex">
              <h2 className="font-bold ">Nome:</h2>
              <p className="ml-2">{ticket?.ticket.name}</p>

              <h2 className="font-bold ml-40 hidden sm:block">Data:</h2>
              <p className="ml-2 hidden sm:block">
                {ticket?.ticket.created_at &&
                  ticket?.ticket.created_at.toLocaleDateString("pt-br")}
              </p>
            </div>
            <div className="flex flex-wrap flex-col gap-1 mb-2 mt-2">
              <h2 className="font-bold">Descrição</h2>
              <p>{ticket?.ticket.description}</p>
            </div>
            <div className="w-full border-b-[1.5px] my-4"></div>
            <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>
          </div>
          <div className="flex flex-wrap gap- mb-2">
            <h2 className="font-bold ">Cliente:</h2>
            <p className="ml-2">{ticket?.customer?.name}</p>
          </div>
          <div className="flex flex-wrap gap- mb-2">
            <h2 className="font-bold ">Telefone:</h2>
            <p className="ml-2">{ticket?.customer?.phone}</p>
          </div>
          <div className="flex flex-wrap gap- mb-2">
            <h2 className="font-bold ">Email:</h2>
            <p className="ml-2">{ticket?.customer?.email}</p>
          </div>
          {ticket?.customer?.address && (
            <>
              <div className="flex flex-wrap gap- mb-2">
                <h2 className="font-bold ">Endereço:</h2>
                <p className="ml-2">{ticket?.customer?.address}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
