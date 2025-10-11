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
    const [addForm, setAddForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);
    const [message, setMessage] = useState("");
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

    const handleMessage = (msg, closeForm) => {
    setMessage(msg);
    setTimeout(() => {
        setMessage("");
        closeForm(false);
    }, 2000);
    };

    const addUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUser = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            address: formData.get("address"),
            city: formData.get("city"),
            district: formData.get("district"),
            postal_code: formData.get("postal_code"),
            country: formData.get("country"),
            phone: formData.get("phone"),
            store_id: formData.get("store_id"),
        };
        try {
            const response = await fetch("http://localhost:5000/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            const data = await response.json();
            handleMessage(data.message, setAddForm);
            fetchCustomers(pagination.page);
        } catch (error) {
            setMessage("Error adding user");
        }
    };

    const deleteUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customer_id = formData.get("customer_id");

        try {
            const response = await fetch(`http://localhost:5000/customers/${customer_id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            handleMessage(data.message, setDeleteForm);
            fetchCustomers(pagination.page);
        } catch (error) {
            setMessage("Error deleting user");
        }
    };

    return (
        <div className="customer-page">
          <div className="customer-header">
            <h1 className="customer-title">Customers</h1>
            <div className="customer-buttons">
                <button className="add-button" onClick={() => setAddForm(true)}>Add User</button>
                <button className="delete-button" onClick={() => setDeleteForm(true)}>Delete User</button>
            </div>
          </div>
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
            
            {message && <div className="form-message">{message}</div>}
            {addForm && (
                <div className="add-overlay" onClick={() => setAddForm(false)}>
                    <div className="add-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add New Customer</h3>
                        {message && <div className="form-message">{message}</div>}
                        <form onSubmit={addUser}>
                            <label>First Name:<input type="text" name="first_name" required /></label>
                            <label>Last Name:<input type="text" name="last_name" required /></label>
                            <label>Email:<input type="email" name="email" required /></label>
                            <label>Address:<input type="text" name="address" required /></label>
                            <label>City:<input type="text" name="city" required /></label>
                            <label>District:<input type="text" name="district" required /></label>
                            <label>Postal Code:<input type="text" name="postal_code" /></label>
                            <label>Country:<input type="text" name="country" required /></label>
                            <label>Phone:<input type="text" name="phone" required /></label>
                            <label>Store ID:<input type="number" name="store_id" required /></label>

                            <div className="form-buttons">
                                <button type="button" onClick={() => setAddForm(false)}>Cancel</button>
                                <button type="submit">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {message && <div className="form-message">{message}</div>}
            {deleteForm && (
                <div className="delete-overlay" onClick={() => setDeleteForm(false)}>
                    <div className="delete-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Delete Customer</h3>
                        {message && <div className="form-message">{message}</div>}
                        <form onSubmit={deleteUser}>
                            <input 
                                type="number" 
                                placeholder="Customer ID"
                                name="customer_id" 
                                required
                            />
                            <div className="form-buttons">
                                <button type="button" onClick={() => setDeleteForm(false)}>Cancel</button>
                                <button type="submit">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomersPage;