from django.db import models
from decimal import Decimal

# Create your models here.


class Food(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    imgSrc = models.ImageField(upload_to='foods/', null=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
