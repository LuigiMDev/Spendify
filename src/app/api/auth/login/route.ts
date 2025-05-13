import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismadb } from "../../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const loginUserSchema = z.object({
  email: z.string().email({ message: "O e-mail é inválido!" }),
  password: z.string().nonempty("A senha é obrigatória!"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginUserSchema.safeParse(body);

    if (!parsed.success) {
      const parsedErrors = parsed.error.errors.map((err) => ({
        message: err.message,
        path: err.path,
      }));

      return NextResponse.json({ parsedErrors }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await prismadb.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Usuário ou senha iválidos!" },
        { status: 401 }
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não definido!");
    }

    const token = jwt.sign({id: user.id}, JWT_SECRET, {
      expiresIn: "30d"
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.json({ message: "Login realizado com sucesso!" }, { status: 200 });
  } catch {}
}
