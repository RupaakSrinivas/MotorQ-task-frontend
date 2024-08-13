import { postRequest, getRequest } from "./axiosfunctions";

export async function handleNewAssignment(params: object) {
  try {
    const response = await postRequest("/assignments", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function handleGetAssignments(params: object) {
  try {
    const response = await getRequest("/assignments", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleGetAssigRequests(params: object){
  try {
    const response = await getRequest("/assignment-requests", params);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
