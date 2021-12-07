from django import http
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.http import HttpResponse
from . import models

import json
# Create your views here.
def register(request):
    # print(request)
    data = json.loads(request.body)
    print(data)
    models.User.objects.create(**data)
    return HttpResponse("success!!!!!!")

def login(request):
    data = json.loads(request.body)
    print(data)
    logininguser = list(models.User.objects.values('password').filter(username=data['username']))
    if logininguser:
        if logininguser[0]['password'] == data['password']:
            return HttpResponse("密码正确")
        else:
            return HttpResponse("密码错误")
    else:
        return HttpResponse("未注册")
    
def index(request):
    return HttpResponse("!!!!!!!!!!!!!!!")