import { Book } from "../models/bookModel.js";

//**********GET All Books***************************** */
export const getBooks = async (request, response) => {
  const { name } = request.query;
  try {
    let query = {};
    if (name) {
      // Create a case-insensitive search for title or author
      query = {
        $or: [
          { title: { $regex: name, $options: "i" } },
          { author: { $regex: name, $options: "i" } },
        ],
      };
    }
    const books = await Book.find(query);
    response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.mesage);
    response.status(500).json({ message: error.message });
  }
};

//***********GET one Book */************************** */
export const getBook = async (request, response) => {
  const { id } = request.params;

  try {
    const book = await Book.findById(id);
    response.status(200).json(book);
  } catch (error) {
    console.log(error.mesage);
    response.status(500).json({ message: error.message });
  }
};

//*********Create Book POST request ********************/
export const createBook = async (request, response) => {
  const { title, author, publishYear } = request.body;

  try {
    if (!title || !author || !publishYear) {
      return response.status(400).json({
        message: "send all required fields: title, author, publishyear",
      });
    }

    const newBook = await Book.create({
      title: title,
      author: author,
      publishYear: publishYear,
    });

    return response.status(201).json(newBook);
    //
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
};

//***************Update a Book, PUT method***************** */
export const updateBook = async (request, response) => {
  const { id } = request.params;
  const { title, author, publishYear } = request.body;

  try {
    if (!title || !author || !publishYear) {
      return response.status(400).json({
        message: "send all required fields: title, author, publishyear",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, request.body);

    if (!updatedBook) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(200).json({ message: "Book Updated Successfully" });
    //
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ message: error.message });
  }
};

// *****************DELETE a Book**************************
export const deleteBook = async (request, response) => {
  const { id } = request.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return response.status(404).json({ message: "Book not Found" });
    }
    return response.status(200).json({ message: "Book Deleted Successfully" });
    //
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ message: error.message });
  }
};
