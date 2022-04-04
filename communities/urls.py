from . import views
from .views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

app_name = 'communities'

urlpatterns = [
    path('communitiesApi/', views.CommunityAPIView.as_view()),
    path('communitiesApi/<int:pk>', views.CommunityDetail.as_view()),
    path('communitiesApi/<community_id>/posts/<int:pk>/',
         views.PostDetail.as_view()),
    path('communitiesApi/<community_id>/posts/<post_id>/comments/<int:pk>',
         views.CommentDetail.as_view()),
     path('communitiesApi/exploreCommunities/', views.AllCommunities.as_view())
]
