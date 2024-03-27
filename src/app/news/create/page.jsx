"use client";

import NewsForm from "../../components/TextEditor/NewsForm";


export default function page() {
  return (
    <div className="bg-white text-black w-full md:px-10 lg:px-20">
      <div className="mx-auto h-auto  rounded-lg p-5">
      <NewsForm/>
      </div>
    </div>
  );
}
