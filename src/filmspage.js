import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function FilmsPage() {
    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState("");
    const [filmID, setFilmID] = useState("");
    const [customerID, setCustomerID] = useState("");
    const [message, setMessage] = useState("");
    const [filmCount, setFilmCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/films/search?search=${search}`)
        .then((response) => response.json())
        .then((data) => {
            const filmsData = data.map(film => ({
                id: film[0],
                title: film[1],
                genre: film[2],
                rating: film[3],
                release_year: film[4],
            }));
            setFilms(filmsData);
        })
        .catch((error) => console.error("Error fetching films:", error));
    }, [search]);

    const getFilmCount = () => {
        fetch("http://localhost:5000/films/inventory")
        .then((res) => res.json())
        .then((data) => setFilmCount(data.total_films))
    };

    useEffect(() => {
        getFilmCount();
    }, []);

    const rentFilm = () => {
        fetch("http://localhost:5000/rent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ film_id: filmID, customer_id: customerID }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
                getFilmCount();
            })
            .catch((err) => console.error("Error renting film:", err));
    };

    return (
        <div className="films-page">
            <h1 className="films-title">Search for Films</h1>
            <input 
                type="text"
                placeholder="Search films by title, actor or genre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />

            <div className="films-rent">
                <h2>Rent Films to Customers</h2>
                <div className="rent-form">
                    <input
                        type="number"
                        placeholder="Film ID"
                        value={filmID}
                        onChange={(e) => setFilmID(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Customer ID"
                        value={customerID}
                        onChange={(e) => setCustomerID(e.target.value)}
                    />
                    <button onClick={rentFilm}>Rent Film</button>
                </div>
                {message && <p className="rent-message">{message}</p>}
                <p className="film-count">Rentable Films: {filmCount}</p>
            </div>

            <div className = "scrollable">
                <table className="films-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Release Year</th>
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
                                <td>{film.rating}</td>
                                <td>{film.release_year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default FilmsPage;