
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail, User } from "lucide-react";
import React, { useState } from 'react'

const FormLogin = () => {

    const [login, setLogin] = useState(true)
        const [name, setName] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [seePassword, setSeePassword] = useState(false)
    
        const handleSeePassword = () => {
          setSeePassword(!seePassword);
        }
    
        const RegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            
        }

  return (
    <form onSubmit={(e) => RegisterSubmit(e)} className="flex flex-col gap-4 w-full">
                <div className="relative">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                    onChange={(e) => setName(e.target.value)}
                    value={name}/>
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
                </div>
                <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
                </div>
                <div className="relative">
                    <input
                      type={seePassword ? "text" : "password"}
                      placeholder="Senha"
                      className="outline-primary rounded-lg border-2 border-gray-150 py-2 px-10 w-full"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
                    {seePassword ? <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-50 cursor-pointer" onClick={handleSeePassword} /> : <EyeClosed className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-50 cursor-pointer" onClick={handleSeePassword} />}
                </div>
                
                <div className="w-full flex justify-between">

                  {login ? <button className="text-primary font-semibold underline" onClick={() => setLogin(false)}>Registre-se </button> : <button className="text-primary font-semibold underline" onClick={() => setLogin(true)}>Fazer Login</button>}

                    <button type="submit" className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1">
                        Entrar
                        <LogIn />
                        </button>
                        
                </div>
            </form>
  )
}

export default FormLogin