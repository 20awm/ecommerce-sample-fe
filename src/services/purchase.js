import axios from "axios";

const api = process.env.NEXT_PUBLIC_API; // Assuming you've set this environment variable

export async function purchaseOrder(paymentRequestBody) {
  try {
    const response = await axios.post(`${api}/orders/purchase`, paymentRequestBody);
    return response.data; // Assuming your API returns relevant data
  } catch (error) {
    console.error("Error purchasing order:", error);
    throw error; // Rethrow the error for handling in your component
  }
}
