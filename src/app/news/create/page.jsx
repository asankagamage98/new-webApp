"use client";

import PublishNews from "../../components/TextEditor/PublishNews";
import { HiOutlineArrowLeft} from "react-icons/hi";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function page() {

  const router = useRouter();

  return (
    <div className="bg-white text-black w-full md:px-10 lg:px-20">
      <div className="py-20 mx-auto h-auto  rounded-lg p-5">
      <Button
        size="sm"
        gradientDuoTone="purpleToBlue"
        outline
        pill
        onClick={(e) => router.push('/news')}
      >
        <HiOutlineArrowLeft className="h-6 w-6" />
      </Button>
      <PublishNews/>
      </div>
    </div>
  );
}
