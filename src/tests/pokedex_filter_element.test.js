import React, { useEffect, useState } from "react";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=3")
      .then(res => res.json())
      .then(data => {
        // Aqui vou simular os tipos, mas normalmente você buscaria na API de detalhes
        const results = [
          { name: "bulbasaur", type: "grass" },
          { name: "charmander", type: "fire" },
          { name: "squirtle", type: "water" },
        ];
        setPokemons(results);
      });
  }, []);

  const filtered = pokemons.filter(p => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? p.type === typeFilter : true;
    return matchesName && matchesType;
  });

  return (
    <div>
      <input
        placeholder="Buscar Pokémon"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
        <option value="">Todos</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
      </select>

      <ul>
        {filtered.map(p => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pokedex;
