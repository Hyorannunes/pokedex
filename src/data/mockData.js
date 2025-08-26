const API_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_PER_PAGE = 20;

// Total number of Pokemon (Generation 1-9)
const TOTAL_POKEMON = 1302;

// Helper function to format Pokemon data from API response
const formatPokemonData = (pokemonData) => {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map(type => type.type.name),
    image: pokemonData.sprites.other['official-artwork']?.front_default || 
           pokemonData.sprites.front_default ||
           `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`
  };
};

// Fetch Pokemon list with pagination
export const getPokemonByPage = async (page = 1) => {
  const offset = (page - 1) * POKEMON_PER_PAGE;
  const totalPages = Math.ceil(TOTAL_POKEMON / POKEMON_PER_PAGE);
  
  try {
    // Get the list of Pokemon
    const listResponse = await fetch(
      `${API_BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`
    );
    
    if (!listResponse.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }
    
    const listData = await listResponse.json();
    
    // Fetch detailed data for each Pokemon
    const pokemonPromises = listData.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${pokemon.name}`);
      }
      return response.json();
    });
    
    const pokemonDetails = await Promise.all(pokemonPromises);
    const formattedPokemon = pokemonDetails.map(formatPokemonData);
    
    return {
      pokemon: formattedPokemon,
      totalPages,
      currentPage: page,
      totalCount: TOTAL_POKEMON
    };
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};

// Search Pokemon by name or ID
export const searchPokemon = async (query, page = 1) => {
  if (!query || query.trim() === '') {
    return getPokemonByPage(page);
  }
  
  const searchQuery = query.trim().toLowerCase();
  
  try {
    // If query is a number, search by ID
    if (/^\d+$/.test(searchQuery)) {
      const pokemonId = parseInt(searchQuery);
      if (pokemonId > 0 && pokemonId <= TOTAL_POKEMON) {
        const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const pokemonData = await response.json();
        return {
          pokemon: [formatPokemonData(pokemonData)],
          totalPages: 1,
          currentPage: 1,
          totalCount: 1
        };
      } else {
        return {
          pokemon: [],
          totalPages: 0,
          currentPage: 1,
          totalCount: 0
        };
      }
    }
    
    // Search by name
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${searchQuery}`);
      if (response.ok) {
        const pokemonData = await response.json();
        return {
          pokemon: [formatPokemonData(pokemonData)],
          totalPages: 1,
          currentPage: 1,
          totalCount: 1
        };
      }
    } catch (error) {
      // Pokemon not found by exact name, return empty results
      return {
        pokemon: [],
        totalPages: 0,
        currentPage: 1,
        totalCount: 0
      };
    }
    
    // If exact match not found, return empty results
    return {
      pokemon: [],
      totalPages: 0,
      currentPage: 1,
      totalCount: 0
    };
    
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    throw error;
  }
};
