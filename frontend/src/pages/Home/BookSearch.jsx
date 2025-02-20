import React, {useState, useEffect, useContext} from "react";
import './BookSearch.css'
import {SessionStorageContext} from "../SessionStorageContext.jsx";
const BookSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {accessToken} = useContext(SessionStorageContext);
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    //function fetching books from google Api based on title that user will put
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      const formattedTitle = query.replace(/ /g,"+")

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${formattedTitle}`);
        if (!response.ok) throw new Error("Error while loading data...");
        const data = await response.json();

        if (!data.items) {
          setSuggestions([]);
          return;
        }

        const books = data.items.map((book) => {
            const info = book.volumeInfo;
          return {
            id: book.id,
            title: info.title || "",
            author: info.authors ? info.authors.join(", ") : "",
            category: info.categories ? info.categories.join(", ") : "",
            description: info.description || "",
            isbn13: info.industryIdentifiers
              ? info.industryIdentifiers.find((id) => id.type === "ISBN_13")?.identifier || "Brak ISBN"
              : "",
            image: info.imageLinks ? info.imageLinks.thumbnail : "https://via.placeholder.com/50"
          };
        });

        setSuggestions(books);
      } catch (err) {
        setError("No results...");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

    //adding book to database
    const addBook = async (book) => {
        try{
            const updatedBook = {
                ...book,
                isbn_13_number: book.isbn13 === "" ? "." : book.isbn13,
                author: book.author === "" ? "." : book.author,
                category: book.category === "" ? "." : book.category,
                description: book.description === "" ? "." : book.description,
            };
            const response = await fetch("http://localhost:8000/api/books/",{
                method:"POST",
                headers:{
                    "Authorization":`Token ${accessToken}`,
                    "Content-type":"application/json"
                },
                body: JSON.stringify(updatedBook)
            })
            if(!response.ok){
                throw new Error("Error while adding new book...");
            }
            else{
                setSuccessMessage(`📚 Book "${book.title}" has been successfully added!`);
            setQuery("");
            setSuggestions([]);

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            }

        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <div className="search-container">
      <h2 className="search-h2">🔍Search for the book...</h2>
      <input
        type="text"
        placeholder="Input book title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((book) => (
            <li key={book.id} className="suggestion">
              <img src={book.image || ""} alt={book.title} className="book-thumbnail" />
              <div>
                <strong>{book.title}</strong> – {book.author}
                <p>{book.category}</p>
              </div>
                <button className="add-button" onClick={() => addBook(book)}>➕ Add</button>
            </li>
          ))}
        </ul>
      )}

      {query.length >= 3 && suggestions.length === 0 && !loading && (
        <p className="no-results">No results...</p>
      )}
    </div>
  );
};

export default BookSearch;