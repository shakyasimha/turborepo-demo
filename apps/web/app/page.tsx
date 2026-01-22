"use client";

import { useState, useEffect } from "react";

// ============================================================================
// STEP 1: Define what a Book looks like
// ============================================================================
interface Book {
  id: number;
  book_name: string;
  author_name: string;
  release_year: number;
}

// ============================================================================
// STEP 2: Set your Django API URL
// ============================================================================
const API_URL = "http://localhost:8000/api/books";

export default function BooksPage() {
  // ========================================================================
  // STEP 3: Create "boxes" to store data (called "state")
  // ========================================================================
  // Think of these as variables that automatically update the page when changed

  const [books, setBooks] = useState<Book[]>([]); // List of all books
  const [loading, setLoading] = useState(true); // Are we loading?
  const [showForm, setShowForm] = useState(false); // Show/hide form

  // Form data - what the user types
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [year, setYear] = useState(2024);

  // ========================================================================
  // STEP 4: FETCH ALL BOOKS (READ) - Runs when page loads
  // ========================================================================
  const fetchBooks = async () => {
    const response = await fetch(API_URL + "/"); // GET request
    const data = await response.json(); // Convert to JavaScript
    setBooks(data); // Update our books list
    setLoading(false); // Stop loading
  };

  // Run fetchBooks() when page first loads
  useEffect(() => {
    fetchBooks();
  }, []);

  // ========================================================================
  // STEP 5: CREATE NEW BOOK (CREATE)
  // ========================================================================
  const createBook = async () => {
    // Send POST request to Django
    await fetch(API_URL + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book_name: bookName,
        author_name: authorName,
        release_year: year,
      }),
    });

    // Clear form and refresh books
    setBookName("");
    setAuthorName("");
    setYear(2024);
    setShowForm(false);
    fetchBooks(); // Reload the list
  };

  // ========================================================================
  // STEP 6: DELETE BOOK (DELETE)
  // ========================================================================
  const deleteBook = async (id: number) => {
    // Send DELETE request to Django
    await fetch(`${API_URL}/${id}/`, {
      method: "DELETE",
    });

    fetchBooks(); // Reload the list
  };

  // ========================================================================
  // STEP 7: DISPLAY THE PAGE (HTML-like code)
  // ========================================================================
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <h1>📚 Book Management</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: "10px 20px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {showForm ? "Cancel" : "Add New Book"}
      </button>

      {/* Form - Only shows when showForm is true */}
      {showForm && (
        <div
          style={{
            background: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Book Title"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={createBook}
            style={{
              padding: "10px 20px",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save Book
          </button>
        </div>
      )}

      {/* Loading message */}
      {loading && <p>Loading books...</p>}

      {/* Books List */}
      <div>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 5px 0" }}>{book.book_name}</h3>
              <p style={{ margin: 0, color: "#666" }}>
                by {book.author_name} ({book.release_year})
              </p>
            </div>
            <button
              onClick={() => deleteBook(book.id)}
              style={{
                padding: "8px 16px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && books.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>
          No books yet. Click "Add New Book" to get started!
        </p>
      )}
    </div>
  );
}
