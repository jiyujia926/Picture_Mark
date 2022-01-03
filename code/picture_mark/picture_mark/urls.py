"""picture_mark URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
# from code.picture_mark import mark
from user import views as user_views
from mark import views as mark_views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/',user_views.register),
    path('login/',user_views.login),
    path('',user_views.index),
    path('newmission/',mark_views.newmission),
    path('getmission/',mark_views.getmission),
    path('addmission/',mark_views.addmission),
    path('uploadpictures/',mark_views.uploadpictures),
    path('bindpicturesandmid/',mark_views.bindpicturesandmid),
    path('uploadvideoes/',mark_views.uploadvideoes),
    path('bindvideoesandmid/',mark_views.bindvideoesandmid),
    path('getpictures/',mark_views.getpictures),
    path('annotate/',mark_views.annotate),
    path('handinmission/',mark_views.handinmission),
    path('getdata/',mark_views.getdata),
    path('deletemission/',mark_views.deletemission),
    path('quitmission/',mark_views.quitmission),
    path('missionannotation',mark_views.missionannotation),
    path('changestate1/',mark_views.changestate1),
    path('changestate2/',mark_views.changestate2),
    path('export/<str:mid>/<str:username>',mark_views.export)
]
