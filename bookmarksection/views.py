from re import search
from django.contrib.auth import get_user
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, Http404
import requests
from rest_framework import response
from rest_framework.serializers import Serializer
from .Scraper import scraper
from rest_framework import status
from .models import *
from .serializers import BookmarkSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from timelines.models import Timeline
from rest_framework import permissions
from .permissions import IsOwner
from rest_framework import filters
import json
from django.forms.models import model_to_dict

class BookmarkListDetailFilter(ListAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title_name','tags']
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Bookmark.objects.none()
        return self.queryset.filter(user = self.request.user)

class FavoriteApiView(ListAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Bookmark.objects.none()
        return self.queryset.filter(user = self.request.user, favorite=True)
        


class BookmarkAPIView(ListCreateAPIView):
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        print(self.request)
        url = self.request.data['url_field']
        scrap = scraper(url)
        data = {'url_field':url,'description':scrap.description,'title_name' : scrap.title,'image_field':scrap.imgsrc, 'tags':json.dumps(scrap.tags)}
        serializer = BookmarkSerializer(data=data)
        print(serializer)
        if serializer.is_valid():
            response = serializer.save(user=self.request.user)
            # curr_bookmark = Bookmark.objects.get(url_field = url)
            # for tag in scrap.tags :
            #     curr_bookmark.tags.add(tag)
            # curr_bookmark.save()
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Bookmark.objects.none()
        return self.queryset.filter(user=self.request.user)
       
    
        


class BookmarkDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    queryset = Bookmark.objects.all()
    lookup_field = "pk"

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Bookmark.objects.none()
        return self.queryset.filter(user=self.request.user)
    
    def get(self, request, pk, *args, **kwargs):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Bookmark.objects.none()
        bookmark = Bookmark.objects.get(pk = pk)
        # print(bookmark.tags.names())
        bookmark_data = BookmarkSerializer(bookmark).data
        # bookmark_data["tags"] = bookmark.tags.names()
        return Response(bookmark_data)
    
    

    

class DiscoverBookmarkApiView(ListCreateAPIView):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    lookup_field = "id"
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
        # queryset just for schema generation metadata
            return Bookmark.objects.none()
        recent_bookmarks = []
        all_bookmarks = self.queryset.filter(user = self.request.user)
        if len(all_bookmarks)>20 :
            recent_bookmarks = all_bookmarks[:20] 
        else:
            recent_bookmarks = all_bookmarks
        discoverBookmarks = []
        tags = []
        for bookmark in recent_bookmarks:
            j=0
            if(len(bookmark.get_tags())>0):
                for tag in bookmark.get_tags():
                    if(j>2):
                        break
                    j=j+1
                    tags += [str(tag)]
                    print(tags)
        
        url = ('http://newsapi.org/v2/everything?'
            'q='+ " OR ".join(tags) +'&'
            'sortBy=relevancy&'
            'apiKey=cf1b43b651c3472195adf4de93c011b3')
        response = requests.get(url)
        print(response.json())
        tag_json = response.json()
        for article in tag_json['articles']:
            print(article)
            if len(discoverBookmarks)>20:
                break
            discoverBookmark = Bookmark(user=self.request.user, url_field=article['url'], title_name = article['title'], description=article['description'] , image_field=article['urlToImage'])
            discoverBookmarks.append(discoverBookmark)
        return discoverBookmarks 

