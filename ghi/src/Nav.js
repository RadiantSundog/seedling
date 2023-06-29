import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" href="#">
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" href="#">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="#">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="#">
                Sign Up
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
                  <NavLink className="dropdown-item" href="#">
                    My Gardens
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" href="#">
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
                  <NavLink className="dropdown-item" href="#">
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
              <NavLink className="nav-link active" aria-current="page" href="#">
                Garden Journals
              </NavLink>
            </li>
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
