# Serializer: converts SQL table into a json format
from rest_framwork import serializers

from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "book_name", "author_name", "release_year"]
