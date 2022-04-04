
from django.contrib.auth import views as auth_views
from . import views
from .views import *
from django.urls import path,include
from .models import Bookmark
from rest_framework.routers import DefaultRouter

app_name = 'bookmarksection'

urlpatterns = [
    path('bookmarkApi/', views.BookmarkAPIView.as_view()),
    path('bookmarkApi/<int:pk>/', views.BookmarkDetail.as_view()),  
    path('bookmarkApi/discover', views.DiscoverBookmarkApiView.as_view()),
    path('bookmarkApi/search/', views.BookmarkListDetailFilter.as_view()),
    path('bookmarkApi/favorites/', views.FavoriteApiView.as_view()),

]
