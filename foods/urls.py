from django.urls import path
from .views import FoodListAPIView, AdminFoodListAPIView, FoodDetailAPIView

app_name = 'foods'

# if ending the URL path, no more things on URL, book list url
urlpatterns = [
    path('<int:pk>/', FoodDetailAPIView.as_view()),
    path('admin/', AdminFoodListAPIView.as_view()),
    path('', FoodListAPIView.as_view()),
]
