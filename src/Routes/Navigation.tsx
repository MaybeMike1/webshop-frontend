import React from "react";
import { Router, Route } from 'react-router';
import { BrowserRouter, Routes } from "react-router-dom";
import { LandingPage } from "../Pages/LandingPage";

interface NavigationProps {
}

const routes = [
  <Route key="landingPage" path="/" element={<LandingPage />} />
];
const Navigation: React.FC<NavigationProps> = () => {
  return (
    <BrowserRouter>
    <Routes>
        {routes}
    </Routes>
    </BrowserRouter>

  );
}

export default Navigation;