from email.policy import default
from django.db import models
from jsonfield import JSONField

class Books(models.Model):

    title = models.CharField(max_length=200, default='0')
    book_id = models.CharField(max_length=200, default='0')
    url = models.URLField(max_length=200, default='0')
    cover_image = models.URLField(max_length=200, default='0')