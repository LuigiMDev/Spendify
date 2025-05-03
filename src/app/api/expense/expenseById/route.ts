import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";

export async function DELETE(req: NextRequest) {
  try {
    const { id }: { id: string } = await req.json();

    await prismadb.expense.delete({ where: { id } });

    return NextResponse.json({ message: "de boa" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "não deu boa" }, { status: 500 });
  }
}
