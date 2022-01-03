from django.db import models
from qiniu import Auth,put_file,etag,urlsafe_base64_encode,PersistentFop
import qiniu.config
import os
from PIL import Image as PImage
from .models import Image
import urllib.parse
def toqiniu(filepath:str,filename:str):
    rootpath = os.getcwd()+'\\media\\pictures\\'
    # import sys
    # print (sys.argv[0])
    access_key = "MPblAd6Pb9YdQzPtsd0ChggofgA68ZF6OOJnGVXx"
    secret_key = "hSh_Wi-Fc9Z6oXk8AJxLb8OXEHqVsUAcC8M1yHaN"
    q = Auth(access_key,secret_key)
    bucket_name="bs1"
    key = filepath
    # ops = []
    # pipeline = 'default.sys'
    # pfop = PersistentFop(q,bucket_name,pipeline)
    # for i in range(2,10):
        
        # fops = 'vframe/jpg/offset/'+str(i)
        # saveas_key = urlsafe_base64_encode('bs1:cut'+str(i))
        # fops = fops+'|saveas/'+saveas_key
    # policy = {
    #     'persistentOps':fops,
    #     'persistentPipeline':pipeline
    # }
        # ops.append(fops)
    # filename = "211.png"
    token = q.upload_token(bucket_name,key,3600)
    localfile = rootpath+filename
    ret,info = put_file(token,key,localfile,version="v2")
    img = PImage.open(localfile)
    w = img.width
    h = img.height
    print(w)
    print(h)
    image = Image.objects.create(Name=filepath,Url='http://r5144j54n.hn-bkt.clouddn.com/'+urllib.parse.quote(filepath),Width=w,Height=h)
    # image.save()
    return ('http://r5144j54n.hn-bkt.clouddn.com/'+urllib.parse.quote(filepath))
    # ret,info = pfop.execute(key,ops,1)
    # print(info)
    # assert ret['persistentId'] is not None
    # assert ret['key'] == key
    # assert ret['hash'] == etag(localfile)
# http://r5144j54n.hn-bkt.clouddn.com/6042d229-33b9-4303-b022-41ceeae0b729%5Cpictures%5CQQ%E5%9B%BE%E7%89%8720190808214912.jpg
    # http://r5144j54n.hn-bkt.clouddn.com/6042d229-33b9-4303-b022-41ceeae0b729\pictures\QQ图片20190808214912.jpg
# print(urllib.parse.quote("6042d229-33b9-4303-b022-41ceeae0b729\pictures\QQ图片20190808214912.jpg")=="6042d229-33b9-4303-b022-41ceeae0b729%5Cpictures%5CQQ%E5%9B%BE%E7%89%8720190808214912.jpg")


def toqiniuvideo(filepath:str,filename:str):
    rootpath = os.getcwd()+'\\media\\videoes\\cutpictures\\'
    # import sys
    # print (sys.argv[0])
    access_key = "MPblAd6Pb9YdQzPtsd0ChggofgA68ZF6OOJnGVXx"
    secret_key = "hSh_Wi-Fc9Z6oXk8AJxLb8OXEHqVsUAcC8M1yHaN"
    q = Auth(access_key,secret_key)
    bucket_name="bs1"
    key = filepath
    # ops = []
    # pipeline = 'default.sys'
    # pfop = PersistentFop(q,bucket_name,pipeline)
    # for i in range(2,10):
        
        # fops = 'vframe/jpg/offset/'+str(i)
        # saveas_key = urlsafe_base64_encode('bs1:cut'+str(i))
        # fops = fops+'|saveas/'+saveas_key
    # policy = {
    #     'persistentOps':fops,
    #     'persistentPipeline':pipeline
    # }
        # ops.append(fops)
    # filename = "211.png"
    token = q.upload_token(bucket_name,key,3600)
    localfile = rootpath+urllib.parse.quote(filename)
    ret,info = put_file(token,key,localfile,version="v2")
    img = PImage.open(localfile)
    w = img.width
    h = img.height
    # print(w)
    # print(h)
    image = Image.objects.create(Name=filepath,Url='http://r5144j54n.hn-bkt.clouddn.com/'+urllib.parse.quote(filepath),Width=w,Height=h)
    # image.save()
    return ('http://r5144j54n.hn-bkt.clouddn.com/'+urllib.parse.quote(filepath))