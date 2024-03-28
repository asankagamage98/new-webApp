"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiPencil, HiTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

//get env
const NEWS_API = process.env.NEXT_PUBLIC_NEWS_API;

export default function page() {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [date, setDate] = useState();

  const router = useRouter();

  function fetchSingleNews() {
    axios
      .get(`${NEWS_API}${id}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }

  function getDateTime() {
    setDate(moment(news?.createdAt).format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => getDateTime(), [news?.createdAt]);

  useEffect(() => {
    fetchSingleNews();
  }, [id]);

  return (
    <div className="py-20 px-5 md:px-10 lg:px-36">
      <Button
        size="sm"
        gradientDuoTone="purpleToBlue"
        outline
        pill
        onClick={(e) => router.back()}
      >
        <HiOutlineArrowLeft className="h-6 w-6" />
      </Button>
      <h1 className="text-4xl font-semibold capitalize mt-3">{news?.title}</h1>
      <p className="text-gray-500 mt-3 text-sm">
        Published by{" "}
        <span className="capitalize font-semibold">{news?.author}</span>
      </p>
      <p className="text-gray-500 text-sm">{date}</p>

      <EditAndDelete newsId={news?._id} />
      <div className="w-full border-b my-10"></div>

      <div dangerouslySetInnerHTML={{ __html: news?.description }}></div>
      <br />

      <br />
    </div>
  );
}

const EditAndDelete = ({ newsId }) => {
  const token = useSelector((state) => state.login.token);
  const router = useRouter();

  const remove = (e) => {
    // Get the newsId from props
    const id = newsId;

    // confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          // Check if token exists
          if (token) {
            // Set the authorization header with the token
            const auth = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            // Make the DELETE request to delete the news item
            axios
              .delete(`${NEWS_API}${id}`, auth)
              .then(() => {
                // success
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                router.push("/news");
              })
              .catch((err) => {
                // error
                console.error("Error deleting news:", err);
                alert("Error deleting news. Please try again later.");
              });
          } else {
            console.error("User token not found.");
            // Handle case where token is missing
            // You can redirect to login page or show an error message
          }
        } catch (error) {
          // Handle errors
          console.error("Error deleting news:", error);
          alert("Error deleting news. Please try again later.");
        }
      }
    });
  };

  return (
    <div className="flex gap-4 mt-4">
      <Button
        color="gray"
        size="xs"
        onClick={(e) => router.push(`/news/${newsId}/edit`)}
      >
        <HiPencil className="h-6 w-6" />
      </Button>
      <Button color="gray" size="xs" onClick={remove}>
        <HiTrash className="h-6 w-6" />
      </Button>
    </div>
  );
};
