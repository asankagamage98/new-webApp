"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { Button } from "flowbite-react";
import { HiOutlineArrowLeft, HiPencil, HiTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

// Retrieve news API URL from environment variables
const NEWS_API = process.env.NEXT_PUBLIC_NEWS_API;

export default function page() {
  // Initialize state variables
  const { id } = useParams();
  const [news, setNews] = useState({});
  const [date, setDate] = useState();
  //get user
  const user = useSelector((state) => state.login.user);
  const router = useRouter();
  // fetch single news item
  function fetchSingleNews() {
    axios
      .get(`${NEWS_API}${id}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }
  // format and set the date
  function getDateTime() {
    setDate(moment(news?.createdAt).format("MMMM Do YYYY, h:mm:ss a"));
  }
  // trigger getDateTime when news.createdAt changes
  useEffect(() => getDateTime(), [news?.createdAt]);
  // Effect hook to fetch news data when id changes
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

      {user && <EditAndDelete newsId={news?._id} />}
      <div className="w-full border-b my-10"></div>

      <div dangerouslySetInnerHTML={{ __html: news?.description }}></div>
      <br />

      <br />
    </div>
  );
}

const EditAndDelete = ({ newsId }) => {
  //get token from redux store
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
