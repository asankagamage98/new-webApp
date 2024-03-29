"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { setUser } from "@/redux/features/Auth/loginSlice";
import { Button, Label, TextInput } from "flowbite-react";

function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //get env
  const LOGIN_API = process.env.NEXT_PUBLIC_USER_API;

  const registerbtn = () => {
    router.push("/register");
  };

  const [login, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginForm({ ...login, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${LOGIN_API}login`, login);
      const { user, token } = res.data;
      dispatch(setUser({ user, token }));

      // Show success toast
      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "successfully logged..",
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        toast: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).then(() => {
        // Redirect to news page after the user clicks "OK" on the success toast
        router.push("/");
      });
    } catch (error) {
      console.error(error);
      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error loging. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <form action="" onSubmit={submit} className="lg:w-2/4 p-3">
        <div className="w-full font-bold text-2xl  mx-auto">
          <p className="">SIGN IN</p>
        </div>
        <div className="mt-3 form-control w-full mb-2">
          <div className="mb-2 block">
            <Label htmlFor="password" value="User Name" />
          </div>
          <TextInput
            onChange={handleLogin}
            name="email"
            type="email"
            placeholder="Input user name (email)"
            required
          />
        </div>
        <div className="form-control w-full">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>

          <TextInput
            onChange={handleLogin}
            name="password"
            type="password"
            placeholder="Input password"
            required
          />
        </div>
        <div className="w-full mt-5 ">
          <Button type="submit" className="w-full" color="dark" pill>
            Sign In
          </Button>
        </div>

        <div className="w-full text-center mt-5">
          <Button
            onClick={registerbtn}
            className="w-full"
            color="light"
            pill
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
