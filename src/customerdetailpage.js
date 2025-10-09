import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CustomerDetailPage() {
    const { customer_id } = useParams();
    const [customer, setCustomer] = useState({});
    const [rentals, setRentals] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/customers/${customer_id}`)
            .then(res => res.json())
            .then(data => {
                setCustomer(data);
                setForm(data);
            });
        fetch(`http://localhost:5000/customers/${customer_id}/rentals`)
            .then(res => res.json())
            .then(data => setRentals(data));
    }, [customer_id]);

    const change = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/customers/${customer_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => alert(data.message));
    };

    return (
        <div className="customer-details">
            <h1>Customer Details</h1>
            <form onSubmit={submit}>
                <input name="first_name" value={form.first_name || ""} onChange={change} placeholder="First Name"/>
                <input name="last_name" value={form.last_name || ""} onChange={change} placeholder="Last Name"/>
                <input name="email" value={form.email || ""} onChange={change} placeholder="Email"/>
                <input name="address" value={form.address || ""} onChange={change} placeholder="Address"/>
                <input name="city" value={form.city || ""} onChange={change} placeholder="City"/>
                <input name="district" value={form.district || ""} onChange={change} placeholder="State / District"/>
                <input name="postal_code" value={form.postal_code || ""} onChange={change} placeholder="Postal Code"/>
                <input name="country" value={form.country || ""} onChange={change} placeholder="Country"/>
                <input name="phone" value={form.phone || ""} onChange={change} placeholder="Phone"/>
                <input name="store_id" value={form.store_id || ""} onChange={change} placeholder="Store ID"/>
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
                    {rentals.map((rental, idx) => (
                        <tr key={idx}>
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