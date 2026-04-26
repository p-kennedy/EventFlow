import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import DriverView from "./pages/DriverView.jsx";
import "./app.css";

function Nav() {
  return (
    <nav className="app-nav">
      <span className="app-logo">EventFlow</span>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Dashboard
        </NavLink>
        <NavLink to="/driver" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Driver View
        </NavLink>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/driver" element={<DriverView />} />
      </Routes>
    </BrowserRouter>
  );
}
