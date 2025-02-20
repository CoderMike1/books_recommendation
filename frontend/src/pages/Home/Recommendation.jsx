import React, {useContext, useState} from 'react';
import {SessionStorageContext} from "../SessionStorageContext.jsx";
import './Recommendation.css'
const Recommendation = () => {
    const {accessToken} = useContext(SessionStorageContext)
    const [recommendations, setRecommendations] = useState([])
    const [errorMessage, setErrorMessage] = useState("")


    //first, function is loading all books from database, and then based on them send
    // request to marqo database to get recommendations
    const getRecommendation = async () => {
    try {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/books/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Token ${accessToken}`,
                        "Accept": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Error while loading books,try again later...");
                }

                const data_json = await response.json();
                return data_json;
            } catch (error) {
                console.error("Error while loading a book:", error);
                return [];
            }
        };

        const booksData = await fetchBooks();
        const response = await fetch("http://localhost:8000/api/rec/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booksData)
        });

        if (!response.ok) {
            setErrorMessage("Error while getting recommendations,try again later...")
        setTimeout(() =>{
            setErrorMessage("")
        },5000)
            throw new Error("Error while getting recommendations");

        }

        const recommendations = await response.json();
        setRecommendations(recommendations);
    } catch (error) {
        setErrorMessage("Error on getRecommendation function,try again later...")
        setTimeout(() =>{
            setErrorMessage("")
        },5000)
        console.error("Error on getRecommendation function:", error);
    }
};


    return (
        <>
            <div className="rec-buttons">
                <button onClick={() => getRecommendation()} className="get-rec-button">Get Recommendation!</button>

            {errorMessage &&
                <p>{errorMessage}</p>
            }
                </div>
            {recommendations.length >0 && (
                <div className="rec-books-grid">
                    {recommendations.map((book) => (
                        <div key={book.id} className="rec-book-card">
                            <img src={book.image || "/no-image.jpg"} alt={book.title}
                                 className="rec-book-image"/>
                            <div className="rec-book-info">
                                <h3>{book.title}</h3>
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Category:</strong> {book.category}</p>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </>
    )

}

export default Recommendation;