from rest_framework import serializers
from .models import Bookmark
from django.contrib.auth.models import User
from django.utils import timezone
from taggit.managers import TaggableManager


class BookmarkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bookmark
        fields = ['id', 'title_name', 'url_field','date', 'description','image_field','tags', 'favorite']
        
