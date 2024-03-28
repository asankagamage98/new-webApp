"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import striptags from "striptags";
import { Avatar } from "flowbite-react";

export default function NewsCard() {
  // State to store the news data
  const [news, setNews] = useState([]);

  // Environment variable for the news API endpoint
  const NEWS_API = process.env.NEXT_PUBLIC_NEWS_API;
  // fetch news data from the API
  const fetchNews = () => {
    axios
      .get(`${NEWS_API}`)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // Fetch news data
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
// rendering individual news cards
const SingleNewsCard = ({ news }) => {
  const router = useRouter();
  // get the  article description
  const getArticleString = () => {
    return striptags(news?.description);
  };
  // Function to get the initials for the author's avatar
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
  // get the humanized date
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
