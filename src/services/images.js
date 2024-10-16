import axios from "axios";

const api = process.env.NEXT_PUBLIC_API;

export async function fetchImage(productId) {
  try {
    const response = await axios.get(`${api}/products/${productId}/image`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}