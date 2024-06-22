import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBooks = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    showBookById();
  }, [id]);

  const showBookById = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5500/books/${id}`);
      if (!response.ok) {
        throw new Error(`Something went Wrong: ${response.statusText}`);
      }
      const result = await response.json();
      setBook(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return (
    <div className=" p-4">
      <BackButton />
      <div className=" flex flex-col justify-center items-center">
        <h1 className=" text-3xl my-4">Show Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className=" flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className=" my-4">
              <span className=" text-xl mr-4 text-gray-500">Title:</span>
              <span>{book.title}</span>
            </div>
            <div className=" my-4">
              <span className=" text-xl mr-4 text-gray-500">Author:</span>
              <span>{book.author}</span>
            </div>
            <div className=" my-4">
              <span className=" text-xl mr-4 text-gray-500">Publish Year:</span>
              <span>{book.publishYear}</span>
            </div>
            <div className=" my-4">
              <span className=" text-xl mr-4 text-gray-500">Create Time:</span>
              <span>
                {new Date(book.createdAt).toLocaleDateString(
                  undefined,
                  options
                )}
              </span>
            </div>
            <div className=" my-4">
              <span className=" text-xl mr-4 text-gray-500">
                Last Updated Time:
              </span>
              <span>
                {new Date(book.updatedAt).toLocaleDateString(
                  undefined,
                  options
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBooks;