import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [topfivefilms, setFilms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/topfivefilms")
            .then((response) => response.json())
            .then((data) => {
                const films = data.map(f => ({
                    id: f[0],
                    title: f[1],
                }));
                setFilms(films);
            })
            .catch((error) => console.error("Error displaying films:", error));
    }, []);

    return (
        <div className="Sakila-DB">
            <h1>Top Five Films</h1>
            <div className="top-five-films">
                {topfivefilms.map((film) => (
                    <div key={film.id} className="film-item">
                        <a href={`/film/${film.id}`}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2503/2503508.png"
                            alt={film.title}
                            className="film-image"
                        />
                        </a>
                        <p className="film-title">{film.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
