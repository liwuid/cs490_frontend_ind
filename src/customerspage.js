import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./App.css";

function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [pagination, setPagination] = useState({page: 1, pages: 1});
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("last_name");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();

    const fetchCustomers = async (page=1) => {
        try {
            const response = await fetch(`http://localhost:5000/customers?page=${page}&search=${search}&sort_by=${sortBy}&sort_order=${sortOrder}`);
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
    }, [search, sortBy, sortOrder]);

    const pageChange = (e, value) => {
        fetchCustomers(value);
    };

    const searchChange = (e) => {
        setSearch(e.target.value)
    };

    const sortChange = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }
        else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    return (
        <div className="customer-page">
            <h1 className="customer-title">Customers</h1>
            <div className="customer-search">
                <input
                    type="text"
                    placeholder="Search by ID, first name, or last name"
                    value={search}
                    onChange={searchChange}
                />
            </div>

            <div className="customer-table-wrap">
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortChange("customer_id")}>
                                ID {sortBy === "customer_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => sortChange("first_name")}>
                                First Name {sortBy === "first_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => sortChange("last_name")}>
                                Last Name {sortBy === "last_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr 
                                className="clickable-row"
                                key={customer.id} 
                                onClick={() => navigate(`/customers/${customer.id}`)}
                            >
                                <td>{customer.id}</td>
                                <td>{customer.firstname}</td>
                                <td>{customer.lastname}</td>
                                <td>{customer.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Stack style={{ alignItems: "center"}}>
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