import { NavLink } from "react-router-dom";
import "./main-page.css";
import OrangePot from "./OrangePot.svg";

function MainPage() {
  return (
    <div className="main-page">
      <div className="text-center page-info">
        <div className="row row-cols-2">
          <div className="col">
            <h1 className="page-title">Welcome to Seedling</h1>
            <h4 className="page-description">
              Whether you're tending to a small balcony garden or transforming
              acres of land, Seedling is your go-to resource for all things
              gardening, planting, and planning. Join our community of
              passionate gardeners and embark on a rewarding journey of
              cultivating beauty and tranquility in your indoor or outdoor
              spaces.
            </h4>
            <h6>
              Start exploring today and let your gardening aspirations bloom
              with GreenThumb Gardening!
            </h6>
          </div>
          <div className="col">
            <img
              src={OrangePot}
              alt="seedling-logo"
              height="500"
              width="500"
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
              Login
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
                <h5 className="card-title home-card-title">Busy Schedule?</h5>
                <p className="card-text home-card-text">
                  Forgetting to water your plants happens. Over watering your plants happens, too. Don't turn your house into a desert or a swamp.
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
                <h5 className="card-title home-card-title">Shady Apartment?</h5>
                <p className="card-text home-card-text">
                  Indoor plants need plenty of sunlight and healthy air circulation to thrive. Don't let a cool room ruin the vibe.
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
                <h5 className="card-title home-card-title">Need an Extra Hand?</h5>
                <p className="card-text home-card-text">
                  Or, maybe another thumb. Quit asking your co-worker or neighbor about plants, pots, and soil. Let's do some research to get your own green thumb growing.
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
                <h5 className="card-title home-card-title">HydroHarmony: <br></br>
                Smart Plant Care for Busy Beings</h5>
                <p className="card-text home-card-text">
                  HydroHarmony is our innovative smart plant care system that takes the stress out of watering your plants. With its intelligent technology, it ensures your plants receive optimal hydration, leaving you free to focus on your busy schedule while still maintaining a thriving green oasis.
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
                <h5 className="card-title home-card-title">ShadeScape: <br></br> Transforming Shadows into Lush Delights</h5>
                <p className="card-text home-card-text">
                  Step into the enchanting world of ShadeScape, where we offer a selection of captivating low-light indoor plants that will flourish even in the shadiest corners of your apartment. Combined with our expert tips on enhancing air circulation, you can create an ambiance that exudes tranquility and natural beauty.
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
                <h5 className="card-title home-card-title">LeafWhisper: <br></br>
                Empowering You to Unleash Your Inner Green Thumb</h5>
                <p className="card-text home-card-text">
                  Say farewell to relying on others for plant advice with LeafWhisper, your trusty companion in the world of plants. From comprehensive plant care guides to personalized recommendations, LeafWhisper equips you with the knowledge and confidence to nurture your plants, choose the perfect pots, and create thriving soil compositions—all on your own terms.
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
          <div className="col text-center direction-subtitle">About Us</div>
          <div className="col text-center direction-subtitle">Contacts</div>
          <div className="col text-center direction-subtitle">Useful Links</div>
          <div className="col text-center">
            At Seedling, our mission is to empower and inspire plant enthusiasts
            like you to create thriving gardens that bring joy, beauty, and
            connection to nature. We believe that with the right knowledge and
            tools, anyone can develop their gardening skills and create stunning
            landscapes that flourish in any environment.
          </div>
          <div className="col text-center">
            Telephone: 1(800) SEE-DLIN <br></br>
            Email: <a href="mailto:info@seedling.com">info@seedling.com</a>
          </div>
          <div className="col text-center">
            <a
              href="https://en.wikipedia.org/wiki/Arboretum"
              target="_blank"
              rel="noopener noreferrer"
            >
              Arboretum
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Bonsai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bonsai
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Cultigen"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cultigen
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Eyecatchers"
              target="_blank"
              rel="noopener noreferrer"
            >
              Eyecatchers
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Garden_writing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Garden writing
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Grow_bag"
              target="_blank"
              rel="noopener noreferrer"
            >
              Growbag
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Introduced_species"
              target="_blank"
              rel="noopener noreferrer"
            >
              Introduced species
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Impact_gardening"
              target="_blank"
              rel="noopener noreferrer"
            >
              Impact gardening
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/List_of_gardening_topics"
              target="_blank"
              rel="noopener noreferrer"
            >
              List of gardening topics
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/List_of_horticulture_and_gardening_books"
              target="_blank"
              rel="noopener noreferrer"
            >
              List of horticulture and gardening books
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/List_of_professional_gardeners"
              target="_blank"
              rel="noopener noreferrer"
            >
              List of professional gardeners
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Master_gardener_program"
              target="_blank"
              rel="noopener noreferrer"
            >
              Master gardener program
            </a>
            <br></br>
            <a
              href="https://en.wikipedia.org/wiki/No-dig_gardening"
              target="_blank"
              rel="noopener noreferrer"
            >
              No-dig gardening
            </a>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;