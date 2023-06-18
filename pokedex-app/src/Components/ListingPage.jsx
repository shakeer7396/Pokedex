
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListingPage.css';

const ListingPage =()=> {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchPokemonList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
      }
      const data = await response.json();
      setPokemonList(data.results);
      setNextUrl(data.next);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePokemon = async () => {
    if (nextUrl) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(nextUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon list');
        }
        const data = await response.json();
        setPokemonList((prevList) => [...prevList, ...data.results]);
        setNextUrl(data.next);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filterPokemonList = () => {
    const filteredList = pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFilteredPokemonList(filteredList);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    filterPokemonList();
  }, [pokemonList, searchInput]);

  return (
    <div className="listing-container">
      <h1 style={{textAlign:"center"}}>Pokémon List</h1>

      <div className="search-container">
        <input type="text" placeholder="Search Pokémon" value={searchInput} onChange={handleSearchInputChange} />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="pokemon-grid">
        {filteredPokemonList.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <Link to={`/details/${pokemon.name}`}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`} alt={pokemon.name} />
            </Link>
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>

      {!isLoading && !error && (
        <button className="load-more-button" onClick={loadMorePokemon} disabled={!nextUrl}>
          Load More
        </button>
      )}
    </div>
  );
}

export default ListingPage;

