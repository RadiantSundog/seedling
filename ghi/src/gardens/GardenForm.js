import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../ErrorNotification";
import { useCreateGardensMutation } from "../app/authApi";

function GardenForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [inside, setInside] = useState("");
  const [outside, setOutside] = useState("");
  const [error, setError] = useState("");
  const [createGarden, result] = useCreateGardensMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createGarden({
        name,
        location,
        inside: inside === "inside",
        outside: outside === "outside",
      });
      navigate("/gardens");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Garden</h1>
          <ErrorNotification error={error} />
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder="Garden Name"
                required
                type="text"
                name="name"
                id="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                placeholder="Garden Location Zipcode"
                required
                type="text"
                name="location"
                id="location"
                value={location || ""}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
              ></textarea>
              <label htmlFor="location">Location Zipcode</label>
            </div>
            <div className="form-floating mb-3">
              <ul className="list-unstyled">
                <li>
                  <input
                    type="radio"
                    name="inside"
                    id="inside"
                    value="inside"
                    checked={inside === "inside"}
                    onChange={(e) => setInside(e.target.value)}
                  />
                  <label htmlFor="inside" className="ms-2">
                    Indoor
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="outside"
                    id="outside"
                    value="outside"
                    checked={outside === "outside"}
                    onChange={(e) => setOutside(e.target.value)}
                  />
                  <label htmlFor="outside" className="ms-2">
                    Outdoor
                  </label>
                </li>
              </ul>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GardenForm;
