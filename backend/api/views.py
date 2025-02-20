from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Book
from .serializers import BookSerializer
from .utils import getRecommendations

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]  # only logged in users

    def get_queryset(self):
        return Book.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error":"Username already taken"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message":"User registered successfully"})


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})

        return Response({"error": "Incorrect login or password"}, status=400)


class RecommendationView(APIView):
    def post(self, request):
        books_data = request.data
        input_string = "\n".join(
            f"Book {i + 1}:\nTitle: \"{book['title']}\", Author: \"{book['author']}\", Category: \"{book['category']}\", ISBN: \"{book['isbn_13_number']}\", Description: \"{book['description']}\""
            for i, book in enumerate(books_data)
        )
        results = getRecommendations(input_string)
        return Response(results, status=200)