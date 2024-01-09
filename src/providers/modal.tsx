"use client";

import { createContext, ReactNode, useState } from "react";

import { TicketProps } from "@/utils/ticket.type";
import { CustomerProps } from "@/utils/customer.type";

import { TicketModal } from "@/components/modal";

interface ModalContextData {
  visible: boolean;
  ticket: TicketInfo | undefined;
  handleModalVisible: () => void;
  handleTicketInfo: (details: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function handleTicketInfo(details: TicketInfo) {
    setTicket(details);
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, handleTicketInfo }}
    >
      {visible && <TicketModal />}
      {children}
    </ModalContext.Provider>
  );
};
