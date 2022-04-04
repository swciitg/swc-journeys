from django.db import models
from django.utils.timezone import now
from django.utils import timezone
from taggit.managers import TaggableManager
from bookmarksection.models import Bookmark
from authentication.models import User

# Create your models here.


class Timeline(models.Model):
    name = models.CharField(default="No Title", max_length=264)
    date_started = models.DateTimeField(default=timezone.now)
    bookmarks = models.ManyToManyField(Bookmark, default=[])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(default="No Title", max_length=264)
