from rest_framework import serializers
from .models import Timeline
from django.contrib.auth.models import User
from django.utils import timezone
from taggit.managers import TaggableManager


class TimelineSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Timeline
        fields = ('author', 'id','name', 'date_started', 'bookmarks', 'description')

