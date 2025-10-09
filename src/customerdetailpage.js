import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CustomerDetailPage() {
    const { customer_id } = useParams();
    const [customer, setCustomer] = useState({});
    const [rentals, setRentals] = useState({});
    const [editing, setEditing] = useState(false);
    const [from, setForm] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/customer/${customer_id}`)
            .then(res => res.json())
            .then(data => {
                setCustomer(data);
                setForm(data);
            });
        fetch(`http://localhost:5000/customer/${customer_id}/rentals`)
            .then(res => res.json())
            .then(data => setRentals(data));
    }, [customer_id]);

    const change = (e) => {
        const { name, value } = e.target;
        setForm({...FormData, [name]: value});
    };

    const submit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/customer/${customer_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => alert(data.message));
    };

    return (
        <div>
            <h1>Customer Details</h1>
            <form onSubmit={submit}>
                <input name="first_name" value={form.first_name || ""} onChange={change} placeholder="First Name"/>
                <input name="last_name" value={form.last_name || ""} onChange={handleChange} placeholder="Last Name" />
                <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" />
                <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" />
                <input name="city" value={formData.city || ""} onChange={handleChange} placeholder="City" />
                <input name="country" value={formData.country || ""} onChange={handleChange} placeholder="Country" />
                <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" />
                <input name="store_id" value={formData.store_id || ""} onChange={handleChange} placeholder="Store ID" />
                <button type="submit">Save</button>
            </form>

            <h2>Rental History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Film</th>
                        <th>Rented</th>
                        <th>Returned</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental, id) => (
                        <tr key={id}>
                            <td>{rental.title}</td>
                            <td>{new Date(rental.rental_date).toLocaleDateString()}</td>
                            <td>{rental.return_date ? new Date(rental.return_date).toLocaleDateString() : "————"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerDetailPage;