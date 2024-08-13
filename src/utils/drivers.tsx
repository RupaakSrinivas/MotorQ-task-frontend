/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest, postRequest } from "./axiosfunctions";
import { drivers } from "../types/drivers";

export async function handleGetDrivers(params: any): Promise<drivers[]> {
  try {
    const response = await getRequest("/drivers", params);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function handleAddDriver(params: any) {
  try {
    const response = await postRequest("/drivers", params);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
