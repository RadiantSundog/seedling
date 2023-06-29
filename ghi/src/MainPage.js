import { NavLink } from "react-router-dom";
import "./main-page.css";

function MainPage() {
  return (
    <div>
      <div className="text-left page-info">
        <div className="row row-cols-2">
          <div className="col">
            <h1 className="page-title">Seedling</h1>
            <h3 className="page-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h3>
          </div>
          <div className="col">
            <img
              src="https://www.shutterstock.com/image-vector/cute-happy-funny-succulents-plantscactiflower-260nw-1833438970.jpg"
              alt="math-pic"
              className="title-pic"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <NavLink className="button-look home-button" href="#">
              Sign Up
            </NavLink>
            <NavLink className="button-look home-button" href="#">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>

      <div className="page-info">
        <p className="direction-title">PROBLEMS</p>
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card text-center h-100">
              <img src="#" className="card-img-top" alt="solution-icon" />
              <div className="card-body">
                <h5 className="card-title home-card-title">Problem 1</h5>
                <p className="card-text home-card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img src="#" className="card-img-top" alt="ask icon" />
              <div className="card-body">
                <h5 className="card-title home-card-title">Problem 2</h5>
                <p className="card-text home-card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img src="#" className="card-img-top" alt="solution-icon" />
              <div className="card-body">
                <h5 className="card-title home-card-title">Problem 3</h5>
                <p className="card-text home-card-text">
                  With supporting text below as a natural lead-in to additional
                  content. Put more more more information here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-info">
        <p className="direction-title">SOLUTIONS</p>
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card text-center h-100">
              <img src="#" className="card-img-top" alt="solution-icon" />
              <div className="card-body">
                <h5 className="card-title home-card-title">Solution 1</h5>
                <p className="card-text home-card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img src="#" className="card-img-top" alt="ask icon" />
              <div className="card-body">
                <h5 className="card-title home-card-title">Solution 2</h5>
                <p className="card-text home-card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img src="#" className="card-img-top" alt="solution-icon" />
              <div className="card-body">
                <h5 className="card-title home-card-title">Solution 3</h5>
                <p className="card-text home-card-text">
                  With supporting text below as a natural lead-in to additional
                  content. Put more more more information here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
