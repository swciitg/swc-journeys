from .models import *
from .serializers import *
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from .permissions import IsOwner

class CommunityAPIView(ListCreateAPIView):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Community.objects.none()
        return self.queryset.filter()


class CommunityDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = CommunitySerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    queryset = Community.objects.all()
    lookup_field = "id"

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Community.objects.none()
        return self.queryset.filter()


class PostDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    queryset = Post.objects.all()
    lookup_field = "id"

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Post.objects.none()
        return self.queryset.filter(user=self.request.user)


class CommentDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    queryset = Comment.objects.all()
    lookup_field = "id"

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Comment.objects.none()
        return self.queryset.filter(user=self.request.user)


class AllCommunities(ListCreateAPIView):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save()

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Community.objects.none()
        return self.queryset.filter()
 