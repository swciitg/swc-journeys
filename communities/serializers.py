from rest_framework import serializers
from .models import Community, Post, Comment
from django.contrib.auth.models import User


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ['community_name', 'description', 'members', 'posts']


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['body', 'created_at', 'comments']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content', 'created_at']
