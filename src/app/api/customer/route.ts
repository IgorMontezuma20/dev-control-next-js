import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { userId, name, email, phone, address } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create a new customer" },
      { status: 400 }
    );
  }
}

export async function GET(request: Request){
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

if(!customerEmail || customerEmail === ""){
  return NextResponse.json(
    { error: "Customer not found" },
    { status: 400 }
  );
}

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Customer not found" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId as string,
    },
  });

  if(findTickets) {
    return NextResponse.json({ error: "Erro ao remover cliente, pois há chamados associados ao mesmo." }, { status: 400 });
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso!" });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 400 });
  }
}
