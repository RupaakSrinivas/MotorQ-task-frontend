import { handleAddDriver } from "../../../../utils/drivers";

import { toast } from "react-toastify";

export default function AddEmployee() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addDriver = async (e: any) => {
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const work_start_time = e.target.work_start_time.value;
    const work_end_time = e.target.work_end_time.value;
    const location = e.target.location.value;

    try {
      //convert ist to utc
      // const work_end_time =
      const work_start: string = new Date(`01/01/2007 ${work_start_time}`).toUTCString();
      const work_end : string= new Date(`01/01/2007 ${work_end_time}`).toUTCString();

      //extract time from date

      const start_time = work_start.split(" ")[4];
      const end_time = work_end.split(" ")[4];
      //remove seconds

      const start_time_wo_sec = start_time.split(":").slice(0, 2).join(":");
      const end_time_wo_sec = end_time.split(":").slice(0, 2).join(":");

      const response = await handleAddDriver({
        name,
        phone,
        email,
        work_start_time: start_time_wo_sec,
        work_end_time: end_time_wo_sec,
        location,
      });
      toast.success(response, { toastId: response });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, { toastId: error.message });
    }
  };

  return (
    <div className="bg-primary-bg text-primary-text w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Add Employee Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addDriver(e);
        }}
        className="max-w-full mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">
            Phone:
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="work_start_time" className="block mb-2">
            Work Start Time:
          </label>
          <input
            type="time"
            id="work_start_time"
            name="work_start_time"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="work_end_time" className="block mb-2">
            Work End Time:
          </label>
          <input
            type="time"
            id="work_end_time"
            name="work_end_time"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-accent-bg text-white px-4 py-2 rounded-md"
        >
          Add Driver
        </button>
      </form>
    </div>
  );
}
