import React, { useEffect, useState } from "react"
import "./App.css"

function CustomersPage() {
    const [customer, setCustomer] = useState([]);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        const fetchCustomers = async (page=1) => {
            try {
                const response = fetch(`https://localhost:5000/customers?page=${page}`);
                const data = (await response).json();

                const dataCustomers = data.customers.map((customer) => ({
                    id: customer[0],
                    firstname: customer[1],
                    lastname: customer[2],
                }));

                setCustomer(dataCustomers);
                setPagination(data.pagination);
            } catch (error) {
                console.error("Error fetching custoemrs:", error);
            }
        };
        fetchCustomers(1);
    }, []);
};

export default CustomersPage;