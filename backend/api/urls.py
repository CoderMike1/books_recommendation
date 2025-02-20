from django.urls import path,include

from rest_framework.routers import DefaultRouter
from .views import RegisterView,LoginView,BookViewSet,RecommendationView
from rest_framework.authtoken.views import obtain_auth_token
router = DefaultRouter()
router.register(r'books',BookViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path("register/", RegisterView.as_view(), name='register'),
    path("login/", obtain_auth_token, name='login'),
    path('rec/',RecommendationView.as_view(),name='rec')
]