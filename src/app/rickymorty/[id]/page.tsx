import Image from "next/image";
import { notFound } from "next/navigation";
import type { RMCharacter, RMListResponse } from "@/types/rickymorty";

// 🔹 Genera las páginas estáticas para los primeros 20 personajes
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache",
  });

  if (!res.ok) return [];

  const data: RMListResponse = await res.json();
  const limited = data.results.slice(0, 20);

  return limited.map((char) => ({ id: String(char.id) }));
}

// 🔹 Obtiene los datos de un personaje por ID
async function getCharacter(id: string): Promise<RMCharacter> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // ISR: revalida cada 10 días
  });

  if (!res.ok) {
    console.error(`❌ No se encontró el personaje con id ${id}`);
    notFound();
  }

  return res.json();
}

// 🔹 Página individual del personaje
export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const c = await getCharacter(id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-200 hover:border-green-400 transition">
        {/* Encabezado con gradiente */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 p-8 text-center text-white">
          <h1 className="text-4xl font-bold">{c.name}</h1>
          <p className="text-white/80 mt-2">
            {c.status} • {c.species}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="p-8 grid md:grid-cols-2 gap-8 items-start">
          <Image
            src={c.image}
            alt={c.name}
            width={500}
            height={500}
            className="rounded-xl w-full h-auto border-2 border-blue-200 shadow-md"
            priority
          />
          <div className="text-black space-y-3">
            <p><b>Gender:</b> {c.gender}</p>
            {c.type && <p><b>Type:</b> {c.type}</p>}
            <p><b>Origin:</b> {c.origin?.name}</p>
            <p><b>Location:</b> {c.location?.name}</p>
            <p><b>Episodes:</b> {c.episode.length}</p>
            <p className="text-sm opacity-70">
              <b>Created:</b>{" "}
              {new Date(c.created).toLocaleString("es-PE", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

