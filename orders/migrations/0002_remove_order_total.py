# Generated by Django 4.0.5 on 2022-06-13 20:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='total',
        ),
    ]