import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import DriverView from "./pages/DriverView.jsx";

function Nav() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb", display: "flex", gap: "1rem" }}>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/driver">Driver View</NavLink>
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
