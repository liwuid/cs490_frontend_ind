import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FilmDetails() {
    const { id } = useParams();
    const [filmdetails, setFilm] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/film/${id}`)
            .then((response) => response.json())
            .then((data) => {
                const film = data[0];
                setFilm({ 
                    film_id: film[0],
                    title: film[1],
                    description: film[2],   
                    release_year: film[3],
                    category: film[4],
                    language: film[5]
                })
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
            <p><strong>Title:</strong> {filmdetails.title}</p>
            <p><strong>Description:</strong> {filmdetails.description}</p>
            <p><strong>Release Year:</strong> {filmdetails.release_year} </p>
            <p><strong>Category:</strong> {filmdetails.category}</p>
            <p><strong>Language:</strong> {filmdetails.language}</p>
        </div>
    );
}

//add later
//<p><strong>Rating:</strong> {filmdetails.rating}</p>
//<p><strong>Actors:</strong> {filmdetails.actors}</p>
//<p><strong>Rented:</strong> {filmdetails.rented} times</p>
export default FilmDetails;