import React, { useState, useEffect } from "react";

function PlantIdList() {
  const [plant_ids, setPlantIds] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const response = await fetch("");
    if (response.ok) {
      const data = await response.json();
      setPlantIds(data.plant_ids);
    } else {
      console.error(response);
    }
  };
  return (
    <>
      <h1>Plants</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {plant_ids.map((plant_id) => {
            return (
              <tr key={plant_id.id}>
                <td>{plant_id.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PlantIdList;
