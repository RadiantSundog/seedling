import React, { useState, useEffect } from "react";

function GardenList() {
  const [gardens, setGardens] = useState([]);
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    const response = await fetch("");
    if (response.ok) {
      const data = await response.json();
      setGardens(data.gardens);
    } else {
      console.error(response);
    }
  };
  return (
    <>
      <h1>Gardens</h1>
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
