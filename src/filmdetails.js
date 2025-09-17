import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FilmDetails() {
    const { id } = useParams();
    const [filmdetails, setFilm] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/filmdetails/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFilm(data);
            })
            .catch((error) => console.error("Error fetching film details:", error));
    }, [id]);
    if (!filmdetails) {
        return <div>Loading...</div>;
    }                           
    return (
        <div className="film-details">
            <h1>{filmdetails.title}</h1>
            <p><strong>Film ID:</strong> {filmdetails.film_id}</p>
            <p><strong>Description:</strong> {filmdetails.description}</p>
            <p><strong>Release Year:</strong> {filmdetails.release_year}</p>
            <p><strong>Category:</strong> {filmdetails.category}</p>
            <p><strong>Language:</strong> {filmdetails.language}</p>
            <p><strong>Rating:</strong> {filmdetails.rating}</p>
            <p><strong>Actors:</strong> {filmdetails.actors}</p>
        </div>
    );
}

export default FilmDetails;