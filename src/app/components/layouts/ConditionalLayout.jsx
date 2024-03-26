"use client"

import NavBar from "../navbar/NavBar";

const { usePathname } = require("next/navigation");

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();
  
    return (
      <>
        {pathname == "/" || pathname == "/register" ? (
          <div>{children}</div>
        ) : (
          <div className=" flex max-w-screen w-full flex-col m-0 ">
            <div className="flex flex-col w-full m-0">
              <NavBar />
            </div>
            <div className="bg-white flex max-w-screen justify-between w-full">
              <div className="bg-white w-full pt-2">{children}</div>
            </div>
          </div>
        )}
      </>
    );
  }