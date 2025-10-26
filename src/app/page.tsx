import Link from "next/link";
import { IoGameController } from "react-icons/io5";
import { GiPokecog } from "react-icons/gi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
      <main className="max-w-5xl mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
          Bienvenido 👋
        </h1>
        <p className="text-xl text-gray-700 mb-16 max-w-2xl mx-auto">
          Elige tu universo: explora el mundo Pokémon o viaja con Rick y Morty por el multiverso.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {/* 🔹 Pokémon Card */}
          <Link
            href="/pokemon"
            className="group relative bg-white rounded-2xl p-10 border border-gray-300 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className="text-gray-800 mb-6">
              <GiPokecog
                size={90}
                className="mx-auto group-hover:rotate-[20deg] transition-transform duration-500"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pokédex</h2>
            <p className="text-gray-600 text-lg">
              Descubre y explora todos los Pokémon con sus habilidades y tipos.
            </p>
          </Link>

          {/* 🔹 Rick and Morty Card */}
          <Link
            href="/rickymorty"
            className="group relative bg-white rounded-2xl p-10 border border-gray-300 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className="text-gray-800 mb-6">
              <IoGameController
                size={90}
                className="mx-auto group-hover:rotate-[20deg] transition-transform duration-500"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Rick & Morty</h2>
            <p className="text-gray-600 text-lg">
              Conoce a todos los personajes del multiverso con sus historias únicas.
            </p>
          </Link>
        </div>

        <footer className="mt-16 text-gray-500 text-sm">
          © {new Date().getFullYear()} - Creado con pasión por Antonella Milla
        </footer>
      </main>
    </div>
  );
}
