"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";

function page() {
  const router = useRouter();

  //get env
  const USER_API = process.env.NEXT_PUBLIC_USER_API;

  const login = () => {
    router.push("/auth");
  };
  // ----------------------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API}create`, form);
      const data = res.data;
      console.log(data);
      // Show success toast
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "News created successfully!",
      }).then((result) => {
        // Redirect to the login page after the user clicks "OK" on the success toast
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          router.push("/auth");
        }
      });
    } catch (error) {
      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create news. Please try again later.",
      });
      console.error("Error creating news:", error);
    }
  };

  return (
    <div className="  h-screen bg-white text-black w-full md:w-3/4 lg:w-1/3 max-w-lg mx-auto p-4 pb-4 md:p-6 lg:p-8 rounded-lg shadow-xl flex flex-col justify-center items-center">
      <div className="mx-auto max-w-xs">
        <form action="" onSubmit={submit}>
          <div className="w-full font-bold text-2xl text-center">
            <p className="">SIGN UP</p>
          </div>
          <div className="mt-3 form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              onChange={handleFormChanges}
              name="name"
              type="text"
              placeholder="Input user name"
              required
              className="font-normal mt-2 input input-bordered w-full h-8 rounded-md"
            />
          </div>
          <div className="mt-3 form-control w-full mb-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onChange={handleFormChanges}
              name="email"
              type="email"
              placeholder="Input user email"
              required
              className="font-normal mt-2 input  input-bordered w-full h-8 rounded-md"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              onChange={handleFormChanges}
              name="password"
              type="password"
              placeholder="Input password"
              required
              className="font-normal mt-2 input input-bordered w-full h-8 rounded-md"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Conform Password</span>
            </label>
            <input
              onChange={handleFormChanges}
              name="confirmPassword"
              type="password"
              placeholder="enter conform passowrd"
              required
              className="font-normal mt-2 input  input-bordered w-full h-8 rounded-md"
            />
          </div>
          <div className="w-full mt-5 ">
            <Button
              type="submit"
              className="w-full"
              gradientDuoTone="purpleToBlue"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="w-full text-center mt-5">
          <Button
            type=""
            onClick={login}
            className="w-full"
            gradientMonochrome="success"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
