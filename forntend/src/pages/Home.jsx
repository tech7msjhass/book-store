import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa6";
import Spinner from "../components/Spinner";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchByName, setSearchByName] = useState("");
  const [showType, setShowType] = useState("card");

  const getBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://book-store-ah5k.onrender.com/books?name=${searchByName}`
      );
      if (!response.ok) {
        throw new Error(
          `something went wrong during fetch:  ${response.statusText}`
        );
      }
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setBooks(result.data);
      } else {
        throw new Error("Fetched result is not an array");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchByName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getBooks();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchByName, getBooks]);

  return (
    <div className=" p-4">
      <div className=" flex justify-center items-center gap-x-4">
        <button
          className=" bg-sky-300 hover:bg-sky-600 hover:text-white px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className=" bg-sky-300 hover:bg-sky-600 hover:text-white px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className=" flex justify-between items-center">
        <h1 className=" text-5xl my-8">Books List</h1>
        <div className="flex items-center relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
          <input
            className="border-2 rounded-xl border-gray-500 px-4 py-2 w-full"
            type="text"
            placeholder="Search for Books"
            value={searchByName}
            onChange={(e) => {
              e.preventDefault();
              const value = e.target.value;
              setSearchByName(value.trim());
            }}
          />
          <FaSearchengin className="absolute right-4 text-2xl text-sky-800" />
        </div>

        <Link to="/books/create">
          <MdOutlineAddBox className=" text-sky-800 text-5xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
      {searchByName && books.length === 0 && (
        <div className=" flex justify-center items-center text-4xl text-red-400">
          No Books matches your Search
        </div>
      )}
    </div>
  );
};

export default Home;
