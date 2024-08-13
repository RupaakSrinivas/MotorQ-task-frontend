import { useEffect, useState } from "react";
import { handleGetVehicles } from "../../../utils/vehicles";
import { vehicles } from "../../../types/vehicles";

export default function Assignments() {
  const [vehicleData, setVehicleData] = useState<vehicles[]>([]);

  const [searchBy, setSearchBy] = useState("make");
  const [searchValue, setSearchValue] = useState("");

  const getVehicles = async (params: object) => {
    try {
      const response: vehicles[] = await handleGetVehicles(params);
      setVehicleData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Employees";
    getVehicles({});
  }, []); 

  return (
    <div className="bg-primary-bg h-full w-full p-4 text-primary-text">
      <h1 className="text-2xl font-semibold mb-4">Employees</h1>
      <div className="w-full p-2 flex flex-col gap-4 md:flex-row items-center justify-start">
        <div className="flex flex-row gap-4 items-center">
          <label className="text-accent-text">Search By:</label>
          <select
            className="bg-secondary-bg p-2 rounded-md"
            onChange={(e) => setSearchBy(e.target.value)}
            defaultValue={"email"}
          >
            <option value="make">make</option>
            <option value="model">model</option>
            <option value="plate_number">plate_number</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="p-2 rounded-md bg-secondary-bg"
          />
          <button 
            onClick={() => getVehicles({ [searchBy]: searchValue })}
            className="bg-secondary-bg p-2 border border-accent-bg rounded-md">
            Search
          </button>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Make</th>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">Plate Number</th>
          </tr>
        </thead>
        <tbody>
          {vehicleData.length > 0 ? (
            vehicleData.map((vehicle, index) => (
              <tr key={index}>
                <td className="border border-accent-bg px-4 py-2">{vehicle.id}</td>
                <td className="border border-accent-bg px-4 py-2">{vehicle.make}</td>
                <td className="border border-accent-bg px-4 py-2">{vehicle.model}</td>
                <td className="border border-accent-bg px-4 py-2">{vehicle.plate_number}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2" colSpan={5}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
