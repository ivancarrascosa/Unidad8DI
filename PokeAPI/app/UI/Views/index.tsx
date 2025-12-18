import { container } from "@/app/Core/container";
import { useState } from "react";
import { IndexVM } from "../ViewModels/IndexVM";
import { TYPES } from "@/app/Core/types";
import { Pokemon } from "@/app/Domain/Entities/Pokemon";

const IndexView: React.FC = () => {
  const [viewModel] = useState(() => {
    return container.get<IndexVM>(TYPES.IndexVM);
  });

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadPokemon = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newPokemon = await viewModel.obtenerPokemon();
      setPokemonList(prev => [...prev, ...newPokemon]);
    } catch (err) {
      setError('Error al cargar los Pokémon. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            PokéDex
          </h1>
          <p className="text-gray-600">
            Carga 20 Pokémon cada vez usando el botón flotante
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total cargados: {pokemonList.length}
          </p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {pokemonList.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Pulsa el botón flotante para cargar Pokémon
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {pokemonList.map((pokemon, index) => (
            <div
              key={`${pokemon.name}-${index}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">#{index + 1}</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {capitalizeFirstLetter(pokemon.name)}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando Pokémon...</p>
          </div>
        )}

        <button
          onClick={handleLoadPokemon}
          disabled={loading}
          className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed"
          aria-label="Cargar más Pokémon"
        >
          <svg 
            className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};