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
              src="https://img.freepik.com/premium-vector/cute-plant-pot-kawaii-character_24877-6342.jpg"
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
                  Difficulty in managing watering schedules in a busy lifestyle.
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
                  Finding and identifying plants for purchase or planting.
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
                  Lack of knowledge regarding which plants are suitable for individual use cases.

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
                  Implement a scheduling feature that allows users to set up automated watering schedules for their plants. This feature can be customizable to accommodate different plant types and watering requirements.
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
                  Integrate a plant identification feature that enables users to take pictures of plants they come across or have in mind. The application can then provide information about the plant, including its name, care instructions, and where to purchase it.
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
              Develop a personalized plant recommendation system based on user preferences, environmental conditions, and lifestyle factors. The system can suggest plants that are well-suited to the user's specific needs and provide relevant information about each recommended plant.
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
