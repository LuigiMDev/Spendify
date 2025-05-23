import { NextRequest, NextResponse } from "next/server";
import { prismadb } from "../../prismaClient";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";


const registerUserSchema = z
  .object({
    name: z.string().nonempty({message: "O nome é obrigatório"}).max(70, {message: "O nome não pode ultrapassar de 70 caracteres!"}),
    email: z.string().email({message: "O e-mail é inválido!"}).max(100, {message: "O e-mail não pode passar de 100 caracteres!"}),
    password: z.string().nonempty({message: "A senha é obrigatória!"}).min(8, {message: "A senha precisa ter no mínimo 8 caracteres"}).max(50, "A senha não pode passar de 50 caracteres!"),
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

    const FTwoNames = name.trim().split(/\s+/).slice(0, 2).join(" ")

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(FTwoNames)}&background=06E35E&color=FFFFFF&size=128&format=svg`

    const newUser = await prismadb.user.create({
      data: {
        name,
        FTwoNames,
        email,
        avatar,
        password: passwordHashed,
      },
    });

    const JWT_SECRET = process.env.JWT_SECRET

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET não definido!");
    }

    const token = jwt.sign({id: newUser.id}, JWT_SECRET, {
      expiresIn: "30d"
    });

    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (err) {
    console.log(err);
    NextResponse.json(
      { message: "Ocorreu um problema ao criar o usuário" },
      { status: 500 }
    );
  }
}
