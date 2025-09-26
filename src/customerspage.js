import React, { useEffect, useState } from "react"
import "./App.css"

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchCustomers = async (page=1) => {
            try {
                const response = await fetch(`http://localhost:5000/customers?page=${page}`);
                const data = await response.json();

                const dataCustomers = data.customers.map((customer) => ({
                    id: customer[0],
                    firstname: customer[1],
                    lastname: customer[2],
                }));

                setCustomers(dataCustomers);
                setPagination(data.pagination);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        };
        fetchCustomers(1);
    }, []);

    return (
        <div className="customer-page">
            <h1>Customers</h1>
            <div className="customer-table-wrap">
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.firstname}</td>
                                <td>{customer.lastname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default CustomersPage;