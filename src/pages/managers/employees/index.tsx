import { useEffect, useState } from "react";
import { handleGetDrivers } from "../../../utils/drivers";
import { drivers } from "../../../types/drivers";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const [driverData, setDriversData] = useState<drivers[]>([]);
  const navigate = useNavigate();

  const [searchBy, setSearchBy] = useState("email");
  const [searchValue, setSearchValue] = useState("");

  const getDrivers = async (params: object) => {
    try {
      const response: drivers[] = await handleGetDrivers(params);
      setDriversData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Employees";
    getDrivers({});
  }, []);

  return (
    <div className="bg-primary-bg h-full w-full p-4 text-primary-text">
      <h1 className="text-2xl font-semibold mb-4">Employees</h1>
      <div className="w-full p-2 flex flex-col gap-4 md:flex-row items-center justify-between">
        <div className="flex flex-row gap-4 items-center">
          <label className="text-accent-text">Search By:</label>
          <select
            className="bg-secondary-bg p-2 rounded-md"
            onChange={(e) => setSearchBy(e.target.value)}
            defaultValue={"email"}
          >
            <option value="email">email</option>
            <option value="phone">phone</option>
            <option value="name">name</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="p-2 rounded-md bg-secondary-bg"
          />
          <button 
            onClick={() => getDrivers({ [searchBy]: searchValue })}
            className="bg-secondary-bg p-2 border border-accent-bg rounded-md">
            Search
          </button>
        </div>
        <button
          className="bg-accent-bg text-accent-text p-2 rounded-md"
          onClick={() => {
            navigate("/manager/drivers/add");
          }}
        >
          Add New Driver
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {driverData.length > 0 ? (
            driverData.map((driver, index) => (
              <tr key={index}>
                <td className="border border-accent-bg px-4 py-2">{driver.id}</td>
                <td className="border border-accent-bg px-4 py-2">{driver.name}</td>
                <td className="border border-accent-bg px-4 py-2">{driver.email}</td>
                <td className="border border-accent-bg px-4 py-2">{driver.phone}</td>
                <td className="border border-accent-bg px-4 py-2">{driver.location}</td>
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
