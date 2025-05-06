import movieList from "./data";
import { useState, useEffect } from "react";
import secondPageData from "./datatwo";
import { useNavigate } from "react-router-dom";

export default function MovieApp() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const navigate = useNavigate();

  // Load all movies initially
  useEffect(() => {
    setFilteredMovies(movieList);
  }, []);

  const selectedMovieData = secondPageData.find(
    (movie) => movie.id === selectedMovieId
  );

  const searchTerms = searchTerm
    .toLowerCase()
    .split(",")
    .map((term) => term.trim());

  function handleFilter() {
    const filtered = movieList.filter((movie) =>
      searchTerms.some((term) => {
        const movieTitleLower = movie.title.toLowerCase();
        const searchTermLower = term.toLowerCase();

        return movieTitleLower.includes(searchTermLower);
      })
    );
    setFilteredMovies(filtered);
    setSelectedMovieId(null);
  }

  function handleBackKey () {
    setFilteredMovies(movieList)
  }

  function handleSort() {
    const sorted = [...filteredMovies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setFilteredMovies(sorted);
  }

  function handleClicker(movieId) {
    setSelectedMovieId((prevId) => (prevId === movieId ? null : movieId));
  }

  function handleMouseEnter(id) {
    setHoveredId(id);
  }

  function handleMouseLeave() {
    setHoveredId(null);
  }

  function handleDownload () {
    const confirmDownload = window.confirm("Are you sure you want to download this movie?")
    if (confirmDownload) {
        navigate("/about")
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Movies Hub</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          style={{ borderRadius: "10px", padding: "10px" }}
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          style={{
            borderRadius: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            width: "70px",
            cursor: "pointer"
          }}
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          style={{
            borderRadius: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            width: "70px",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)",
            cursor: "pointer"
          }}
          onClick={handleSort}
        >
          Sort
        </button>

        <button
          style={{
            borderRadius: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            width: "70px",
            boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)",
            cursor: "pointer"
          }}
          onClick={handleBackKey}
        >
          Back
        </button>
      </div>

      <div
        className="gridWrapper"
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            padding: "20px",
        }}
      >
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="movieDetails"
            onClick={() => handleClicker(movie.id)}
            onMouseEnter={() => handleMouseEnter(movie.id)}
            onMouseLeave={handleMouseLeave}
            style={{
              background: hoveredId === movie.id ? "darkgray" : "white",
              height: hoveredId === movie.id ? "320px" : "auto",
              width: hoveredId === movie.id ? "200px" : "auto",
              borderRadius: "10px",
              padding: "0px",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: "100%", height: "180px", borderRadius: "10px", objectFit: "cover" }}
            />
            <div style={{ paddingTop: "10px" }}>
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>{movie.minutes}</p>
              <p>{movie.yearOfRelease}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovieData && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "none",
            borderRadius: "10px",
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2>Movie</h2>
          <img
            src={selectedMovieData.image}
            alt="Selected Movie"
            style={{ width: "300px", borderRadius: "10px" }}
          />
          <p>
            <strong>Overview:</strong> {selectedMovieData.overView}
          </p>
          <p>
            <strong>Actors:</strong> {selectedMovieData.actors}
          </p>
          <p>
            <strong>Director:</strong> {selectedMovieData.director}
          </p>
          <button 
          style={{ backgroundColor: "white", color: "black", borderRadius: "10px", padding: "5px"}}
          onClick={handleDownload}>Download</button>
        </div>
      )}
    </>
  );
}
