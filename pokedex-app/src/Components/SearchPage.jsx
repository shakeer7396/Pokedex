import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage =()=> {
  const [pokemonName, setPokemonName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setPokemonData(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      else{
        const data = await response.json();
      setPokemonData(data);
        setTimeout(()=>{
            window.location.href="/listing";
          },1000)
         
      }
        
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1>Pokédex</h1>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        placeholder="Enter a Pokemon name"
      />
      <button onClick={handleSearch}>Search</button>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {pokemonData && (
        <div className="pokemon-details">
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
