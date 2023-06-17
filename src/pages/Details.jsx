import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const name = location.state?.name || '';
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Replace the API endpoint and specify the necessary parameters
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [name]);

  
  return (
    <div>
      <h1>Details Page</h1>
      <p>Name: {name}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display the fetched data */}
          {data ? (
           <div className=""> 
           
           <div className="image"><img src={data.sprites.other.home.front_default} alt="" /></div>
           <div className="abilities" key={data.weight}>Weight: {data.weight}</div>
           <div className="abilities">Abilities
              {data.abilities.map((ability, index) => (
                <div className="ability" key={index}>
                  {ability.ability.name}
                </div>
              ))}
              <div className="experience">Experience: {data.base_experience}</div>
              <div className="stats">
              {data.stats.map((stat, index) => (
                <div className="stat" key={index}>
                  <p>Name: {stat.stat.name}</p>
                  <p>Value: {stat.base_stat}</p>
                </div>
              ))}
            </div>
            </div>
           </div>
          ) : (
            <p>No data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
