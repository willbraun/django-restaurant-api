from django.db import models

# Create your models here.


class Order(models.Model):
    data = models.JSONField()
    completed = models.BooleanField(default=False)
    cancelled = models.BooleanField(default=False)

    def __str__(self):
        return str(self.data)
