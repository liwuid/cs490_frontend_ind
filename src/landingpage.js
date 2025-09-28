import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function LandingPage() {
    const [topfivefilms, setFilms] = useState([]);
    const [topfiveactors, setActors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/topfivefilms")
        .then((response) => response.json())
        .then((data) => {
            const films = data.map(film => ({
                id: film[0],
                title: film[1]
            }));
            setFilms(films);
        })
        .catch((error) => console.error("Error displaying films:", error));

        fetch("http://localhost:5000/topfiveactors")
        .then((response) => response.json())
        .then((data) => {
            const actors = data.map(actor => ({
                id: actor[0],
                name: `${actor[1]} ${actor[2]}` 
            }));
            setActors(actors);
        })
        .catch((error) => console.error("Error displaying actors:", error));
    }, []);

    return (
        <div className="Sakila-DB">
            <h1>Top Five Films</h1>
            <div className="top-five-films">
                {topfivefilms.map((film) => (
                    <div key={film.id} className="film-item">
                        <Link to={`/film/${film.id}`}>
                            <img
                            src="https://cdn-icons-png.flaticon.com/512/4524/4524384.png"
                            alt={film.title}
                            className="film-image"
                            />
                        </Link>
                        <p className="film-title">{film.title}</p>
                    </div>
                ))}
            </div>

        <h1>Top Five Actors</h1>
            <div className="top-five-actors">
                {topfiveactors.map((actor) => (
                    <div key={actor.id} className="actor-item">
                        <Link to={`/actor/${actor.id}`}>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/024/677/958/non_2x/3d-icon-of-men-profile-people-free-png.png"
                            alt="{actor.name}"
                            className="actor-image"
                        />
                        </Link>
                        <p className="actor-name">{actor.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;