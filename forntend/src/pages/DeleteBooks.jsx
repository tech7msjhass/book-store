import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5500/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Book is Not Deleted: ${response.statusText}`);
      }
      enqueueSnackbar("Book deleted Successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Book is Not deleted, something went wrong", {
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
      <h1 className=" text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className=" flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className=" text-2xl">Are you sure you want to Delete this Book</h3>

        <button
          className=" p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDelete}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
