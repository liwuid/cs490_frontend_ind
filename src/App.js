import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FilmDetails from "./filmdetails";
import ActorDetails from "./actordetails";
import LandingPage from "./landingpage";
import FilmsPage from "./filmspage";
import CustomersPage from "./customerspage";
import './App.css';

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <nav className="navbar">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/films/search" className="nav-link">Films</Link>
                        <Link to="/customers" className="nav-link">Customers</Link>
                        <div className="nav-center">
                            <img
                                src="https://cdn3d.iconscout.com/3d/premium/thumb/3-d-movie-3d-icon-png-download-3902087.png"
                                alt="icon"
                                className="nav-icon"
                            />
                            <span className="nav-title">Sakila DB</span>
                        </div>
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
        </ThemeProvider>
    );
}

export default App;
