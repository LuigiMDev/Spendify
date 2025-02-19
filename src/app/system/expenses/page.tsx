"use client";
import { CirclePlus, CircleX, Edit, Send, Trash } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [add, setAdd] = useState(false);

  return (
    <div className="">
      <div className="mb-10">
        <h1 className="text-4xl mb-3">Gastos</h1>
        <p className="opacity-90">
          Adicione, altere e exclua seus gastos. Suas alterações irão refletir
          nos gráficos do dashboard
        </p>
      </div>

      <section>
        <div className="mb-5">
          <button
            className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all"
            onClick={() => setAdd(true)}
          >
            <CirclePlus className="flex flex-shrink-0 w-6 h-6" />
            <span className={`ml-3 w-full overflow-hidden text-nowrap`}>
              Adicionar gasto
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="p-5 border border-gray-100 rounded-xl shadow-sm bg-white">
            <h2 className="text-lg font-semibold opacity-80 mb-3">X-box 360</h2>
            <p className="opacity-80 mb-3">
              <span className="font-semibold">Descrição:</span> Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Ex doloremque cumque
              pariatur, incidunt facere
            </p>
            <p className="opacity-80 mb-3">
              <span className="font-semibold">Tipo:</span> Videogame
            </p>
            <div className="flex justify-end space-x-2">
              <button className="p-3 rounded-xl bg-yellow-300 text-white">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-xl bg-red-400 text-white">
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {add && (
        <>
          <div className="absolute z-30 bg-black h-screen top-0 w-screen opacity-30 left-0"></div>
          <div className="absolute shadow-header z-40 px-5 py-10 rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[700px]">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold opacity-80 mb-5">
                Adicionar gasto
              </h2>
              <button onClick={() => setAdd(false)}>
                <CircleX />
              </button>
            </div>
            <form className="flex flex-col gap-4 w-full">
              <div className="relative">
                <span className="mb-2 block">Título</span>
                <input
                  type="text"
                  placeholder="Escreva o título do seu gasto"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                  required
                />
              </div>
              <div className="relative">
                <span className="mb-2 block">Tipo de gasto</span>
                <input
                  type="text"
                  placeholder="Escreva o tipo de gasto"
                  className="outline-primary rounded-lg border-2 border-gray-150 p-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
                >
                  Enviar
                  <Send />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
