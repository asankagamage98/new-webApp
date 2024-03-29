"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import Swal from "sweetalert2";

function page() {
  const router = useRouter();

  //get env
  const USER_API = process.env.NEXT_PUBLIC_USER_API;

  const login = (e) => {
    e.preventDefault();
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
    <div className="  h-screen  text-black w-full  lg:w-2/3 mx-auto flex flex-col justify-center items-center">
      <form action="" onSubmit={submit} className=" lg:w-2/4 p-3">
        <div className="w-full font-bold text-2xl  mx-auto  ">
          <p className="">SIGN UP</p>
        </div>
        <div className="mt-3 form-control w-full mb-2">
          <div className="mb-2 block">
            <Label htmlFor="name" value="name" />
          </div>
          <TextInput
            onChange={handleFormChanges}
            name="name"
            type="text"
            placeholder="Input user name"
            required
          />
        </div>
        <div className="mt-3 form-control w-full mb-2">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Gmail" />
          </div>

          <TextInput
            onChange={handleFormChanges}
            name="email"
            type="email"
            required
            placeholder="name@gmail.com"
          />
        </div>
        <div className="form-control w-full mb-2">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>

          <TextInput
            onChange={handleFormChanges}
            name="password"
            type="password"
            placeholder="Input password"
            required
          />
        </div>
        <div className="form-control w-full mb-2">
          <div className="mb-2 block">
            <Label htmlFor="ConformPassword" value="Conform Password" />
          </div>
          <TextInput
            onChange={handleFormChanges}
            name="confirmPassword"
            type="password"
            placeholder="enter conform passowrd"
            required
          />
        </div>
        <div className="w-full mt-5 ">
          <Button
            type="submit"
            className="w-full"
            color="dark" pill
          >
            Register
          </Button>
        </div>

        <div className="w-full text-center mt-5">
          <Button
            type=""
            onClick={login}
            className="w-full"
            color="light" pill
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default page;
