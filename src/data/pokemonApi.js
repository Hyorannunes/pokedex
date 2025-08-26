// Configure your backend API URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const POKEMON_PER_PAGE = 20;

// Fetch Pokemon list with pagination from your backend
export const getPokemonByPage = async (page = 1, limit = 20) => {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return {
    pokemon: data.pokemon || data.data || [],
    totalPages: data.totalPages || Math.ceil((data.total || 0) / limit),
    currentPage: data.currentPage || page,
    totalCount: data.total || data.totalCount || 0
  };
};

// Search Pokemon by name or ID through your backend
export const searchPokemon = async (query, page = 1) => {
  if (!query || query.trim() === '') {
    return getPokemonByPage(page);
  }
  const response = await fetch(
    `${API_BASE_URL}/pokemon/search?q=${encodeURIComponent(query)}&page=${page}&limit=${POKEMON_PER_PAGE}`
  );
  if (!response.ok) {
    throw new Error(`Failed to search Pokemon: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return {
    pokemon: data.pokemon || data.data || [],
    totalPages: data.totalPages || Math.ceil((data.total || 0) / POKEMON_PER_PAGE),
    currentPage: data.currentPage || page,
    totalCount: data.total || data.totalCount || 0
  };
};

// Lista os tipos de pokémon disponíveis na API
export const getPokemonTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/types`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar tipos: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

// Lista os pokémons filtrando por tipo
export const getPokemonByType = async (type, page = 1, limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/pokemon?type=${type}&page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar pokémons por tipo: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return {
    pokemon: data.pokemon || data.data || [],
    totalPages: data.totalPages || Math.ceil((data.total || 0) / limit),
    currentPage: data.currentPage || page,
    totalCount: data.total || data.totalCount || 0
  };
};
