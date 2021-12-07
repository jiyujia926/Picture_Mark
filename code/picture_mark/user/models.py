from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(primary_key=True,null=False,max_length=256)
    password = models.CharField(max_length=256,null=False)
    emailaddress = models.EmailField()
    telephone = models.CharField(max_length=11)