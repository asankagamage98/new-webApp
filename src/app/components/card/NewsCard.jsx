"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import renderHTML from "react-render-html";
import { useRouter } from "next/navigation";
import striptags from "striptags";
import { Avatar } from "flowbite-react";

export default function NewsCard() {
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    axios
      .get(`http://localhost:3020/api/news/`)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div class="container mx-auto px-2 pt-8">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-3xl font-bold mb-4">News Feed</h1>
          {!news && <p>No any movies in database..!</p>}
          {news &&
            news.map((news, index) => (
              <SingleNewsCard news={news} key={index} />
            ))}
        </div>
      </div>
    </>
  );
}

const SingleNewsCard = ({ news }) => {
  const router = useRouter();

  const getArticleString = () => {
    return striptags(news?.description);
  };

  const getAvatarLetters = (str) => {
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

  const getHumanizedDate = (date) =>
    moment.duration(moment().diff(moment(date))).asDays() < 1
      ? moment.duration(moment().diff(moment(date))).humanize()
      : moment(date).format("MMM DD, YYYY");
  return (
    <div
      class="bg-white hover:bg-slate-100 duration-75 border-b p-4 mb-4 cursor-pointer"
      onClick={() => router.push(`/news/${news?._id}`)}
    >
      <div class="flex items-center mb-4 ">
        <Avatar placeholderInitials={getAvatarLetters(news?.author)} rounded />
        <div className="ms-2">
          <h2 class="text-lg font-semibold capitalize hover:text-blue-800">
            {news?.title}
          </h2>
          <p class="text-gray-500 text-xs">
            Published on {getHumanizedDate(news.createdAt)}
          </p>
        </div>
      </div>
      <p class="text-gray-700 mb-4 text-sm line-clamp-3">
        {getArticleString()}
      </p>
      <div class="flex justify-end ">
        <a
          href="#"
          class="text-blue-500 text-sm font-semibold"
          onClick={() => router.push(`/news/${news?._id}`)}
        >
          Read More
        </a>
      </div>
    </div>
  );
};
