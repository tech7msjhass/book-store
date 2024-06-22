import BookSingleCard from "./BookSingleCard";

const BookCard = ({ books }) => {
  return (
    <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book, index) => (
        <BookSingleCard key={book._id} book={book} index={index} />
      ))}
    </div>
  );
};

export default BookCard;
