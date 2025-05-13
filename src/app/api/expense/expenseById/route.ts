import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";

export async function DELETE(req: NextRequest) {
  try {
    const { id }: { id: string } = await req.json();

    await prismadb.expense.delete({ where: { id } });

    return NextResponse.json({ message: "Gasto excluído com sucesso!" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Ocorreu um erro ao excluir o gasto!" }, { status: 500 });
  }
}
