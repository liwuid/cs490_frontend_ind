import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FilmDetails from "./filmdetails";
import ActorDetails from "./actordetails";
import LandingPage from "./landingpage";
import FilmsPage from "./filmspage";
import CustomersPage from "./customerspage";
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/films/search" className="nav-link">Films</Link>
                    <Link to="/customers" className="nav-link">Customers</Link>
                </nav>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/film/:id" element={<FilmDetails />} />
                <Route path="/actor/:id" element={<ActorDetails />} />
                <Route path="/films/search" element={<FilmsPage />} />
                <Route path="/customers" element={<CustomersPage />} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
