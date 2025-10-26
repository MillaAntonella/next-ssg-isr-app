
import Image from "next/image";
import Link from "next/link";
import { RMListResponse } from "@/types/rickymorty";
import SearchClient from "./SearchClient";

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache", // 🔹 Generación estática (SSG)
  });

  if (!res.ok) throw new Error("No se pudo cargar la lista de personajes");

  const data: RMListResponse = await res.json();
  return data.results;
}

export default async function RMListPage() {
  const characters = await getCharacters();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
          🌌 Personajes de Rick & Morty
        </h1>

        {/* 🔍 Componente de búsqueda */}
        <div className="mb-10">
          <SearchClient />
        </div>

        {/* 🔹 Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {characters.map((c) => (
            <Link
              key={c.id}
              href={`/rickymorty/${c.id}`}
              className="group relative bg-white rounded-2xl border border-gray-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden"
            >
              {/* Imagen con efecto hover */}
              <div className="relative">
                <Image
                  src={c.image}
                  alt={c.name}
                  width={400}
                  height={400}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-center">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-200 transition">
                    {c.name}
                  </h2>
                </div>
              </div>

              {/* Detalles */}
              <div className="p-4 space-y-1 text-gray-700">
                <p className="text-sm">
                  <span
                    className={`font-semibold ${
                      c.status === "Alive"
                        ? "text-green-600"
                        : c.status === "Dead"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {c.status === "Alive"
                      ? "🟢 Vivo"
                      : c.status === "Dead"
                      ? "🔴 Muerto"
                      : "⚪ Desconocido"}
                  </span>{" "}
                  • {c.species}
                </p>
                {c.type && (
                  <p className="text-sm text-gray-500 italic">
                    Tipo: {c.type || "No especificado"}
                  </p>
                )}
                <p className="text-sm">Género: {c.gender}</p>
              </div>

              {/* Efecto de luz sutil */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-300/10 to-transparent blur-2xl" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
 