import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function FilmsPage() {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filmsPerPage] = useState(14);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/films/search?search=${search}`)
        .then((response) => response.json())
        .then((data) => {
            const filmsData = data.map(film => ({
                id: film[0],
                title: film[1],
                genre: film[2],
            }));
            setFilms(filmsData);
            setCurrentPage(1);
        })
        .catch((error) => console.error("Error fetching films:", error));
    }, [search]);

    const finalFilm = currentPage * filmsPerPage;
    const firstFilm = finalFilm - filmsPerPage;
    const currentFilms = films.slice(firstFilm, finalFilm);

    const totalPages = Math.ceil(films.length / filmsPerPage);

    return (
        <div className="films-page">
            <h1 className="films-title">Films</h1>
            <input 
                type="text"
                placeholder="Search films by title, actor or genre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />
            <div className="films-list">
                {currentFilms.map((film) => (
                    <div 
                        key={film.id}
                        className="film-item"
                    >
                    <h3>  
                        <Link to={`/film/${film.id}`} className="film-link">{film.title}</Link>
                    </h3>
                    <p className="film-genre">{film.genre}</p>
                </div>
                ))}
            </div>

            implement pagination + no search result found 
    </div>
    );
}
            

export default FilmsPage;