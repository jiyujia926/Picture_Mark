from django import http
from django.db import models
from django.shortcuts import render, resolve_url
from django.http import HttpResponse, response
from .models import Annotation, Annotationstate, Image, Mission, Tag
from user.models import User
import json
import uuid
import os
from .upload import toqiniu, toqiniuvideo
from .capturevideo import do_capture
import urllib.parse
from django.core.files import File
# Create your views here.
def newmission(request):
    data = json.loads(request.body)
    username = data['User']
    missionname = data['MissionName']
    missiondescription = data['MissionDescription']
    user = User.objects.filter(username=username).first()
    mission = Mission.objects.create(mid=uuid.uuid4(),Name=missionname,Description=missiondescription,Creator=username)
    mission.Participate.add(user)
    annotationstate = Annotationstate.objects.create(State=False)
    annotationstate.User.add(user)
    annotationstate.Mission.add(mission)
    return HttpResponse("创建成功")
def addmission(request):
    data = json.loads(request.body)
    username = data['User']
    Mid = data['Mid']
    try:
        uuid.UUID(Mid).version == 4
        user = User.objects.filter(username=username).first()
        mission = Mission.objects.filter(mid=Mid).first()
        if mission.Creator == user.username:
            return HttpResponse("无法添加自己创建的任务")
        if mission.State:
            if user in mission.Participate.all():
                return HttpResponse("任务已存在")
            annotationstate = Annotationstate.objects.create(State=False)
            annotationstate.User.add(user)
            annotationstate.Mission.add(mission)
            mission.Participate.add(user)
            return HttpResponse("添加成功")
        else:
            return HttpResponse("该任务未发布，无法添加")
    except ValueError:
        return HttpResponse("任务不存在")
    

def getmission(request):
    data = json.loads(request.body)
    username = data['User']
    user = User.objects.filter(username=username).first()
    missionlist = list(user.Participate.all().order_by('Name'))
    resdata=[]
    for mission in missionlist:
        annotaionstate = Annotationstate.objects.filter(Mission=mission,User=user).first()
        resdata.append({'mid':str(mission.mid),'name':mission.Name,
                        'description':mission.Description,'creator':mission.Creator,'state':mission.State,'checkstate':annotaionstate.State})
    print(resdata)
    return HttpResponse(json.dumps(resdata))

