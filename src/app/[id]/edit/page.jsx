"use client";

import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { TextInput, Button, Label, Select } from "flowbite-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function page() {
  // Retrieve user and token from Redux store
  const token = useSelector((state) => state.login.token);
  const user = useSelector((state) => state.login.user);
  const { id } = useParams();

  //get env data
  const NEWS_API = process.env.NEXT_PUBLIC_NEWS_API;

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

  const router = useRouter();

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

        // Make the PUT request to update news
        const response = await axios.put(`${NEWS_API}${id}`, form, auth);

        // Handle successful response
        const data = response.data;
        console.log(data);

        // Show success toast
        Swal.fire({
          icon: "success",
          title: "News updated successfully!",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          toast: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        //navigate the news feed page
        router.push("/");
      } else {
        console.error("User token not found.");
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating news:", error);

      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating news. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  };
  //get news by id
  const getNews = () => {
    axios
      .get(`${NEWS_API}${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // Define Quill modules
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike",'image'],
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
  // Define placeholder text for the Quill editor
  const placeholder = "Write your blog content here...";
  // Initialize Quill editor
  const { quill, quillRef } = useQuill({
    modules,
    placeholder,
  });

  // update form state with Quill editor content
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
  // update Quill editor content when form state changes
  useEffect(() => {
    if (quill && form.description) {
      quill.root.innerHTML = form.description;
    }
  }, [quill, form.description]);

  return (
    <div className="py-20 w-full px-5 md:px-10 lg:px-36">
      <Button
        size="sm"
        gradientDuoTone="purpleToBlue"
        outline
        pill
        onClick={(e) => router.back()}
      >
        <HiOutlineArrowLeft className="h-6 w-6" />
      </Button>
      <div className="w-full mb-3 mt-3 ">
        <div>
          <h3 className="text-2xl font-bold">Edit Publish a news article</h3>
        </div>
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
          color="dark" pill
        >
          Update
        </Button>
      </div>
    </div>
  );
}
