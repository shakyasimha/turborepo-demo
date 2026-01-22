import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Management System",
  description: "A simple CRUD application for managing books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Book Management System
                </h1>
                <p className="text-sm text-slate-600">
                  Django REST API + Next.js Frontend
                </p>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
