import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './Components/SearchPage';
import ListingPage from './Components/ListingPage';
import DetailsPage from './Components/DetailsPage';
import BookmarksPage from './Components/BookmarksPage';

function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/details/:pokemonName" element={<DetailsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
