
// import React, { useEffect,useState } from "react";
import axios from "axios";
// import { useParams } from "next/navigation";

export default function page({news}) {

 

  return <div className="py-20 md:px-10 lg:px-20">
    <h1>{news?.title}</h1>
    <div>{news?.description}</div>
  </div>;
}

// export async function getServerSideProps({ params }) {
//   const { id } = params;

//   try {
//     const res = await axios.get(`http://localhost:3020/api/news/${id}`);
//     const news = res.data;
//     return {
//       props: { news },
//     };
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     return {
//       props: {
//         news: null, // or handle error appropriately
//       },
//     };
//   }
// }