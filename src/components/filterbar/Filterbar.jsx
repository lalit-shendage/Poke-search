import { useEffect, useState } from "react";
import "./style.scss";

const TYPES = "types";
const ABILITIES = "abilities";

const Filterbar = ({ filterClass, setFilter }) => {
  const [filters, setFilters] = useState({
    types: [],
    abilities: [],
  });

  const handleDropdownChange = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case TYPES:
        setFilters({
          ...filters,
          types: [value],
        });
        break;

      case ABILITIES:
        setFilters({
          ...filters,
          abilities: [value],
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (filters.types && filters.abilities != []) {
      fetchData();
    }
  }, [filters]);

  const fetchData = async () => {
    try {
      const typePromises = filters.types.map(async (type) => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        return data;
      });
  
      const abilityPromises = filters.abilities.map(async (ability) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/ability/${ability}`
        );
        const data = await response.json();
        return data;
      });
  
      const typeResults = await Promise.all(typePromises);
      const abilityResults = await Promise.all(abilityPromises);
  
      const filteredTypes = typeResults.flatMap(
        (typeResult) => typeResult.pokemon
      );
      const filteredAbilities = abilityResults.flatMap(
        (abilityResult) => abilityResult.pokemon
      );
  
      const uniqueFilteredTypes = Array.from(new Set(filteredTypes)).slice(0, 10);
      const uniqueFilteredAbilities = Array.from(new Set(filteredAbilities)).slice(0, 10);
  
      let data = [...uniqueFilteredTypes, ...uniqueFilteredAbilities];
      const filter = await Promise.all(
        data.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`
          );
          const data = await response.json();
          const type = data.types.map((type) => type.type.name);
          return {
            name: data.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
            id: data.id,
            height: data.height,
            weight: data.weight,
            type: type,
            species: data.species.name,
            abilities: data.abilities,
          };
        })
      );
  
      setFilter([...filter]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className={filterClass}>
      <div className={`sidebar-content ${`sidebar-${filterClass}`}`}>
        <p>Types:</p>
        <select onChange={(e) => handleDropdownChange(e, TYPES)}>
          <option value="">Select a type</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="grass">Grass</option>
        </select>

        <p>Abilities:</p>
        <select onChange={(e) => handleDropdownChange(e, ABILITIES)}>
          <option value="">Select an ability</option>
          <option value="solar-power">Solar Power</option>
          <option value="run-away">Run Away</option>
          <option value="keen-eye">Keen Eye</option>
        </select>
      </div>
    </div>
  );
};

export default Filterbar;
