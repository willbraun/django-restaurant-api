from django.urls import path, include


app_name = 'api'

urlpatterns = [
    path('foods/', include('foods.urls', namespace='foods')),
    path('orders/', include('orders.urls', namespace='orders')),
]
