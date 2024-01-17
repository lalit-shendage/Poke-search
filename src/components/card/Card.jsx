import { useNavigate } from "react-router-dom";
import "./style.scss";

const Card = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/detail/${pokemon.id}`);
  };

  return (
    <div className="card" onClick={handleDetails}>
      <img src={pokemon.image} alt="pokemon" />
      <div className="card__details">
        <h2>{pokemon.name}</h2>
        <p>
          {pokemon.id && (
            <>
              <span className="property">Id : </span> #{pokemon.id}
            </>
          )}
        </p>
        <p>
          {pokemon.weight && (
            <>
              <span className="property">Weight : </span> {pokemon.weight}
            </>
          )}
        </p>
        <p>
          {pokemon.height && (
            <>
              <span className="property">Height : </span> {pokemon.height}
            </>
          )}
        </p>
        <p>
          {pokemon.species && (
            <>
              <span className="property">Species : </span> {pokemon.species}
            </>
          )}
        </p>
        <p>
          {pokemon.type && (
            <>
              <span className="property">Type : </span>{" "}
              {pokemon.type.join(", ")}
            </>
          )}
        </p>
        <p>
          {pokemon.abilities && (
            <>
              <span className="property">Abilities : </span>{" "}
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
