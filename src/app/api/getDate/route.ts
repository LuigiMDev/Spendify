import { getDate } from "@/app/helpers/getDate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { dueDateOption, paymentDateOption } = await getDate();

    return NextResponse.json(
      { dueDateOption, paymentDateOption },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Ocorreu um erro ao recuperar as datas!" },
      { status: 500 }
    );
  }
}
