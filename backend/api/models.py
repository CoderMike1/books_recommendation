from django.db import models
from django.contrib.auth.models import User
import uuid


#model of Book that contains user, title,author,category etc.
class Book(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    isbn_13_number = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField()
    image = models.URLField(blank=True,null=True)

    def __str__(self):
        return self.title
