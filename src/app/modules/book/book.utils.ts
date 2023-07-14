import { Book } from "./book.model";

export const findLastBookId = async (): Promise<string | undefined> => {
    const bookId = await Book.findOne({}, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();
  
    return bookId?.id ? bookId.id.substring(6) : undefined;
  };
  
  export const generateBookId = async (
    publicationYear: number
  ): Promise<string> => {
    const currentId =
      (await findLastBookId()) || (0).toString().padStart(4, '0');
  
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementedId = `BK${publicationYear}${incrementedId}`;
  
    return incrementedId;
  };

export const getBookImageUrl = (): string => {
    const randomNumber = Math.round(Math.random() * 90) + 10

    return `https://ia800606.us.archive.org/view_archive.php?archive=/32/items/olcovers642/olcovers642-L.zip&file=64294${randomNumber}-L.jpg`
}

