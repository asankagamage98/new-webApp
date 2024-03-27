"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import renderHTML from 'react-render-html';

export default function NewsCard() {
    const[news,setNews] =useState([]);
    
   const fetchNews = () => {
     axios.get(`http://localhost:3020/api/news/`).then((res)=>{
        setNews(res.data);
     }).catch((err) =>{
        console.error(err);
     })
   }

   useEffect(() => {
    fetchNews();
   },[]);

   console.log(news);
  return (
    <>

    
            <div class="container mx-auto px-2 pt-8">
            <div class="max-w-3xl mx-auto">
                <h1 class="text-3xl font-bold mb-4">News Feed</h1>
                {
        !news && <p>No any movies in database..!</p>
            }
        { news && news.map((news, index) => (
                <div class="bg-white rounded-lg shadow-md border p-4 mb-4">
                    <div class="flex items-center mb-4">
                        <img class="w-12 h-12 rounded-full mr-3" src="https://randomuser.me/api/portraits/men/22.jpg" alt="Profile Image"/>
                        <div>
                            <h2 class="text-lg font-semibold">{news.title}</h2>
                            <p class="text-gray-500 text-sm">Published on {moment(news.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                        </div>
                    </div>
                    <p class="text-gray-700 mb-4">
                    {/* {renderHTML(news.description)} */}
                    {renderHTML(news.description)}
                    </p>
                    <div class="flex justify-end">
                        <a href="#" class="text-blue-500 font-semibold">Read More</a>
                    </div>
                </div>
            ))}
            </div>
        </div>
  
    </>
  )
}
