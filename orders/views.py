from rest_framework import generics

from .models import Order
from .serializers import OrderSerializer

# Create your views here.
class OrderListAPIView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer # in serializer, we determine what fields are returned and are edited. Serializes information as JSON.