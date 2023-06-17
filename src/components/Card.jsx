import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ name, url }) => {
  const id = url.match(/\/(\d+)\/$/)[1];
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const image = new Image();
    image.src = imgUrl;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [imgUrl]);

  const handleBookmark = () => {
    // Save name to local storage
    localStorage.setItem('bookmark', name);
  };

  const handleDetails = () => {
    // Navigate to "/details" page with name prop
    navigate('/details', { state: { name } });
  };

  return (
    <div className="card">
      {imageLoaded ? (
        <img src={imgUrl} alt={name} />
      ) : (
        <div>Loading image...</div>
      )}
      <h3>{name}</h3>
      <div className="card-buttons">
        <button onClick={handleBookmark}>Bookmark</button>
        <button onClick={handleDetails}>Details</button>
      </div>
    </div>
  );
};

export default Card;
