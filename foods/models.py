from django.db import models

# Create your models here.


class Food(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='foods/', null=True)

    def __str__(self):
        return self.title
