import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActorDetails() {
    const { id } = useParams();
    const [actordetails, setActor] = useState(null);
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
    if (!actordetails) {
        return <div>Loading...</div>;
    }
    return (
        <div className="actor-details">
            <h1>{`${actordetails.first_name} ${actordetails.last_name}`}</h1>
            <p><strong>Actor ID:</strong> {actordetails.actor_id}</p>
            <p><strong>First Name:</strong> {actordetails.first_name}</p>
            <p><strong>Last Name:</strong> {actordetails.last_name}</p>
            <p><strong>Films Featured:</strong> {actordetails.films}</p>
        </div>
    );
}

export default ActorDetails;
