"use client";

import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { TextInput, Button, Label, Select } from "flowbite-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "next/navigation";

export default function page() {
   // Retrieve user and token from Redux store

   const token = useSelector((state) => state.login.token);
   const user = useSelector((state) => state.login.user);
   const { id } = useParams();
   // Initialize form state
   const [form, setForm] = useState({
     title: "",
     description: "",
     category: "politics",
     author: user ? user.name : "",
   });
  
   // Handle form input changes
   const handleFormChanges = (e) => {
     e.preventDefault();
     setForm({ ...form, [e.target.name]: e.target.value });
   };
 
   // Handle form submission
   const onSubmit = async (e) => {
     e.preventDefault();
     try {
       // Check if token exists
       if (token) {
         // Set the authorization header with the token
         const auth = {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         };
 
         // Make the POST request to publish news
         const response = await axios.put(
           `http://localhost:3020/api/news/${id}`,
           form,
           auth
         );
 
         // Handle successful response
         const data = response.data;
         console.log(data);
         alert("News updated successfully!");
       } else {
         console.error("User token not found.");
        
       }
     } catch (error) {
       // Handle errors
       console.error("Error updating news:", error);
       alert("Error publishing news. Please try again later.");
     }
   };
 
 //get news by id
 const getNews = () =>{
   axios.get(`http://localhost:3020/api/news/${id}`)
   .then((res) => {
    setForm(res.data);
   }).catch(err => {
    console.error(err);
   })
 }

 const modules = {
   toolbar: [
     ["bold", "italic", "underline", "strike"],
     [{ align: [] }],

     [{ list: "ordered" }, { list: "bullet" }],
     [{ indent: "-1" }, { indent: "+1" }],

     [{ size: ["small", false, "large", "huge"] }],
     [{ header: [1, 2, 3, 4, 5, 6, false] }],
     ["link"],
     [{ color: [] }, { background: [] }],

     ["clean"],
   ],
   clipboard: {
     matchVisual: false,
   },
 };

 const placeholder = "Write your blog content here...";

 const { quill, quillRef } = useQuill({
   modules,
   placeholder,
 });

 //content of the Quill editor
 useEffect(() => {
   if (quill) {
     const handler = () => {
       const content = quill.root.innerHTML;
       setForm({ ...form, description: content });
     };
     quill.on("text-change", handler);
     return () => {
       quill.off("text-change", handler);
     };
   }

   getNews();
 }, [quill, form]);

 return (
   <div className=" w-full md:px-10 lg:px-20">
     <div className="w-full mb-3  ">
       <div><h3 className="text-2xl font-bold">Edit Publish a news article</h3></div>
       <div className="mb-2 block mt-5">
         <Label htmlFor="category" value="Select articale category" />
       </div>
       <Select
         id="category"
         onChange={handleFormChanges}
         name="category"
         className="w-full  h-10 rounded-md"
         required
         value={form.category}
       >
         <option>politics</option>
         <option>sports</option>
         <option>technology</option>
         <option>entertainment</option>
       </Select>
     </div>
     <div className="w-full mb-3">
       <div className="mb-2 block">
         <Label htmlFor="small" value="Title" />
       </div>
       <TextInput
         id="small"
         type="text"
         onChange={handleFormChanges}
         name="title"
         value={form.title}
         className="w-full m-0 h-10"
       />
     </div>
     <div className="mb-2 block">
         <Label htmlFor="small" className="" value="Content" />
    
       <div className="w-full mt-2">
         <div ref={quillRef} style={{ height: 300 }} className="mb-5" />
       </div>
     </div>
     <div className="flex justify-end">
       <Button
         type="submit"
         onClick={onSubmit}
         className="w-[200px] mt-5"
         gradientMonochrome="success"
       >
         Update
       </Button>
     </div>
   </div>
 );
}
