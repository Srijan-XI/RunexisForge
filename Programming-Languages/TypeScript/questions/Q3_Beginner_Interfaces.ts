// Question 3 (Beginner): Interfaces and Objects
// Create an interface for a Book with properties:
// - title (string)
// - author (string)
// - year (number)
// - isbn (optional string)
// - genres (array of strings)
// Then create objects that implement this interface.

// Solution:

// Define the Book interface
interface Book {
  title: string;
  author: string;
  year: number;
  isbn?: string;  // Optional property
  genres: string[];
}

// Create Book objects
const book1: Book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925,
  isbn: "978-0-7432-7356-5",
  genres: ["Fiction", "Classic"]
};

const book2: Book = {
  title: "1984",
  author: "George Orwell",
  year: 1949,
  genres: ["Dystopian", "Science Fiction", "Political Fiction"]
  // isbn is optional, so we can omit it
};

// Function that accepts Book interface
function displayBook(book: Book): void {
  console.log(`Title: ${book.title}`);
  console.log(`Author: ${book.author}`);
  console.log(`Year: ${book.year}`);
  console.log(`Genres: ${book.genres.join(", ")}`);
  if (book.isbn) {
    console.log(`ISBN: ${book.isbn}`);
  }
  console.log("---");
}

// Display books
displayBook(book1);
displayBook(book2);

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// Implement the interface
const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

console.log(calculator.add(10, 5));       // 15
console.log(calculator.subtract(10, 5));  // 5

// Extending interfaces
interface EBook extends Book {
  fileSize: number;  // in MB
  format: string;    // e.g., "PDF", "EPUB"
}

const ebook: EBook = {
  title: "TypeScript Handbook",
  author: "Microsoft",
  year: 2023,
  genres: ["Programming", "Technical"],
  fileSize: 2.5,
  format: "PDF"
};

console.log(`eBook: ${ebook.title} (${ebook.format}, ${ebook.fileSize}MB)`);
