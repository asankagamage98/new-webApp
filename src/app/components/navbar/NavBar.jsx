"use client";

import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../redux/features/Auth/loginSlice";

export default function NavBar() {
  // Initialize dispatch and router hooks
  const dispatch = useDispatch();
  const router = useRouter();

  // Retrieve user data from Redux store
  const user = useSelector((state) => state.login.user);

  // handle logout
  const handleLogOut = async (e) => {
    try {
      // Dispatch an action to clear user data in Redux store
      dispatch(clearUser());
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getAvatarLetters = (str) => {
    if (str === undefined || str === null) {
      return "UN";
    }
    // Split the string into words
    const words = str.trim().split(/\s+/);

    // Get the first character of the first two words
    let initials = "";
    if (words.length > 0) {
      initials += words[0].charAt(0).toUpperCase();
      if (words.length > 1) {
        initials += words[1].charAt(0).toUpperCase();
      }
    }

    return initials;
  };

  return (
    <>
      <Navbar
        fluid
        className="bg-white text-black px-10 fixed top-0 left-0 right-0 z-40 shadow-lg"
      >
        <Navbar.Brand href="/">
          <Logo height={40} />
          {/* <img
          src="/.svg"
          onClick={(e) => router.push("/")}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span
          onClick={(e) => router.push("/")}
          className="self-center whitespace-nowrap text-xl font-semibold "
        >
          TOP NEWS
        </span> */}
        </Navbar.Brand>

        <div className="flex md:order-2">
          {!user && (
            <Button color="light" pill onClick={() => router.push("/auth")}>
              Sign In
            </Button>
          )}
          {user && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  placeholderInitials={getAvatarLetters(user?.name)}
                  rounded
                  bordered
                  color="gray"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            </Dropdown>
          )}
          {/* <Navbar.Toggle/> */}
        </div>
        <Navbar.Collapse className="flex item-end">
          <Navbar.Link href="#" onClick={(e) => router.push("/")}>
            <span className="rounded-full text-white  bg-black  py-2 px-5 hover:bg-zinc-900 duration-75">
              Latest
            </span>
          </Navbar.Link>
          {user && (
            <Navbar.Link href="#" onClick={(e) => router.push("/create")}>
              <span className="rounded-full text-white bg-black py-2 px-5 hover:bg-zinc-900 duration-75">
                Publish
              </span>
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

function Logo({ height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      fill="none"
      viewBox="0 0 1036 436"
    >
      <path
        fill="#000"
        d="M0 0h1036v260c0 97.202-78.798 176-176 176H0V0z"
      ></path>
      <mask
        id="mask0_76_17"
        style={{ maskType: "alpha" }}
        width="1036"
        height="436"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#000"
          d="M0 0h1036v260c0 97.202-78.798 176-176 176H0V0z"
        ></path>
      </mask>
      <g fill="#fff" mask="url(#mask0_76_17)">
        <path
          d="M178.563 -164H256.563V493H178.563z"
          transform="rotate(10.93 178.563 -164)"
        ></path>
        <path d="M131.156 269l35-175h33.5l75.25 126.75-13.25-.75 25-126h40l-35 175h-33.25l-75.5-126.75 13.5.75-25.25 126h-40zM391.311 164.5h84.25l-6.25 31.5h-84.25l6.25-31.5zm-11.5 72h95.5l-6.75 32.5h-135.5l35-175h132.25l-6.75 32.5h-91.75l-22 110zM540.344 269l-22.25-175h40l19.5 154.75h-21L639.344 94h37.5l18.75 154.75h-20L757.844 94h40.25l-92.5 175h-43.25l-17.5-136h12.25l-73.25 136h-43.5zM846.453 272c-9.5 0-18.75-.917-27.75-2.75-8.833-1.667-16.917-4-24.25-7-7.167-3-13.25-6.25-18.25-9.75l16.5-31.25a113.15 113.15 0 0017.5 10 113.448 113.448 0 0019.75 6.25 106.84 106.84 0 0020.5 2c7.5 0 13.917-.833 19.25-2.5 5.5-1.667 9.667-4 12.5-7 3-3 4.5-6.667 4.5-11 0-4-1.583-7.25-4.75-9.75s-7.333-4.583-12.5-6.25c-5-1.833-10.583-3.583-16.75-5.25a298.645 298.645 0 01-18.75-5.75c-6.167-2.333-11.833-5.167-17-8.5-5-3.5-9.083-7.917-12.25-13.25s-4.75-12-4.75-20c0-12 3.25-22.417 9.75-31.25 6.667-8.833 16-15.667 28-20.5 12-5 26.083-7.5 42.25-7.5 11.833 0 23 1.333 33.5 4 10.5 2.5 19.5 6.167 27 11l-15.25 31c-6.667-4.5-14.083-7.833-22.25-10-8.167-2.333-16.583-3.5-25.25-3.5-7.833 0-14.583.917-20.25 2.75-5.5 1.833-9.75 4.417-12.75 7.75-2.833 3.167-4.25 6.833-4.25 11s1.5 7.583 4.5 10.25c3.167 2.5 7.333 4.667 12.5 6.5 5.167 1.667 10.833 3.333 17 5a262.096 262.096 0 0118.5 5.75c6.167 2.167 11.833 4.917 17 8.25s9.333 7.583 12.5 12.75c3.167 5 4.75 11.333 4.75 19 0 12-3.333 22.5-10 31.5-6.667 8.833-16.083 15.75-28.25 20.75-12 4.833-26.167 7.25-42.5 7.25zM231 367.6c-7.2 0-13.5-1.3-18.9-3.9-5.4-2.667-9.6-6.333-12.6-11-2.933-4.733-4.4-10.2-4.4-16.4 0-6.133 1.067-11.767 3.2-16.9 2.2-5.133 5.3-9.567 9.3-13.3 4-3.733 8.733-6.6 14.2-8.6 5.533-2.067 11.633-3.1 18.3-3.1 7.333 0 13.633 1.167 18.9 3.5 5.333 2.267 9.633 5.667 12.9 10.2L255 321.2c-2.267-2.933-4.667-4.933-7.2-6-2.533-1.133-5.467-1.7-8.8-1.7-3.067 0-5.833.533-8.3 1.6a17.75 17.75 0 00-6.4 4.4c-1.733 1.867-3.067 4.1-4 6.7-.933 2.6-1.4 5.467-1.4 8.6 0 2.733.6 5.133 1.8 7.2 1.267 2.067 3.033 3.667 5.3 4.8 2.333 1.133 5.1 1.7 8.3 1.7 2.667 0 5.333-.433 8-1.3 2.667-.933 5.4-2.5 8.2-4.7l8.9 16.8c-3.667 2.667-7.933 4.733-12.8 6.2-4.867 1.4-10.067 2.1-15.6 2.1zm8.6-11.9l5.3-26.6h20.5l-6 30.2-19.8-3.6zM260.455 366l44.6-70h23.2l16.6 70h-23.5l-11.3-59.1h9.2l-33.9 59.1h-24.9zm20.6-12.2l9.4-17h32.2l2.6 17h-44.2zM360.306 366l10.3-51.7h-20.5l3.7-18.3h64.6l-3.7 18.3h-20.5l-10.3 51.7h-23.6zM440.936 322h31.2l-3.4 17h-31.2l3.4-17zm-3.7 26.2h35.1l-3.6 17.8h-58.2l14-70h56.9l-3.6 17.8h-33.7l-6.9 34.4z"></path>
      </g>
    </svg>
  );
}
