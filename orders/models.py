from django.db import models

# Create your models here.


class Order(models.Model):
    data = models.JSONField()

    def __str__(self):
        return str(self.data)
