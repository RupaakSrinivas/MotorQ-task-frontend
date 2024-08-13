import { useEffect, useState } from "react";
import { handleGetAssignments } from "../../../utils/assignments";
import { assignments } from "../../../types/assignments";
import { useNavigate } from "react-router-dom";

export default function Assignment() {
  const [assignment, setAssignment] = useState<assignments[]>([]);
  const navigate = useNavigate();

  const [searchBy, setSearchBy] = useState("email");
  const [searchValue, setSearchValue] = useState("");

  const getAssignments = async (params: object) => {
    try {
      const response: assignments[] = await handleGetAssignments(params);
      setAssignment(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Sorties";
    getAssignments({});
  }, []);

  return (
    <div className="bg-primary-bg h-full w-full p-4 text-primary-text">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
      <div className="w-full p-2 flex flex-col gap-4 md:flex-row items-center justify-between">
        <div className="flex flex-row gap-4 items-center">
          <label className="text-accent-text">Search By:</label>
          <select
            className="bg-secondary-bg p-2 rounded-md"
            onChange={(e) => setSearchBy(e.target.value)}
            defaultValue={"email"}
          >
            <option value="driver_id">driver_id</option>
            <option value="vehicle_id">vehicle_id</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="p-2 rounded-md bg-secondary-bg"
          />
          <button
            onClick={() => getAssignments({ [searchBy]: searchValue })}
            className="bg-secondary-bg p-2 border border-accent-bg rounded-md"
          >
            Search
          </button>
        </div>
        <button
          className="bg-accent-bg text-accent-text p-2 px-4 rounded-md"
          onClick={() => {
            navigate("/manager/assign/add");
          }}
        >
          Add New Assignment
        </button>
      </div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Driver Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Vehicle Plate_number</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {assignment.length > 0 ? (
            assignment.map((assign, index) => (
              <tr key={index}>
                <td className="border border-accent-bg px-4 py-2">
                  {assign.driver.name}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {assign.driver.email}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {assign.vehicle.plate_number}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {assign.start_time}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {assign.end_time}
                </td>
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
