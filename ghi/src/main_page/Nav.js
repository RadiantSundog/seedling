import { NavLink, useNavigate } from "react-router-dom";
import "./main-page.css";
import { useLogOutMutation, useGetTokenQuery } from "../app/authApi";
import { useEffect } from "react";

function Nav() {
  const [logout, { data }] = useLogOutMutation();
  const { data: currentUser } = useGetTokenQuery;
  console.log(currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
      window.location.reload();
    }
  }, [data, navigate]);

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          SEEDLING
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
          <ul className="navbar-nav nav justify-content-center">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <div>
              {!currentUser ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/identify">
                      Identify a Plant
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" onClick={logout}>
                      Log Out
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Garden
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to="gardens">
                          My Gardens
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="tasks">
                          Tasks
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="gardens/create">
                          Start a Garden
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Plants
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to="plants">
                          My Plants
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" href="#">
                          Plant-a-Plant
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="journals"
                    >
                      Garden Journals
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/accounts/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/accounts/signup">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Nav;