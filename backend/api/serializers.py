from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id','isbn_13_number','title','author','category','description','image']
        extra_kwargs = {'user': {'read_only': True}}