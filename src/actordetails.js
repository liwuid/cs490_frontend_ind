import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./App.css";

function ActorDetails() {
    const { id } = useParams();
    const [actordetails, setActor] = useState(null);
    const [films, setFilm] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/actor/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const actor = data[0];
                setActor({
                    actor_id: actor[0],
                    first_name: actor[1],
                    last_name: actor[2],
                    films: actor[3]
                })
            })
            .catch((error) => console.error("Error fetching actor details:", error));               
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/topfive/actor/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const films = data.map(film => ({
                    id: film[0],
                    title: film[1],
                    rentals: film[2]
                }));
                setFilm(films);
            })
            .catch((error) => console.error("Error fetching actor's films:", error));
    }, [id]);

     if (!actordetails) {
        return <div>Fetching actor details...</div>;
    }

    return (
        <div className="actor-details">
            <h1>{`${actordetails.first_name} ${actordetails.last_name}`}</h1>
            <p><strong>Actor ID:</strong> {actordetails.actor_id}</p>
            <p><strong>First Name:</strong> {actordetails.first_name}</p>
            <p><strong>Last Name:</strong> {actordetails.last_name}</p>
            <p><strong>Films Featured:</strong> {actordetails.films}</p>

            <h2>Top Five Rented Films</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {films.map((film) => (
                    <div key={film.id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                        <h3>
                            <Link to={`/film/${film.id}`} className="film-link-table">
                                {film.title}
                            </Link>
                        </h3>
                        <p><strong>Times Rented:</strong> {film.rentals}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActorDetails;
