import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_EVENTS;

export async function getEvents() {
  try {
    const response = await axios.get(`${api}/events`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
