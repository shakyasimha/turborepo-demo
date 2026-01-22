from django.db import models


# Create your models here.
class Book(models.Model):
    book_name = models.CharField(max_length=256)
    author_name = models.CharField(max_length=256)
    release_year = models.IntegerField()
