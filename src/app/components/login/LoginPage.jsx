"use client";

import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { setUser } from "@/redux/features/Auth/loginSlice";
import { Button } from "flowbite-react";

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
      router.push("/news");
    } catch (error) {
      alert("Error!");
      console.error(error);
    }
  };

  return (
    <main className="bg-white text-black w-full md:w-3/4 lg:w-1/3 max-w-lg mx-auto p-4 pb-4 md:p-6 lg:p-8 rounded-lg shadow-xl flex flex-col justify-center items-center">
      <div className="mx-auto max-w-sm">
        <form action="" onSubmit={submit}>
          <div className="w-full font-bold text-3xl text-center">
            <p className="">SIGN IN</p>
          </div>
          <div className="mt-3 form-control w-full mb-2">
            <label className="label">
              <span className="label-text font-bold">User Name</span>
            </label>
            <input
              onChange={handleLogin}
              name="email"
              type="email"
              placeholder="Input user name (email)"
              className=" mt-2 input text-black  w-full h-10 rounded-md"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              onChange={handleLogin}
              name="password"
              type="password"
              placeholder="Input password"
              className=" mt-2 input text-black  w-full h-10 rounded-md"
            />
          </div>
          <div className="w-full mt-5 ">
            <Button
              type="submit"
              className="w-full"
              gradientMonochrome="success"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="w-full text-center mt-5">
          <Button
            onClick={registerbtn}
            className="w-full"
            gradientDuoTone="purpleToBlue"
          >
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
