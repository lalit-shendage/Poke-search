import { useState } from "react";
import { pokemonNames } from "./data";

import "./style.scss";
import { Card } from "../../components";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [autoSuggestion, setAutoSuggestion] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setErrorMessage("Please enter a Pokemon name");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      const data = await response.json();
      const type = data.types.map((type)=>{
        return(type.type.name);
      })
      setSearchResults({
        name: data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
        id: data.id,
        height: data.height,
        weight: data.weight,
        type: type,
        abilities: data.abilities
      });
    } catch (error) {
      setErrorMessage("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if(value === "") {
        setAutoSuggestion([]);
        return;
    }
    const filteredNames = pokemonNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAutoSuggestion(filteredNames);
  };

  const handleSuggestions = (e, name) => {
    e.preventDefault();
    name = name.toLowerCase();
    setSearchTerm(name);
    setAutoSuggestion([]);
  }

  return (
    <div className="searchpage">
      <div className="search__head">
        <div className="serach__h">
        <h1>Pokédex Search</h1>
        <div className="search__container">
          <div className="search__int">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter a Pokemon name"
            />
            <ul className="search__suggestion">
              {autoSuggestion &&
                autoSuggestion.map((name, index) => (
                  <li key={index} onClick={(e) => handleSuggestions(e ,name)}>{name}</li>
                ))}
            </ul>
          </div>
          <button onClick={handleSearch} disabled={loading}>
            Search
          </button>
        </div>
        </div>
      </div>

      {loading && <p style={{textAlign: "center", marginTop: "40px"}}>Loading...</p>}

      {errorMessage && <p className="error">{errorMessage}</p>}

      {searchResults && (
        <div className="search__results">
          <h2 style={{marginTop: "40px"}}>Search Results</h2>
          <ul>
            <Card pokemon={searchResults} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
