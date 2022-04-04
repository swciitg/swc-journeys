from django.db import models
from django.conf import settings
from django.contrib import auth
from django.utils.timezone import now
from django.utils import timezone
from taggit.managers import TaggableManager
import json
from django.db.models.signals import post_save
from authentication.models import User


# Create your models here.


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title_name = models.CharField(default="No Title", max_length=264)
    url_field = models.URLField(max_length=200, unique=True)
    date = models.DateTimeField(default=timezone.now)
    description = models.CharField(
        default="No Description", max_length=500, null=True)
    image_field = models.URLField(default="none", max_length=1000, null=True)
    tags = models.CharField(default="",max_length=2000, blank=True)
    favorite = models.BooleanField(default=False)

    def set_tags(self, x):
        self.tags = json.dumps(x)

    def get_tags(self):
        try:
            return json.loads(self.tags)
        except:
            return []