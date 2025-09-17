import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilmDetails from "./filmdetails";
import LandingPage from "./landingpage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/film/:id" element={<FilmDetails />} />
            </Routes>
        </Router>
    )
}
export default App;
