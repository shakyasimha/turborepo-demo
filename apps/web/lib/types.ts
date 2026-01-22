// types.ts
// Type definitions for the Book Management application

// Represents a Book object from the Django API
export interface Book {
  id: number;
  book_name: string;
  author_name: string;
  release_year: number;
}

// Form data type (same as Book but without id)
export interface BookFormData {
  book_name: string;
  author_name: string;
  release_year: number;
}

// API Response types
export interface ApiError {
  message: string;
  status?: number;
}

// Optional: If your API returns paginated results
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
