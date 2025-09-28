import React, { useEffect, useState } from "react"
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./App.css";

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [pagination, setPagination] = useState({page: 1, pages: 1});

    const fetchCustomers = async (page=1) => {
        try {
            const response = await fetch(`http://localhost:5000/customers?page=${page}`);
            const data = await response.json();

            const dataCustomers = data.customers.map((customer) => ({
                id: customer[0],
                firstname: customer[1],
                lastname: customer[2],
                email: customer[3],
            }));

            setCustomers(dataCustomers);
            setPagination(data.pagination);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
    useEffect(() => {
        fetchCustomers(1);
    }, []);

    const pageChange = (event, value) => {
        fetchCustomers(value);
    };

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
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.firstname}</td>
                                <td>{customer.lastname}</td>
                                <td>{customer.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Stack style={{ marginTop: "40px", alignItems: "center"}}>
                <Pagination
                    count={pagination.pages}
                    page={pagination.page}
                    onChange={pageChange}
                    color="standard"
                />
            </Stack>
        </div>
    );
}

export default CustomersPage;