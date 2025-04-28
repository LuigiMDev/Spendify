import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { z } from "zod";
import bcrypt from "bcryptjs";


const registerUserSchema = z
  .object({
    name: z.string().nonempty({message: "O nome é obrigatório"}),
    email: z.string().email({message: "O e-mail é inválido!"}),
    password: z.string().nonempty({message: "A senha é obrigatória!"}),
    confirmPassword: z.string().nonempty({message: "A confirmação da senha é obrigatória!"}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export async function POST(req: NextRequest) {
  
  try {
    const body = await req.json();
    const parsed = registerUserSchema.safeParse(body);

    if (!parsed.success) {
      const parsedErrors = parsed.error.errors.map(err => (
        {
          message: err.message,
          path: err.path
        }
      ))
      return NextResponse.json({ error: parsedErrors }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    if (await prismadb.user.findUnique({ where: { email } })) {
      return NextResponse.json(
        { message: "Este e-mail já está registrado no sistema!" },
        { status: 409 }
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (err) {
    console.log(err);
    NextResponse.json(
      { message: "Ocorreu um problema ao criar o usuário" },
      { status: 500 }
    );
  }
}
