import cv2
import os
import shutil
def do_capture(filepath:str,filename:str):
    print(filename)
    print(os.getcwd())
    # filepath = "D:\\Picture_Mark\\code\\picture_mark\\media\\videoes\\演示视频.mp4"
    vc = cv2.VideoCapture(filepath)
    c = 0
    print('```````````````')
    if vc.isOpened():
        print("yes")
        rval,frame = vc.read()
    else:
        rval = False
        print("false")
    timeF = 10000000
    i=0
    while rval:
        rval,frame = vc.read()
        # print(c,timeF,c%timeF)
        if (c%timeF == 0):
            # print("write...")
            print(os.getcwd()+'/media/videoes/cutpictures/'+filename+'--'+str(i)+'.jpg')
            cv2.imwrite(os.getcwd()+'/media/videoes/cutpictures/'+filename+'--'+str(i)+'.jpg',frame)
            # print("success")
            i+=1
        c += 200000
    cv2.waitKey(1)
    vc.release()
    print('```````````````````````````````')
    print(i)
    return i
if __name__ == "__main__":
    do_capture("D:\\Picture_Mark\\code\\picture_mark\\media\\videoes\\%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91.mp4","%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91")