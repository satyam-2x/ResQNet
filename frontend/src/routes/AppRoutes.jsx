import { BrowserRouter, Routes, Route } from "react-router-dom";
import Report from "../pages/CitizenReport";
import ResponderDashboard from "../pages/ResponderDashboard";
import Home from "../pages/home";

function AppRoutes() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/dashboard" element={<ResponderDashboard />} />
          </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;