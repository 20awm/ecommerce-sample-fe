import axios from "axios";

const api = process.env.NEXT_PUBLIC_API;

export async function getProducts() {
  try {
    const response = await axios.get(`${api}/products`);
    console.log("ROLE: ", response.data.role);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
