import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function FilmsPage() {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState("");

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
        })
        .catch((error) => console.error("Error fetching films:", error));
    }, [search]);

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
            <div className = "scrollable">
                <table className="films-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {films.map((film) => (
                            <tr key={film.id}>
                                <td>{film.id}</td>
                                <td>
                                    <Link to={`/film/${film.id}`} className="film-link-table">
                                        {film.title}
                                    </Link>
                                </td>
                                <td>{film.genre}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default FilmsPage;