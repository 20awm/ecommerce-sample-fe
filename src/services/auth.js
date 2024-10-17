import axios from "axios";
import { jwtDecode } from "jwt-decode";

// console.log("Verify jwtDecode functionaility: ", jwtDecode); // Log to verify the import

export async function login(payload) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/auth/login`,
      payload
    );
    console.log("RESPONSE DATA:", response.data.token);

    return { status: true, token: response.data.token };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
}

export const getEmail = (token) => {
  console.log("Token:", token);
  const decodedToken = jwtDecode(token);
  localStorage.setItem("role", decodedToken.role);
  return decodedToken.name;
};
