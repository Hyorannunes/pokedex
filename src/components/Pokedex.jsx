import { useState, useEffect } from 'react';

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
      .then(data => {
        // Ensure data is an array
        const pokemonArray = Array.isArray(data) ? data : data.results || [];
        setPokemon(pokemonArray);
        setLoading(false);
      });
  }, []);

  const filteredPokemon = pokemon
    .filter(poke => poke.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(poke => filterType === 'all' || poke.type === filterType);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pokedex">
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <select 
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        role="combobox"
      >
        <option value="all">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
      </select>

      <div className="pokemon-list">
        {filteredPokemon.map(poke => (
          <div key={poke.name} className="pokemon-card">
            <h3>{poke.name}</h3>
            <img src={poke.sprites?.front_default} alt={poke.name} />
            <p>Type: {poke.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}