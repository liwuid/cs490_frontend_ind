import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilmDetails from "./filmdetails";
import ActorDetails from "./actordetails";
import LandingPage from "./landingpage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/film/:id" element={<FilmDetails />} />
                <Route path="/actor/:id" element={<ActorDetails />} />
            </Routes>
        </Router>
    )
}
export default App;
