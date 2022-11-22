from rest_framework import serializers
from .models import Books

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ('id', 'title', 'book_id', 'url', 'cover_image')