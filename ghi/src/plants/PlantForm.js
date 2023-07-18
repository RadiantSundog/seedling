import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "../ErrorNotification";
import { useCreatePlantsMutation, useGetGardensQuery } from "../app/authApi";

function PlantForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [plant_picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [garden_id, setGardenId] = useState("");
  const [error, setError] = useState("");
  const [createPlant, result] = useCreatePlantsMutation();
  const { data: gardens, isError: gardenError } = useGetGardensQuery();
  console.log(gardens);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createPlant({
        name,
        plant_picture,
        description,
        garden_id: garden_id,
      });
      navigate("/plants");
    } catch (error) {
      setError(error.message);
    }
  }

  if (gardenError) {
    return <div>Error loading gardens</div>;
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Plant A Plant</h1>
          <ErrorNotification error={error} />
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                placeholder="Plant's Name"
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
              <input
                placeholder="Plant's Picture Link"
                required
                type="text"
                name="plant_picture"
                id="plant_picture"
                value={plant_picture || ""}
                onChange={(e) => setPicture(e.target.value)}
                className="form-control"
              />
              <label htmlFor="plant_picture">Picture</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                placeholder="Plant's Description"
                required
                type="text"
                name="description"
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="mb-3">
              <select
                required
                name="garden_id"
                id="garden_id"
                className="form-select"
                value={garden_id}
                onChange={(e) => setGardenId(e.target.value)}
              >
                <option value="">Choose a Garden</option>
                {gardens &&
                  gardens.map((garden) => {
                    return (
                      <option key={garden.id} value={garden.id}>
                        {garden.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PlantForm;
