import { z } from "zod";
import { prismadb } from "../../prismaClient";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
})

export class User {
    async register(body: object) {
        const parsed = createUserSchema.safeParse(body)


        if(!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors}, {status: 400})
        }

        const {name, email, password} = parsed.data

        if(await prismadb.user.findUnique({where: {email}})) {
            return NextResponse.json({message: "Este e-mail já está registrado no sistema!"}, {status: 409})
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = await prismadb.user.create({
            data: {
                name,
                email,
                password: passwordHashed
            }
        })

        return newUser
    }
}