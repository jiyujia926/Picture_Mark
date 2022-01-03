from typing import Tuple
from cv2 import FlannBasedMatcher
from django.db import models
import uuid

from django.utils import tree
from user import models as user_model
# Create your models here.

# class Point(models.Model):
#     X = models.DecimalField(max_digits=10,decimal_places=10)
#     Y = models.DecimalField(max_digits=10,decimal_places=10)

# class Box(models.Model):
#     LeftUp = models.ManyToManyField(Point,related_name="LeftUp")
#     LeftDown = models.ManyToManyField(Point,related_name="LeftDown")
#     RightUp = models.ManyToManyField(Point,related_name="RightUp")
#     RightDown = models.ManyToManyField(Point,related_name='RightDown')

# class Polygon(models.Model):
#     Point = models.ManyToManyField(Point)
class Annotation(models.Model):
    # Box = models.ManyToManyField(Box)
    # Polygon = models.ManyToManyField(Polygon)
    # Tag = models.TextField()
    Operations = models.TextField()
    CreatedTime = models.DateField(auto_now_add=True)

class Image(models.Model):
    Name = models.TextField()
    Url = models.TextField()
    Width = models.TextField()
    Height = models.TextField()
    CreatedTime = models.DateField(auto_now_add=True)
    Annotation = models.ManyToManyField(Annotation)

class Tag(models.Model):
    Tag = models.TextField()
class Mission(models.Model):
    mid = models.UUIDField(primary_key=True)
    Participate = models.ManyToManyField(user_model.User,related_name="Participate")
    Creator = models.TextField()
    Name = models.TextField()
    Description = models.TextField()
    Images = models.ManyToManyField(Image,related_name="Images")
    SelectedImages = models.ManyToManyField(Image,related_name="SelectedImages")
    State = models.BooleanField(default=False)
    Tag = models.ManyToManyField(Tag)
    CreatedTime = models.DateField(auto_now_add=True)
    # Annotation = models.ManyToManyField(Annotation)
    
class Annotationstate(models.Model):
    State = models.IntegerField(default=0)
    User = models.ManyToManyField(user_model.User)
    Mission = models.ManyToManyField(Mission)