def uploadpictures(request):
    files = request.FILES
    # print(files)
    filenames = list(files.keys())
    print(filenames)
    i=0
    for file in files.values():
        folder_path = os.getcwd()
        folder_path = os.path.join(folder_path,"media\\pictures")
        file_path = os.path.join(folder_path,filenames[i])
        i += 1
        destination = open(file_path,'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
    # for file in files:
    #     print(file.name)
    # for f in file['upload_file']:
    #     print(f.size)
    return HttpResponse(json.dumps(filenames))
def bindpicturesandmid(request):
    data = json.loads(request.body)
    picturelist = data['picturelist']
    mid=data['mid']
    mission = Mission.objects.filter(mid=mid).first()
    for picture in picturelist:
        filepath = mid+'\\pictures\\'+ picture
        url=toqiniu(filepath,picture)
        image = Image.objects.filter(Url=url).first()
        mission.Images.add(image)
    return HttpResponse("上传成功")
def uploadvideoes(request):
    files = request.FILES
    # print(files)
    filenames = list(files.keys())
    print(filenames)
    i=0
    cutcnt = []
    for file in files.values():
        folder_path = os.getcwd()
        folder_path = os.path.join(folder_path,"media\\videoes")
        file_path = os.path.join(folder_path,urllib.parse.quote(filenames[i]))
        print(file_path)
        destination = open(file_path,'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()
        print(file_path.replace('\\','\\\\'))
        # print(urllib.parse.quote(filenames[i]))
        tempfilename = urllib.parse.quote(filenames[i])
        tempfilename = tempfilename[:tempfilename.find('.')]
        print(tempfilename)
        cnt = do_capture(file_path.replace('\\','\\\\'),tempfilename)
        cutcnt.append(cnt)
        i += 1
    # print(filenames)
    
    return HttpResponse(json.dumps({'filenames':filenames,'cutcnt':cutcnt}))
def bindvideoesandmid(request):
    data = json.loads(request.body)
    videolist = data['videolist']
    mid = data['mid']
    print(videolist)
    mission = Mission.objects.filter(mid=mid).first()
    i = 0
    for video in videolist['filenames']:
        tempfilename = video[:video.find('.')]
        j = videolist['cutcnt'][i]
        i+=1
        for k in range(0,j):
            filepath = mid+"\\videoes\\"+tempfilename+'--'+str(k)+'.jpg'
            url = toqiniuvideo(filepath,tempfilename+'--'+str(k)+'.jpg')
            image = Image.objects.filter(Url=url).first()
            mission.Images.add(image)
    return HttpResponse("上传成功")

def getpictures(request):
    data = json.loads(request.body)
    mid = data['mid']
    print(mid)
    # mid = "f95e163abe4242729dffe2ab749fa4a0"
    misson = Mission.objects.filter(mid=mid).first()
    imageslist = list(misson.Images.all())
    # print(imageslist)
    resdata = []
    for image in imageslist:
        resdata.append({'img':image.Url,'src':image.Url,'name':image.Name})
    print(resdata)
    return HttpResponse(json.dumps(resdata))
    
def annotate(request):
    # print(json.loads(request.body))
    data  = json.loads(request.body)
    mid = data['mid']
    username = urllib.parse.unquote(data['username'])
    imagelist = data['images']
    annotationlist = data['info']
    mission = Mission.objects.filter(mid=mid).first()
    user = User.objects.filter(username=username).first()
    i = 0
    
    
    # 复原
    # print(tempstr)
    # backtemp = json.loads(tempstr)
    
    for image in imagelist:
        img = Image.objects.filter(Url = image['src']).first()
        user.image.add(img)
        if annotationlist[i]:
            resultstr = tostr(annotationlist[i])
            # print(resultstr)
            annotation = Annotation.objects.create(Operations=resultstr)
            # print(annotation)
            obimagelist=user.image.all()
            obmissionimagelist = mission.SelectedImages.all()
            for obimage in obimagelist:
                if obimage==img:
                    if obimage in obmissionimagelist:
                        obannotationlist = user.annotation.all()
                        obmissionannotationlist = obimage.Annotation.all()
                        for obannotation in obannotationlist:
                            if obannotation in obmissionannotationlist:
                                # print(obannotation)
                                user.annotation.remove(obannotation)
                                obimage.Annotation.remove(obannotation)
                                obannotation.delete()
            
            
            img.Annotation.add(annotation)
            user.annotation.add(annotation)
        i+=1
            # for annotations in annotationlist[i]:
            #     annotation = Annotation.objects.create(Operations="")
    #             if annotations['type']=='polygon':
    #                 polygon = Polygon.objects.create()
    #                 for points in annotations['points']:
    #                     point = Point.objects.create(X=points[0],y=points[1])
    #                     polygon.Point.add(point)
    #                 annotation.Polygon.add(polygon)
    #             elif annotations['type']=='box':
    #                 box = Box.objects.create()
    #                 leftup = Point.objects.create(X=annotations['x'],Y=annotations['y'])
    #                 leftdown = Point.objects.create(X=annotations['x'],Y=annotations['y']-annotations['h'])
    #                 rightup = Point.objects.create(X=annotations['x']+annotations['w'],Y=annotations['y'])
    #                 rightdown = Point.objects.create(X=annotations['x']+annotations['w'],Y=annotations["y"]-annotations['h'])
    #                 box.LeftUp.add(leftup)
    #                 box.LeftDown.add(leftdown)
    #                 box.RightUp.add(rightup)
    #                 box.RightDown.add(rightdown)
    #                 annotation.Box.add(box)
    #             img.Annotation.add(annotation)
    #             user.Annotation.add(annotation)
    #     i+=1
                
    
    
    return HttpResponse("保存成功")

def tostr(raw):
    temp = raw
    # print(temp)
    for anno in temp:
        if 'open' in anno.keys():
            if anno['open']:
                anno['open']='True'
            else:
                anno['open']='False'
        if 'highlighted' in anno.keys():
            if anno['highlighted']:
                anno['highlighted']='True'
            else:
                anno['highlighted']='False'
        if 'editingLabels' in anno.keys():
            if anno['editingLabels']:
                anno['editingLabels']='True'
            else:
                anno['editingLabels']='False'
        if 'visible' in anno.keys():
            if anno['visible']:
                anno['visible']='True'
            else:
                anno['visible']='False'    
    tempstr = str(temp).replace('\'','\"')
    return tempstr

def handinmission(request):
    data = json.loads(request.body)
    print(data)
    mid = data['mid']
    imagelist = data['images']
    taglist = data['tags']
    mission = Mission.objects.filter(mid=mid).first()
    mission.Tag.clear()
    mission.SelectedImages.clear()
    for tag in taglist:
        onetag = Tag.objects.create(Tag=tag)
        mission.Tag.add(onetag)
    for image in imagelist:
        oneimage = Image.objects.filter(Url=image['img']).first()
        mission.SelectedImages.add(oneimage)
    mission.State = 1
    mission.save()
    return HttpResponse("发布成功")

def getdata(request):
    data = json.loads(request.body)
    mid = data['mid']
    username = urllib.parse.unquote(data['username'])
    # print(username)
    user = User.objects.filter(username=username).first()
    mission = Mission.objects.filter(mid=mid).first()
    missionlist = list(Mission.objects.values().filter(mid=mid))
    resdata={}
    if missionlist:
        resdata['description']=missionlist[0]['Description']
        imagelist = []
        imageset = mission.SelectedImages.all()
        for image in imageset:
            obimagelist=user.image.all()
            region=[]
            obmissionimagelist = mission.SelectedImages.all()
            for obimage in obimagelist:
                if obimage==image:
                    if obimage in obmissionimagelist:
                        obannotationlist = user.annotation.all()
                        obmissionannotationlist = obimage.Annotation.all()
                        for obannotation in obannotationlist:
                            if obannotation in obmissionannotationlist:
                                # print(obannotation)
                                region=json.loads(obannotation.Operations)
            # print(region)
            imagelist.append({'name':image.Name,'src':image.Url,'img':image.Url,'regions':region})
        taglist = []
        tagset = mission.Tag.all()
        for tag in tagset:
            taglist.append(tag.Tag)
        resdata['images']=imagelist
        resdata['tags']=taglist
    # print(resdata)
    return HttpResponse(json.dumps(resdata))

def deletemission(request):
    data = json.loads(request.body)
    mid = data['mid']
    mission = Mission.objects.filter(mid=mid).first()
    mission.Participate.clear()
    mission.Images.clear()
    mission.SelectedImages.clear()
    mission.Tag.clear()
    mission.delete()
    return HttpResponse("删除成功")

def quitmission(request):
    data = json.loads(request.body)
    mid = data['mid']
    username = urllib.parse.unquote(data['username'])
    mission = Mission.objects.filter(mid=mid).first()
    user = User.objects.filter(username=username).first()
    mission.Participate.remove(user)
    return HttpResponse("删除成功")

def missionannotation(request):
    data = json.loads(request.body)
    mid = data['mid']
    mission = Mission.objects.filter(mid=mid).first()
    resdata = []
    participate = mission.Participate.all()
    for part in participate:
        annotationstate = Annotationstate.objects.filter(Mission=mission,User=part.username).first()
        resdata.append({'user':part.username,'state':annotationstate.State})
    return HttpResponse(json.dumps(resdata))

def changestate1(request):
    data = json.loads(request.body)
    mid = data['mid']
    username = urllib.parse.unquote(data['username'])
    mission = Mission.objects.filter(mid=mid).first()
    user = User.objects.filter(username=username).first()
    annotationstate = Annotationstate.objects.filter(Mission=mission,User=user).first()
    annotationstate.State = 1
    annotationstate.save()
    return HttpResponse("审核成功")

def changestate2(request):
    data = json.loads(request.body)
    mid = data['mid']
    username = urllib.parse.unquote(data['username'])
    mission = Mission.objects.filter(mid=mid).first()
    user = User.objects.filter(username=username).first()
    annotationstate = Annotationstate.objects.filter(Mission=mission,User=user).first()
    annotationstate.State = 2
    annotationstate.save()
    return HttpResponse("审核成功")

def export(request,mid,username):
    # data = json.loads(request.body)
    # mid = data['mid']
    # username = data['username']
    # mid = "02401a16-35de-4a0a-a422-00ed49eb6d31"
    # username = "11"
    mission = Mission.objects.filter(mid=mid).first()
    user = User.objects.filter(username=username).first()
    destination = {}
    destination["info"]={"description":mission.Description,"url":"","version":"1.0","year":2021,"contributor":username,"data_created":str(mission.CreatedTime)}
    destination["licenses"]=[{"url":"","id":1,"name":""}]
    destination["images"]=[]
    destination["annotations"]=[]
    destination["categories"]=[]
    tags = mission.Tag.all()
    for tag in tags:
        destination["categories"].append({"supercategory":tag.Tag,"id":tag.id,"name":tag.Tag})
    imageslist = mission.SelectedImages.all()
    for images in imageslist:
        temp ={}
        temp["license"]=1
        temp["file_name"]=images.Name
        temp["coco_url"]=""
        temp["height"]=float(images.Height)
        temp["width"]=float(images.Width)
        temp["date_captured"]=str(images.CreatedTime)
        temp["qiniu_url"]=images.Url
        temp["id"]=images.id
        obimagelist=user.image.all()
        region = []
        width = float(images.Width)
        height = float(images.Height)
        for obimage in obimagelist:
            if obimage==images:
                if obimage in imageslist:
                    obannotationlist = user.annotation.all()
                    obmissionannotationlist = obimage.Annotation.all()
                    for obannotation in obannotationlist:
                        if obannotation in obmissionannotationlist:
                            # print(obannotation)
                            region=json.loads(obannotation.Operations)
                            for anno in region:
                                a={}
                                if anno['type']=="polygon":
                                    a["segmentation"]=[]
                                    pointlist=[]
                                    for points in anno['points']:
                                        x = float(points[0])*float(width)
                                        points[0] = round(x,2)
                                        y = float(points[1])*float(height)
                                        points[1] = round(y,2)
                                        pointlist.append(round(x,2))
                                        pointlist.append(round(y,2))
                                    a["segmentation"].append(pointlist)
                                    a["area"] = polygonarea(anno["points"])
                                    a["iscrowd"] = 0
                                    a["image_id"] = images.id
                                    a["bbox"] = [0,0,width,height]
                                    tagid = 0
                                    for tagob in destination["categories"]:
                                        if tagob['name']==anno['cls']:
                                            tagid = tagob['id']
                                    a["category_id"]=tagid
                                    a["id"]=obannotation.id
                                else:
                                    a["segmentation"]=[[round(anno['x']*width,2),
                                                        round(anno['y']*height,2),
                                                        round((anno['x']+anno['w'])*width,2),
                                                        round(anno['y']*height,2),
                                                        round((anno['x']+anno['w'])*width,2),
                                                        round((anno['y']-anno['h'])*height,2),
                                                        round(anno['x']*width,2),
                                                        round((anno['y']-anno['h'])*height,2)]]
                                    a["area"]=round(width*anno['w']*height*anno['h'],2)
                                    a["iscrowd"]=0
                                    a["image_id"]=images.id
                                    a["bbox"]=[0,0,width,height]
                                    tagid = 0
                                    for tagob in destination["categories"]:
                                        if tagob['name']==anno['cls']:
                                            tagid = tagob['id']
                                    a["category_id"]=tagid
                                    a["id"]=obannotation.id
                                destination["annotations"].append(a)
        destination["images"].append(temp)        
    final=json.dumps(destination,ensure_ascii=False)
    fileob = open('export.json','w',encoding="utf-8")
    fileob.write(final)
    fileob.close()
    with open('export.json','rb') as f:
        file = File(f)
        responses = HttpResponse(file.chunks(),content_type="APPLICATION/OCET-STREAM")
        responses["Content-Disposition"] = 'attachment; filename=export.json'
        responses["Content-Length"]=os.path.getsize('export.json') 
    return responses


def polygonarea(points):
    area=0
    q=points[-1]
    for p in points:
        area += p[0]*q[1]-p[1]*q[0]
        q = p
    return abs(area/2)
                                    
                                        