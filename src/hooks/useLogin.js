import React, { useState, useEffect } from "react";
import { getEmail } from "@/services/auth";

const useLogin = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const email = getEmail(token);
      setEmail(email);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return email;
};

export default useLogin;
