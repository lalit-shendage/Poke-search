import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card'

const SearchListing = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfData, setIsEndOfData] = useState(false);

  const itemsPerPage = 20;
  const resultsPerPage = currentPage * itemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Replace this with your actual data fetching logic
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
      const jsonData = await response.json();
      setData(jsonData.results);
      console.log(data)
      setFilteredData(jsonData.results.slice(0, resultsPerPage));
      setIsLoading(false);

      if (jsonData.results.length <= resultsPerPage) {
        setIsEndOfData(true);
      }
    };

    fetchData();
  }, [resultsPerPage]);

  const handleSearch = () => {
    // Filter the data based on the query
    const filtered = data.filter(
      item => item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered.slice(0, resultsPerPage));
    setCurrentPage(1);
    setIsEndOfData(filtered.length <= resultsPerPage);
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * itemsPerPage;
      const endIndex = nextPage * itemsPerPage;

      setFilteredData([...filteredData, ...data.slice(startIndex, endIndex)]);
      setCurrentPage(nextPage);

      if (data.length <= endIndex) {
        setIsEndOfData(true);
      }
    }
  };
console.log(filteredData)
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <InfiniteScroll
        dataLength={filteredData.length}
        next={handleLoadMore}
        hasMore={!isEndOfData}
        loader={<h4>Loading...</h4>}
        endMessage={<p>End of data</p>}
      >
        <ul>
          {filteredData.map(item => (
            <Card key={item.name} name={item.name} url={item.url}  />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default SearchListing;
