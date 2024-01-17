import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BsBookmarkFill } from "react-icons/bs";
import "./style.scss";

const Detail = () => {
  const [pokemon, setPokemon] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    handlePokemon();
    checkBookmark();
  }, []);

  const handlePokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      const type = data.types.map((type) => {
        return type.type.name;
      });
      setPokemon({
        name: data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
        id: data.id,
        order: data.order,
        height: data.height,
        weight: data.weight,
        species: data.species.name,
        abilities: data.abilities,
        stats: data.stats,
        type: type,
      });
    } catch (error) {
      setErrorMessage("Failed to fetch data. Please try again.");
    }
  };

  const checkBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkedPokemon = bookmarks.find((bookmark) => bookmark.id === id);
    setBookmarked(!!bookmarkedPokemon);
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkedPokemon = bookmarks.find((bookmark) => bookmark.id === id);
    if (bookmarkedPokemon) {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.id !== id
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarked(false);
    } else {
      const newBookmark = {
        id,
        name: pokemon.name,
        image: pokemon.image,
        type: pokemon.type
      };
      const updatedBookmarks = [...bookmarks, newBookmark];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarked(true);
    }
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail">
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="pokemon-info">
        <div className="pokemon-image">
          <img src={pokemon.image} alt={pokemon.name} />
          <div className="detail__bookmark" onClick={toggleBookmark}>
            {!bookmarked ? (
              <>
                BookMark <BsBookmarkFill />
              </>
            ) : (
              <>
                UnBookMark <BsBookmarkFill />
              </>
            )}
          </div>
        </div>
        <div className="pokemon-details">
          <h2>{pokemon.name}</h2>
          <p>
            ID : <span>{pokemon.id}</span>
          </p>
          <p>
            Order : <span>{pokemon.order}</span>
          </p>
          <p>
            Height : <span>{pokemon.height}</span>
          </p>
          <p>Weight : {pokemon.weight}</p>
          <p>Species : {pokemon.species}</p>
          <div className="dropdown-table">
            <h3>Abilities:</h3>
            <table>
              <thead>
                <tr>
                  <th>Ability</th>
                  <th>Hidden</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.abilities.map((ability, index) => (
                  <tr key={index}>
                    <td>{ability.ability.name}</td>
                    <td>{ability.is_hidden ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dropdown-table">
            <h3>Stats:</h3>
            <table>
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Base Stat</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.stat.name}</td>
                    <td>{stat.base_stat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3>Type:</h3>
          <ul>
            {pokemon.type.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
