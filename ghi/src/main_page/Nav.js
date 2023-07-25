import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./main-page.css";
import { useLogOutMutation, useGetTokenQuery } from "../app/authApi";
import leaf from "./leaf.svg";

function Nav() {
  const [logout, { data }] = useLogOutMutation();
  const { data: currentUser } = useGetTokenQuery();
  const navigate = useNavigate();

  const [isGardenDropdownOpen, setIsGardenDropdownOpen] = useState(false);

  const [isPlantsDropdownOpen, setIsPlantsDropdownOpen] = useState(false);

  useEffect(() => {
    if (data) {
      navigate("/");
      window.location.reload();
    }
  }, [data, navigate]);

  const handleGardenNavLinkClick = () => {
    setIsGardenDropdownOpen(false);
  };

  const handlePlantsNavLinkClick = () => {
    setIsPlantsDropdownOpen(false);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          <img src={leaf} alt="SEEDLING Logo" style={{ height: '90px', marginRight: '30px' }} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav nav">
            {/* Left-side navigation items */}
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/"
                style={{ fontFamily: "'Work Sans', sans-serif" }}
              >
                Home
              </NavLink>
            </li>
            {currentUser && (
              <>
                <li className="nav-item" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <NavLink
                    className="nav-link"
                    to="/identify"
                    onClick={handleGardenNavLinkClick}
                  >
                    Identify a Plant
                  </NavLink>
                </li>
                <li className="nav-item dropdown" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="/gardens"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => setIsGardenDropdownOpen(!isGardenDropdownOpen)}
                  >
                    Garden
                  </NavLink>
                  <ul className={`dropdown-menu ${isGardenDropdownOpen ? "show" : ""}`}>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="gardens"
                        onClick={handleGardenNavLinkClick}
                      >
                        My Gardens
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="gardens/create"
                        onClick={handleGardenNavLinkClick}
                      >
                        Start a Garden
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="tasks"
                        onClick={handleGardenNavLinkClick}
                      >
                        Tasks
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="/plants"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => setIsPlantsDropdownOpen(!isPlantsDropdownOpen)}
                  >
                    Plants
                  </NavLink>
                  <ul className={`dropdown-menu ${isPlantsDropdownOpen ? "show" : ""}`}>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="plants"
                        onClick={handlePlantsNavLinkClick}
                      >
                        My Plants
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="plants/create"
                        onClick={handlePlantsNavLinkClick}
                      >
                        Plant-a-Plant
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="journals"
                  >
                    Garden Journals
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* Right-side authentication items */}
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <li className="nav-item" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                <NavLink className="nav-link" onClick={logout}>
                  Log Out
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <NavLink
                    className="nav-link"
                    to="/accounts/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item" style={{ fontFamily: "'Work Sans', sans-serif" }}>
                  <NavLink
                    className="nav-link"
                    to="/accounts/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
