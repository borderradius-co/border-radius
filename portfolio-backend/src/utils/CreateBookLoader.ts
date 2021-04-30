import DataLoader from "dataloader";
import {Book} from "../entities/Book";

//[1, 12, 10]
//[{id: 1, username: 'm3ghdad'}, {}, {}]

export const createBookLoader = () => new DataLoader<number, Book>( async (bookIds) => {
    const books = await Book.findByIds(bookIds as number[]);
    const booksIdToBook: Record<number, Book> = {};
    books.forEach(book => {
        booksIdToBook[book.id] = book
    });

    const sortBooks = bookIds.map((bookId) => booksIdToBook[bookId])
    console.log("userIds :", bookIds);
    console.log("map: ", booksIdToBook);
    console.log("sortedUsers: ", sortBooks)
    return sortBooks;
});