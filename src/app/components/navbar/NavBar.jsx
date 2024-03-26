"use client";

import {
  Avatar,
  Dropdown,
  Navbar,
} from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function NavBar() {

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async (e) => {
    try {
      console.log('Logging out...');
  
      // Dispatch an action to clear user data in Redux store
      dispatch(setUser(null));
  
      console.log('User data cleared.');
      console.log('Redirected to the home page.');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

    return (
        <Navbar fluid rounded className='bg-black'>
          <Navbar.Brand href="https://flowbite-react.com">
            <img src="/next.svg" onClick={(e) => router.push('/home')}  className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span onClick={(e) => router.push('/home')} className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MY NEWS</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      );
    }
