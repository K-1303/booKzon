# Generated by Django 4.1.1 on 2022-10-29 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='books',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
