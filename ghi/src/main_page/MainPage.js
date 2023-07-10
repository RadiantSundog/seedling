import { NavLink } from "react-router-dom";
import "./main-page.css";

function MainPage() {
  return (
    <div className="main-page">
      <div className="text-left page-info">
        <div className="row row-cols-2">
          <div className="col">
            <h1 className="page-title">Seedling</h1>
            <h4 className="page-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h4>
          </div>
          <div className="col">
            <img
              src="https://i.pinimg.com/474x/c2/df/2e/c2df2eb58d9cabc03ee2d2156e36b479.jpg"
              alt="plant-pic"
              className="title-pic"
            />
          </div>
        </div>

        <div className="row main-page-button">
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

      <div className="page-problem">
        <p className="direction-title">PROBLEMS</p>
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card text-center h-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/523/015/original/simple-leaf-plant-hipster-circle-logo-symbol-icon-graphic-design-vector.jpg"
                className="card-img-top"
                alt="solution-icon"
              />
              <div className="card-body">
                <h5 className="card-title home-card-title">Problem 1</h5>
                <p className="card-text home-card-text">
                  Difficulty in managing watering schedules in a busy lifestyle.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/523/015/original/simple-leaf-plant-hipster-circle-logo-symbol-icon-graphic-design-vector.jpg"
                className="card-img-top"
                alt="ask icon"
              />
              <div className="card-body">
                <h5 className="card-title home-card-title">Problem 2</h5>
                <p className="card-text home-card-text">
                  Finding and identifying plants for purchase or planting.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/523/015/original/simple-leaf-plant-hipster-circle-logo-symbol-icon-graphic-design-vector.jpg"
                className="card-img-top"
                alt="solution-icon"
              />
              <div className="card-body">
                <h5 className="card-title home-card-title">Problem 3</h5>
                <p className="card-text home-card-text">
                  Lack of knowledge regarding which plants are suitable for
                  individual use cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-solution">
        <p className="direction-title">SOLUTIONS</p>
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card text-center h-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/523/015/original/simple-leaf-plant-hipster-circle-logo-symbol-icon-graphic-design-vector.jpg"
                className="card-img-top"
                alt="solution-icon"
              />
              <div className="card-body">
                <h5 className="card-title home-card-title">Solution 1</h5>
                <p className="card-text home-card-text">
                  Implement a scheduling feature that allows users to set up
                  automated watering schedules for their plants. This feature
                  can be customizable to accommodate different plant types and
                  watering requirements.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/523/015/original/simple-leaf-plant-hipster-circle-logo-symbol-icon-graphic-design-vector.jpg"
                className="card-img-top"
                alt="ask icon"
              />
              <div className="card-body">
                <h5 className="card-title home-card-title">Solution 2</h5>
                <p className="card-text home-card-text">
                  Integrate a plant identification feature that enables users to
                  take pictures of plants they come across or have in mind. The
                  application can then provide information about the plant,
                  including its name, care instructions, and where to purchase
                  it.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center h-100">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/523/015/original/simple-leaf-plant-hipster-circle-logo-symbol-icon-graphic-design-vector.jpg"
                className="card-img-top"
                alt="solution-icon"
              />
              <div className="card-body">
                <h5 className="card-title home-card-title">Solution 3</h5>
                <p className="card-text home-card-text">
                  Develop a personalized plant recommendation system based on
                  user preferences, environmental conditions, and lifestyle
                  factors. The system can suggest plants that are well-suited to
                  the user's specific needs and provide relevant information
                  about each recommended plant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="carouselExampleIndicators" className="carousel slide">
        <p className="direction-title">MEET OUR TEAM</p>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://st4.depositphotos.com/9998432/23741/v/600/depositphotos_237418842-stock-illustration-person-gray-photo-placeholder-woman.jpg"
              className="d-block team-pic mx-auto"
              alt="Linda"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg"
              className="d-block team-pic mx-auto"
              alt="Jonny"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://st4.depositphotos.com/9998432/23741/v/600/depositphotos_237418842-stock-illustration-person-gray-photo-placeholder-woman.jpg"
              className="d-block team-pic mx-auto"
              alt="Krystin"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://st4.depositphotos.com/9998432/22597/v/450/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg"
              className="d-block team-pic mx-auto"
              alt="Alex"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container text-left">
        <div className="row row-cols-3">
          <div className="col">About Us</div>
          <div className="col">Contacts</div>
          <div className="col">Useful Links</div>
          <div className="col">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div className="col">Contacts</div>
          <div className="col">Useful Links</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
