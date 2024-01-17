import { useState, useEffect } from "react";
import "./style.scss";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const removeBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmark">
      <h2>Bookmarked Pokémon</h2>
      {bookmarks.length === 0 && <p>No bookmarked Pokémon.</p>}
      <div className="pokemon-list">
        {bookmarks.map((bookmark) => (
          <div className="pokemon-card" key={bookmark.id}>
            <img src={bookmark.image} alt={bookmark.name} />
            <h3>{bookmark.name}</h3>
            <button onClick={() => removeBookmark(bookmark.id)}>Remove Bookmark</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
