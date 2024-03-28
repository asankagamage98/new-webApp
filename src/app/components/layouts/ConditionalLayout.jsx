"use client"

import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";
import { useEffect } from "react";

const { usePathname, useRouter } = require("next/navigation");

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();

    const user = useSelector((state) => state.login.user);
    const router = useRouter();
    
    useEffect(() => {
        if (!user) {
            //router.push('/auth');
        }
      }, [user, router]); 
    
  
    return (
      <>
        { pathname == "/register" || pathname == "/auth" ? (
          <div>{children}</div>
        ) : (
          <div className=" flex max-w-screen w-full flex-col m-0 ">
            <div className="flex flex-col w-full m-0">
              <NavBar />
            </div>
            <div className="bg-white flex max-w-screen h-auto justify-between w-full">
              <div className="bg-white w-full pt-2">{children}</div>
            </div>
          </div>
        )}
      </>
    );
  }