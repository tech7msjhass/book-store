import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async (event) => {
    event.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      const response = await fetch(
        "https://book-store-ah5k.onrender.com/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Something went Wrong during POST request: ${response.statusText}`
        );
      }
      const result = await response.json();
      console.log(result);
      enqueueSnackbar("Book Created Successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Send all desired fields", {
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
        <h1 className=" text-3xl my-4 mb-8">Create Book</h1>
        {loading ? <Spinner /> : ""}
        <form onSubmit={handleSaveBook}>
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
              className=" p-2 bg-sky-300 hover:bg-sky-600 hover:text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;
