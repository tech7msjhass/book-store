import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackButton = () => {
  return (
    <div className=" flex">
      <Link
        to={"/"}
        className=" bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <FaArrowLeftLong className=" text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
