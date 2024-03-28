"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
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
      // router.push("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar fluid className="bg-slate-100 text-black">
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/news.svg"
          onClick={(e) => router.push("/news")}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span
          onClick={(e) => router.push("/news")}
          className="self-center whitespace-nowrap text-xl font-semibold "
        >
          TOP NEWS
        </span>
      </Navbar.Brand>
      <Navbar.Collapse className="flex item-end">
        <Navbar.Link href="#" onClick={(e) => router.push("/news")} active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#" onClick={(e) => router.push("/news/create")}>
          create
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
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
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
