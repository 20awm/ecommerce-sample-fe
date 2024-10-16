import React from "react";
import Link from "next/link";

const AuthLayout = ({ title, desc, children, type = "login" }) => {
  return (
    <>
      <div className="rounded-lg bg-gradient-to-r from-violet-500 via-blue-500 to bg-sky-600 p-1 shadow-xl">
        <div className="max-w-xs border rounded-lg p-8 bg-white">
          <h1 className="text-3xl font-bold mb-2 text-blue-500">{title}</h1>
          <p className="font-medium text-slate-500 mb-4">{desc}</p>
          {children}
          {/* {type === "login" ? (
            <p className="text-sm text-center mt-2">
              {`Don't have an account? `}
              <Link
                href="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Register
              </Link>
            </p>
          ) : (
            <p className="text-sm text-center mt-2">
              {`Already have an account? `}
              <Link href="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </p>
          )} */}

          <p className="text-sm text-center mt-2">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              href={type === "login" ? "/register" : "/login"}
              className="text-blue-500 hover:text-blue-700"
            >
              {type === "login" ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
