from django.urls import path
from .views import FoodListAPIView

# if ending the URL path, no more things on URL, book list url
urlpatterns = [
    path('', FoodListAPIView.as_view()),
]