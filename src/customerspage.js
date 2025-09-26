import React, { useEffect, useState } from "react"
import "./App.css"

function CustomersPage() {
    const [customer, setCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    useEffect(() => {
        fetch("http://127.0.0.1:5000/customers")
        .then((response) => response.json())
        .then((data) => {
            const customerData = data.map(customer => ({
                id: customer[0],
                firstname: customer[1],
                lastname: customer[3],
            }));
            setCustomer(customerData);
        })
        .catch((error) => console.error("Error fetching customers:", error));
    }, []);
}

export default CustomersPage;