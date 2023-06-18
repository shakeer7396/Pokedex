
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailsPage.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const DetailsPage =()=> {
  const { pokemonName } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked((prevState) => !prevState);
  };

  useEffect(() => {
    // Fetch Pokemon details based on the provided pokemonName
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon details');
        }
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  useEffect(() => {
    // Check if the Pokemon is bookmarked
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedPokemon'));
    if (storedBookmarks && storedBookmarks.includes(pokemonName)) {
      setIsBookmarked(true);
    }
  }, [pokemonName]);

  const updateBookmarks = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedPokemon')) || [];
    // console.log(storedBookmarks)

    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = storedBookmarks.filter((name) => name !== pokemonName);
      localStorage.setItem('bookmarkedPokemon', JSON.stringify(updatedBookmarks));
      // console.log("hello")
    } else {
      // Add to bookmarks
      const updatedBookmarks = [...storedBookmarks, pokemonName];
      localStorage.setItem('bookmarkedPokemon', JSON.stringify(updatedBookmarks));
      // console.log("No")
    }
  };

  return (
    <div className="details-container">
      <h1>Details Page</h1>
      {pokemonDetails ? (
        <div className="pokemon-details">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
            alt={pokemonDetails.name}
          />
          <h3>{pokemonDetails.name}</h3>
          {/* Display other Pokemon details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button className="bookmark-button" onClick={() => {
          handleBookmarkClick();
          updateBookmarks();
        }}>
        {isBookmarked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <Link to="/bookmarks" className="bookmark-link">View Bookmarks</Link>
    </div>
  );
}

export default DetailsPage;


