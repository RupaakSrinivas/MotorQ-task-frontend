import { useEffect, useState } from "react";
import {
  handleGetAssignments,
  handleAcceptRequest,
  handleRejectRequest,
} from "../../utils/requests";
import { getRequests } from "../../types/requests";
import { authStore } from "../../store/auth";
import { toast } from "react-toastify";

export default function AssigRequests() {
  const [requests, setRequests] = useState<getRequests[]>([]);

  const { id } = authStore();

  const getAssignmentRequests = async (params: object) => {
    try {
        params = {
            driver_id: id
        }
      const response: getRequests[] = await handleGetAssignments(params);
      setRequests(response);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (n: number) => {
    try {
        const params = {
            request_id: n,
            driver_id: id
        }
      const response = await handleAcceptRequest(params);
      toast.success(response, { toastId: response });
        getAssignmentRequests({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, { toastId: error.message });
    }
  };
  
  const rejectRequest = async (n: number) => {
    try {
        const params = {
            request_id: n,
            driver_id: id
        }
      const response = await handleRejectRequest(params);
      toast.success(response, { toastId: response });
      getAssignmentRequests({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message, { toastId: error.message });
    }
  };

  useEffect(() => {
    document.title = "Requests";
    getAssignmentRequests({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-primary-bg h-full w-full p-4 text-primary-text">
      <h1 className="text-2xl font-semibold mb-4">Employees</h1>
      <div className="w-full p-2 flex flex-col gap-4 md:flex-row items-center justify-between">
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Vehicle_ID</th>
            <th className="px-4 py-2">Start_Time</th>
            <th className="px-4 py-2">End_Time</th>
            <th className="px-4 py-2">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={index}>
                <td className="border border-accent-bg px-4 py-2">
                  {request.id}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {request.vehicle_id}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {request.start_time}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  {request.end_time}
                </td>
                <td className="border border-accent-bg px-4 py-2">
                  <button
                    onClick={() => {
                      acceptRequest(request.id);
                    }}
                    className="bg-[#2173fd] hover:bg-[#2173fdcf] text-accent-text p-2 px-4 mx-4 rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      rejectRequest(request.id)
                    }
                    className="bg-red-400 hover:bg-opacity-70 text-accent-text p-2 px-4 mx-4 rounded-md"
                  >
                    Reject
                  </button>
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
