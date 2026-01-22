from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer

# Create your views here.


# Fetches all the book entries from the database
@api_view(["GET"])
def get_book(request):
    if request.method == "GET":
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)

        if books:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "No books found"}, status=status.HTTP_404_NOT_FOUND
            )


# Create a new book entry
@api_view(["POST"])
def create_book(request):
    if request.method == "POST":
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Fetches a single book entry by id
@api_view(["GET"])
def get_book_by_id(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response({"message": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Updates a single book entry by id
@api_view(["PUT"])
def update_book(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response({"message": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookSerializer(book, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Deletes a single book entry by id
@api_view(["DELETE"])
def delete_book(request, id):
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response({"message": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    book.delete()
    return Response({"message": "Book deleted"}, status=status.HTTP_204_NO_CONTENT)
