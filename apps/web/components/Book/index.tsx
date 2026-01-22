// Optional: Reusable Components
// This file shows how to break down page.tsx into smaller, reusable components
// Students can learn component composition from this

import { Book } from "@/lib/types";

// ==================== BookCard Component ====================
// Displays a single book with edit and delete actions

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="card hover:shadow-lg group animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
            {book.book_name}
          </h3>
          <p className="text-slate-600 text-sm">by {book.author_name}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {book.release_year}
        </span>
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 btn bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
        >
          <svg
            className="w-4 h-4 inline mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="flex-1 btn bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
        >
          <svg
            className="w-4 h-4 inline mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

// ==================== BookForm Component ====================
// Modal form for creating or editing books

interface BookFormProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: {
    book_name: string;
    author_name: string;
    release_year: number;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string | number) => void;
  onClose: () => void;
}

export function BookForm({
  isOpen,
  isEditing,
  formData,
  onSubmit,
  onChange,
  onClose,
}: BookFormProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-slide-in">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h3>
          <p className="text-slate-600 mt-1">
            {isEditing
              ? "Update the book information"
              : "Fill in the details to add a new book"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="book_name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Book Title
            </label>
            <input
              type="text"
              id="book_name"
              required
              className="input"
              placeholder="Enter book title"
              value={formData.book_name}
              onChange={(e) => onChange("book_name", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="author_name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Author Name
            </label>
            <input
              type="text"
              id="author_name"
              required
              className="input"
              placeholder="Enter author name"
              value={formData.author_name}
              onChange={(e) => onChange("author_name", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="release_year"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Release Year
            </label>
            <input
              type="number"
              id="release_year"
              required
              min="1000"
              max="2100"
              className="input"
              placeholder="Enter release year"
              value={formData.release_year}
              onChange={(e) =>
                onChange("release_year", parseInt(e.target.value))
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="flex-1 btn btn-primary">
              {isEditing ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== EmptyState Component ====================
// Shows when there are no books

interface EmptyStateProps {
  onAddClick: () => void;
}

export function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="card text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        No books yet
      </h3>
      <p className="text-slate-600 mb-4">
        Get started by adding your first book to the collection.
      </p>
      <button onClick={onAddClick} className="btn btn-primary">
        Add Your First Book
      </button>
    </div>
  );
}

// ==================== LoadingSpinner Component ====================
// Loading indicator

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
}

// ==================== ErrorAlert Component ====================
// Displays error messages

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-slide-in">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        {message}
      </div>
    </div>
  );
}

// ==================== PageHeader Component ====================
// Header with title and add button

interface PageHeaderProps {
  onAddClick: () => void;
}

export function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Book Collection</h2>
        <p className="text-slate-600 mt-1">
          Manage your library with full CRUD operations
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="btn btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Book
      </button>
    </div>
  );
}
