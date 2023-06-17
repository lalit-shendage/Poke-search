import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchListing from './pages/SearchListing';
import Details from './pages/Details';
import Bookmarks from './pages/Bookmarks';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SearchListing/>} />
        <Route path="/details" element={<Details/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
      </Routes>
    </Router>
  );
};

export default App;
