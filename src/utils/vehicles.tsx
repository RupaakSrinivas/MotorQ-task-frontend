/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequest } from "./axiosfunctions";
import { vehicles } from "../types/vehicles";

export async function  handleGetVehicles(params: object ): Promise<vehicles[]> {
  try {
    const response = await getRequest("/vehicles", params);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};