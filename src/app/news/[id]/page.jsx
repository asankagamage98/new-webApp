"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import moment from "moment";

export default function page() {
  const { id } = useParams();
  const [news, setNews] = useState({});

  function fetchSingleNews() {
    axios
      .get(`http://localhost:3020/api/news/${id}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.error(err));
  }

  function getDateTime(datetime) {
    let value = moment(datetime).format("MMMM Do YYYY, h:mm:ss a")
    return value
  }

  useEffect(() => {
    fetchSingleNews();
  }, [id]);

  return (
    <div className="py-20 md:px-10 lg:px-20">
      <h1 className="">{news?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: news?.description }}></div>
      <br/>
      <small className="text-gray-800">By {news?.author}</small>
      <br/>
      {/* <small className="text-gray-800">{getDateTime(news?.createdAt)}</small> */}
    </div>
  );
}