import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUpdatedBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5500/books/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to Get Updated: ${response.statusText}`);
        }
        const result = await response.json();
        setTitle(result.title);
        setAuthor(result.author);
        setPublishYear(result.publishYear);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUpdatedBooks();
  }, []);

  const handleEditBook = async (event) => {
    event.preventDefault();

    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5500/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to get Updated: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);
      enqueueSnackbar("Book is Edited Successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Send all related fields", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-4">
      <BackButton />
      <div className=" flex flex-col justify-center items-center">
        <h1 className=" text-3xl my-4 mb-8">Edit Book</h1>
        {loading ? <Spinner /> : ""}
        <form onSubmit={handleEditBook}>
          <div className=" flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className=" my-4">
              <label className=" text-xl mr-4 text-gray-500">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" border-2 rounded-xl border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className=" my-4">
              <label className=" text-xl mr-4 text-gray-500">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className=" border-2 rounded-xl border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className=" my-4">
              <label className=" text-xl mr-4 text-gray-500">
                Publish Year
              </label>
              <input
                type="text"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className=" border-2 rounded-xl border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className=" p-2 bg-sky-200 m-8 hover:bg-sky-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
