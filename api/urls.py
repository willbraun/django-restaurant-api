from django.urls import path, include
from orders.views import OrderListAPIView

urlpatterns = [
    path('orders/', include('orders.urls')),
]