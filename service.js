const axios = require("axios");

class PokemonService {
    static async listPokemons(page = 1, limit = 20) {
        const offset = (page - 1) * limit;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        return response.data;
    }

    static async getPokemon(param) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${param}`);
        return response.data;
    }

    static async getPokemonsByElement(element, page = 1, limit = 20) {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${element}`);
        const allPokemons = response.data.pokemon.map(p => p.pokemon);
        const offset = (page - 1) * limit;
        const paginatedPokemons = allPokemons.slice(offset, offset + limit);

        const detailedPokemons = await Promise.all(
            paginatedPokemons.map(async (poke) => {
                const pokeDetails = await axios.get(poke.url);
                return pokeDetails.data;
            })
        );

        return {
            page,
            total: allPokemons.length,
            pokemons: detailedPokemons
        };
    }
}

module.exports = PokemonService;