from django.urls import path
from .views import OrderListAPIView

# if ending the URL path, no more things on URL, book list url
urlpatterns = [
    path('', OrderListAPIView.as_view()),
]