
import React, { useState, useEffect } from 'react';
import './BookmarksPage.css';
import { Link } from 'react-router-dom';

const BookmarkPage =()=> {
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve bookmarked Pokémon from local storage
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedPokemon'));
    if (storedBookmarks && storedBookmarks.length > 0) {
      setBookmarkedPokemon(storedBookmarks);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Fetch Pokémon details for bookmarked Pokémon
    const fetchBookmarkedPokemonDetails = async () => {
      const detailsPromises = bookmarkedPokemon.map((pokemonName) => fetchPokemonDetails(pokemonName));
      try {
        const pokemonDetails = await Promise.all(detailsPromises);
        setBookmarkedPokemon(pokemonDetails.filter(Boolean));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookmarkedPokemon.length > 0) {
      setIsLoading(true);
      fetchBookmarkedPokemonDetails();
    }
  }, [bookmarkedPokemon]);

  const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null; // Return null in case of error
    }
  };

  return (
    <div className="bookmark-container">
      <h1>Bookmarks</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : bookmarkedPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {bookmarkedPokemon.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookmarked Pokémon found.</p>
      )}
      <Link to="/" className="home-link">Go Back</Link>
    </div>
  );
}

export default BookmarkPage;


