import React from "react";
import LoginPage from "../components/login/LoginPage";

export default function page() {
  return (
    <div className="  h-screen  text-black w-full  lg:w-2/3 mx-auto flex flex-col justify-center items-center">
      <LoginPage />
    </div>
  );
}
