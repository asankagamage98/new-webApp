"use client"

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from "flowbite-react";

function page() {

const router = useRouter();

const login =() => {
    router.push("/")
}
// ----------------------------------
const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleFormChanges = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  
 const submit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    // Append form data fields
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);

    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        // Omit 'Content-Type' to let the browser set it automatically for FormData
      },
      body: formData,
    });

    console.log('Response Status:', response.status);

    if (response.ok) {
      const data = await response.json();
      alert('Success!');
      router.push('/');
      console.log(data);
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    alert('Error!');
    console.error('Error:', error);
  }
};

  return (
    <div className="  h-screen bg-white text-black w-full md:w-3/4 lg:w-1/3 max-w-lg mx-auto p-4 pb-4 md:p-6 lg:p-8 rounded-lg shadow-xl flex flex-col justify-center items-center">
    <div className='mx-auto max-w-xs'>
     <form action="" onSubmit={submit}>
        <div className='w-full font-bold text-2xl text-center'><p className=''>SIGN UP</p></div>
        <div className="mt-3 form-control w-full mb-2">
            <label className="label">
            <span className="label-text">Name</span>
            </label>
            <input onChange={handleFormChanges}  name="name" type="text" placeholder="Input user name" className="font-normal mt-2 input text-white input-bordered w-full h-8 rounded-md" />
        </div>
        <div className="mt-3 form-control w-full mb-2">
            <label className="label">
            <span className="label-text">Email</span>
            </label>
            <input onChange={handleFormChanges}  name="email" type="email" placeholder="Input user email" className="font-normal mt-2 input text-white input-bordered w-full h-8 rounded-md" />
        </div>
        <div className="form-control w-full">
            <label className="label">
            <span className="label-text">Password</span>
            </label>
            <input onChange={handleFormChanges} name="password" type="password" placeholder="Input password" className="font-normal mt-2 input text-white input-bordered w-full h-8 rounded-md" />
        </div>
        <div className="form-control w-full">
            <label className="label">
            <span className="label-text">Conform Password</span>
            </label>
            <input onChange={handleFormChanges} name="password_confirmation" type="password" placeholder="enter conform passowrd" className="font-normal mt-2 input text-white input-bordered w-full h-8 rounded-md" />
        </div>
        <div className='w-full mt-5 '>
            
                <Button  type="submit"  className="w-full" gradientDuoTone="purpleToBlue" >Register</Button>
        
        </div>
      </form>
      <div className='w-full text-center mt-5'>
        <Button type="" onClick={login} className="w-full" gradientMonochrome="success">Login</Button>
    
     </div>
    </div>
  </div>
  )
}

export default page