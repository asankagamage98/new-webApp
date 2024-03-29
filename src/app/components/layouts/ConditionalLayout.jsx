"use client";

import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";
import { useEffect } from "react";

const { usePathname, useRouter } = require("next/navigation");

export default function ConditionalLayout({ children }) {
  // Get the current
  const pathname = usePathname();
  // Get the user data from Redux store
  const user = useSelector((state) => state.login.user);
  // Router instance for navigation
  const router = useRouter();
  // Redirect to authentication page if user is not logged in
  useEffect(() => {
    if (!user && (pathname == "/create" || pathname.endsWith("/edit"))) {
      router.push("/auth");
    }
  }, [user, router, pathname]);

  return (
    <>
      {pathname == "/register" || pathname == "/auth" ? (
        <div>{children}</div>
      ) : (
        <div className=" flex max-w-screen w-full flex-col m-0 ">
          <div className="flex flex-col w-full m-0">
            <NavBar />
          </div>
          <div className="bg-white flex max-w-screen h-auto justify-between w-full mt-20">
            <div className="bg-white w-full pt-2">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
