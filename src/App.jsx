import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import {  Bookmark, SearchPage, Detail, Listing } from "./pages";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ height: "70px" }}></div>
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route exact path="/bookmark" element={<Bookmark />} />
          <Route exact path="/listing" element={<Listing/>} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
