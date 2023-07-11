import React, { useState, useEffect } from "react";

function GardenDetail() {
  const [garden, setGarden] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const response = await fetch("");
    if (response.ok) {
      const data = await response.json();
      setGarden(data.garden);
    } else {
      console.error(response);
    }
  };
  return (
    <>
      <h1>{garden}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {gardens.map((garden) => {
            return (
              <tr key={garden.id}>
                <td>{garden.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default GardenList;
