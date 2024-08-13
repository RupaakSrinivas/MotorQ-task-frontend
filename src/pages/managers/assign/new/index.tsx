import { useEffect, useState } from "react";
import { handleGetVehicles } from "../../../../utils/vehicles";
import { vehicles } from "../../../../types/vehicles";

import { handleGetDrivers } from "../../../../utils/drivers";
import { drivers } from "../../../../types/drivers";

import { handleCreateRequest } from "../../../../utils/requests";

import { toast } from "react-toastify";

export default function Assignment() {
  const [vehicleData, setVehicleData] = useState<vehicles[]>([]);
  const [driverData, setDriversData] = useState<drivers[]>([]);

  const [vehicleSearchBy, setVehicleSearchBy] = useState("make");
  const [vehicleSearchValue, setVehicleSearchValue] = useState("");

  const [driverSearchBy, setDriverSearchBy] = useState("email");
  const [driverSearchValue, setDriverSearchValue] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedVehicle, setSelectedVehicle] = useState<number>();
  const [selectedDriver, setSelectedDriver] = useState<number[]>([]);

  const getVehicles = async (params: object) => {
    try {
      const response: vehicles[] = await handleGetVehicles(params);
      setVehicleData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getDrivers = async (params: object) => {
    try {
      const response: drivers[] = await handleGetDrivers(params);
      setDriversData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Assignments";
    getVehicles({});
    getDrivers({});
  }, []);

  const newAssignment = async () => {
    try {
      const response = await handleCreateRequest({
        vehicle_id: selectedVehicle,
        driver_ids: selectedDriver,
        start_time: startDate,
        end_time: endDate,
      });
      toast.success(response, { toastId: response });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, { toastId: error.message });
    }
  };

  return (
    <div className="w-full h-full bg-primary-bg text-primary-text p-4 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>

      {/* Input Section */}

      <div className="w-full p-2 flex flex-col gap-4 md:flex-row items-center justify-between">
        <div className="flex flex-row gap-4 items-center">
          <label className="text-accent-text">Search Vehicles By:</label>
          <select
            className="bg-secondary-bg p-2 rounded-md"
            onChange={(e) => setVehicleSearchBy(e.target.value)}
            defaultValue={"make"}
          >
            <option value="make">make</option>
            <option value="model">model</option>
            <option value="plate_number">plate_number</option>
          </select>
          <input
            onChange={(e) => setVehicleSearchValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="p-2 rounded-md bg-secondary-bg"
          />
          <button
            onClick={() =>
              getVehicles({ [vehicleSearchBy]: vehicleSearchValue })
            }
            className="bg-secondary-bg p-2 border border-accent-bg rounded-md"
          >
            Search
          </button>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <label className="text-accent-text">Search Drivers By:</label>
          <select
            className="bg-secondary-bg p-2 rounded-md"
            onChange={(e) => setDriverSearchBy(e.target.value)}
            defaultValue={"email"}
          >
            <option value="email">email</option>
            <option value="phone">phone</option>
            <option value="name">name</option>
          </select>
          <input
            onChange={(e) => setDriverSearchValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="p-2 rounded-md bg-secondary-bg"
          />
          <button
            onClick={() => getDrivers({ [driverSearchBy]: driverSearchValue })}
            className="bg-secondary-bg p-2 border border-accent-bg rounded-md"
          >
            Search
          </button>
        </div>
      </div>

      <div className="w-full p-2 flex flex-col gap-4 md:flex-row items-center justify-between">
        <div className=" flex flex-row gap-4">
          <div className="flex flex-row gap-4 items-center">
            <label className="text-accent-text">Start Date:</label>
            <input
              onChange={(e) => setStartDate(e.target.value)}
              type="datetime-local"
              className="p-2 rounded-md bg-secondary-bg"
            />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <label className="text-accent-text">End Date:</label>
            <input
              onChange={(e) => setEndDate(e.target.value)}
              type="datetime-local"
              className="p-2 rounded-md bg-secondary-bg"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => newAssignment()}
            className="bg-accent-bg p-2 px-6 border border-accent-bg rounded-md"
          >
            Request Driver
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-row gap-4 items-start w-full">
        <div className="grid grid-cols-4 w-full gap-4">
          {vehicleData.length > 0 ? (
            vehicleData.map((vehicle, index) => (
              <button
                key={index}
                onClick={() => setSelectedVehicle(vehicle.id)}
                className={`
                    bg-secondary-bg p-4 col-span-4 flex flex-row justify-around border border-accent-bg rounded-md transition-all
                    ${
                      selectedVehicle === vehicle.id
                        ? "bg-slate-400"
                        : "hover:bg-slate-200"
                    }
                    `}
              >
                <div>ID: {vehicle.id}</div>
                <div>Make: {vehicle.make}</div>
                <div>Model: {vehicle.model}</div>
                <div>Plate Number: {vehicle.plate_number}</div>
              </button>
            ))
          ) : (
            <div className="bg-secondary-bg p-4 col-span-4 border border-accent-bg rounded-md">
              No data found
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 w-full gap-4">
          {driverData.length > 0 ? (
            driverData.map((driver, index) => (
              <button
                key={index}
                onClick={() => 

                  setSelectedDriver((prev) => {
                    if (prev?.includes(driver.id)) {
                      return prev?.filter((id) => id !== driver.id);
                    } else {
                      return [...(prev || []), driver.id];
                    }
                  })

                }
                // disabled={true}
                className={`
                    bg-secondary-bg p-4 border col-span-3 flex flex-row justify-around border-accent-bg rounded-md
                    ${
                      selectedDriver.includes(driver.id)
                        ? "bg-slate-400"
                        : "hover:bg-slate-200"
                    }
                    `}
              >
                <div>ID: {driver.id}</div>
                <div>Name: {driver.name}</div>
                <div>Email: {driver.email}</div>
              </button>
            ))
          ) : (
            <div className="bg-secondary-bg p-4 border border-accent-bg rounded-md">
              No data found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
