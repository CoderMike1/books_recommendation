
import {useContext, useEffect, useState} from "react";
import './Home.css'
import BookSearch from "./BookSearch.jsx";
import Recommendation from "./Recommendation.jsx";
import {SessionStorageContext} from "../SessionStorageContext.jsx";

const Home = () =>{
    //variable that defines which subsite is displayed to the user
    const [showSection,setShowSection] = useState("add-book");
    const {setIsLogged,accessToken} = useContext(SessionStorageContext);
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);

    const handleLogout = () =>{
        setIsLogged(false)
    }

    //loading bookList from database for certain user
    const fetchBooks = async () => {
        setLoading(true);
        try{
            const response = await fetch("http://localhost:8000/api/books/",{
                method:"GET",
                headers:{
                    "Authorization":`Token ${accessToken}`,
                    "Accept":"application/json"
                }
            })
            if(!response.ok){
                console.log("")
            }
            else{
                const data = await response.json();
                setBooks(data);
                console.log(data)
            }
        }catch(error){
            console.log(error)
        }finally {
            setLoading(false)
            setShowSection("my-books")
        }
    }

    //delete book from database
    const deleteBook = async(bookId) => {
        try{
            const response = await fetch(`http://localhost:8000/api/books/${bookId}/`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Token ${accessToken}`,
                }
            })
            if(!response.ok){
                console.log("Error")
            }
            else{
                fetchBooks()
            }
        }
        catch(error){
            console.log(error)
        }
    }


    return (
        <div className="menu-container">
            <div className="tiles">
                <button className="tile" onClick={() => setShowSection('add-book')}>Add new book</button>
                <button className="tile" onClick={fetchBooks} disabled={loading}>My books</button>
                <button className="tile" onClick={() => setShowSection("recommendation")}>Recommendations</button>
                <button className="red-button" onClick={() => handleLogout()}>Logout</button>
            </div>
            <div className="books-grid">
                {showSection === 'recommendation' && (
                    <Recommendation/>
                )}
                {showSection === 'add-book' && (
                    <BookSearch/>
            )   }
                { showSection === 'my-books' && (
                    <>
                        {books && books.length === 0 ?
                            ( <p className="no-books-message">no books...</p>)
                            : (
                        books.map((book) => (
                          <div key={book.id} className="book-card">
                            <img src={book.image || "https://via.placeholder.com/150"} alt={book.title} className="book-image" />
                              <div className="book-info">
                                  <h3>{book.title}</h3>
                                  <p><strong>Author:</strong> {book.author}</p>
                                  <p><strong>Category:</strong> {book.category}</p>
                                  <p><strong>ISBN:</strong> {book.isbn_13_number}</p>
                                  <button className="delete-button" onClick={() => deleteBook(book.id)}>
                                      🗑️ Delete book
                                  </button>
                              </div>
                          </div>
                        )))
                        }
                    </>
                )
                }

            </div>

        </div>

    )
}

export default Home