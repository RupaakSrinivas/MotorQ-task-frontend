import axios from "axios";

const Base_url = import.meta.env.VITE_BASE_URL;

export async function getProfile(email: string) {
  try {
    const data  = await axios.get(`${Base_url}/drivers`, {params: {email}});
    return data.data[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
