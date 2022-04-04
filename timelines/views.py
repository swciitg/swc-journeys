from django.db.models import query
from rest_framework.response import Response
from .models import *
from .serializers import TimelineSerializer
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework import permissions, response, status
from .permissions import IsOwner
from bookmarksection.serializers import BookmarkSerializer
from bookmarksection.models import *
class ExploreTimelineView(ListAPIView):
    serializer_class = TimelineSerializer
    queryset = Timeline.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Timeline.objects.none()
        return self.queryset

class TimelineAPIView(ListCreateAPIView):
    serializer_class = TimelineSerializer
    queryset = Timeline.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Timeline.objects.none()
        return self.queryset.filter(user=self.request.user)


class TimelineBookmarks(ListAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "pk"

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Timeline.objects.none()
        timeline = Timeline.objects.get(pk=self.kwargs['pk'])
        # queryset = []

        # for bookmark_id in timeline.bookmarks:
        #     queryset.append(Bookmark.objects.get(id=bookmark_id))
        return timeline.bookmarks.all()

class TimelineDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = TimelineSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    queryset = Timeline.objects.all()
    lookup_field = "pk"

    def patch(self, request, pk, *args, **kwargs):
        print(request.data)
        timeline = Timeline.objects.get(pk = pk)
        return Response(TimelineSerializer(timeline).data)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, pk, *args, **kwargs):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Timeline.objects.none()
        timeline = Timeline.objects.get(pk = pk)
        timeline_data = TimelineSerializer(timeline).data
        return Response(timeline_data)
    
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Timeline.objects.none()
        return self.queryset.filter(user=self.request.user)
    
    def perform_update(self, *args, **kwargs):
        pk = self.kwargs.get('pk')
        print(self.request.data)
        timeline = Timeline.objects.get(pk = pk)
        for bookmark_id in self.request.data["bookmarks"]:
            print("BOOKMARKS IDDSSSSSSSSSSSSDSDADASDAWD")
            print(bookmark_id)
            bookmark = Bookmark.objects.get(pk = bookmark_id)
            timeline.bookmarks.add(bookmark)
        timeline.save()
        return Response(TimelineSerializer(timeline).data)
    