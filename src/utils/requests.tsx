import { getRequest, postRequest } from "./axiosfunctions";

export async function handleGetAssignments(params: object) {
  try {
    const response = getRequest("/assignment-requests", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleAcceptRequest(params: object) {
  try {
    const response = postRequest("/assignment-requests/accept", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleCreateRequest(params: object) {
  try {
    const response = postRequest("/assignment-requests", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleRejectRequest(params: object) {
  try {
    const response = postRequest("/assignment-requests/reject", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
