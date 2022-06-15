from django.urls import path
from .views import OrderListAPIView, OrderDetailAPIView

app_name = 'orders'

# if ending the URL path, no more things on URL, book list url
urlpatterns = [
    path('<int:pk>/', OrderDetailAPIView.as_view()),
    path('', OrderListAPIView.as_view()),
]
