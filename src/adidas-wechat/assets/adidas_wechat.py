import time
import itchat
from itchat.content import *

# judgment a char is a operation or not
def is_operation(oper):
    if oper == '+' or oper == '-' or oper == '*' or oper == '/':
        return True
    else:
        return False

# split expression
def mixed_operation(exp):
    exp_list = list(exp)
    temp = ''
    behavor_list = []
    i = 0
    length = len(exp_list)
    for item in exp_list:
        if is_operation(item):
            behavor_list.append(int(temp))
            behavor_list.append(item)
            temp = ''
        else:
            temp += item

        if i == length - 1:
            behavor_list.append(int(temp))
            break;

        i += 1

    return behavor_list


# cal a o b
def get_aob(a, o, b):
    if o == '+':
        return a + b
    elif o == '-':
        return a - b
    elif o == '*':
        return a * b
    elif o == '/':
        return a / b


# Calculation op1 and op2('*' and '/' or '+' and '-')
def cal_op1_op2(exp_list, op1, op2):
    if len(exp_list) == 1:
        return exp_list

    i = 0
    has_op = False
    for i in range(2, len(exp_list), 2):
        a = exp_list[i - 2]
        o = exp_list[i - 1]
        b = exp_list[i]
        if o == op1 or o == op2:
            has_op = True
            exp_list[i - 2] = get_aob(a, o, b)
            del exp_list[i]
            del exp_list[i - 1]
            break

    if has_op == False:
        return exp_list

    return cal_op1_op2(exp_list, op1, op2)


# cal exp
def cal_exp(exp_list):
    exp_list = cal_op1_op2(exp_list, '*', '/')
    exp_list = cal_op1_op2(exp_list, '+', '-')
    return exp_list[0].split('.')[0]

print ('#Adidas微信公众号预约助手V3#')
print ('#G0TEM团队出品#')
print ('#请关注公众号获取使用权限：G0TEM#')
print ('#感谢支持#')

def formatTimeStr(str):
    return str[0:10] + " " + str[11:19]


def getTime(str):
    return time.mktime(time.strptime(formatTimeStr(str), "%Y-%m-%d %H:%M:%S"))


def getLocalTimeStr(str):
    tm = getTime(str)
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(float(tm + 28800)))

try:
    itchat.auto_login(hotReload=True)
except:
    input('请先确认微信号可以登录网页版微信并且网络可以登录网页版微信，再重新打开助手')
try:
    GOTEM = itchat.search_mps('GOTEM')[0]
    if not GOTEM.is_friend:
        raise BaseException
except:
    pass
    # input("请先确认关注GOTEM官方公众号才有使用权限，如已经关注，请删除itch.pkl并重新打开软件，谢谢！")
    # raise BaseException
try:
    adidases = itchat.search_mps('adidas')
    k = 1
    for adi in adidases:
        print(str(k)+':'+adi['NickName'])
        k+=1
    idx = input('请选择活动参与的公众号序号:')
    realindex = int(idx) - 1
    adidas = adidases[realindex]
except:
    input("请先确认关注了adidas或者adidas orginal官方公众号")

# config info
while True:
    try:
        idCard = input('请输入登记身份证号:')
        phone = input('请输入登记手机号:')
        city = input('请输入登记城市口令【按照官方格式要求输入，比如YEEZY成都】:')
        styleCode = input('请输入登记鞋码【按照官方格式要求输入，比如A，没有就随便输入】:')
        confirm = input('1.确认输入，2.重新修改:')
        if confirm == '1':
            break
        pass
    except:
        print('输入有误请重试')
@itchat.msg_register(TEXT,isMpChat=True)
def text_reply(msg):
    # 回复消息内容和类型
    nowTm = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))
    print('{}---收到消息: {}'.format(nowTm,msg['Text']))
    if msg['FromUserName'] != adidas['UserName']:
        return
    resp = msg['Content']
    if '=？' in resp:
        respstr = resp.split('问题：')[1]
        formatstr = respstr.split('=？')[0]
        respstr = formatstr.strip()
        respstr = respstr.replace('乘以', '*')
        respstr = respstr.replace('加上', '+')
        respstr = respstr.replace('减去', '-')
        respstr = respstr.replace('除以', '/')
        respstr = respstr.replace('乘','*')
        respstr = respstr.replace('加', '+')
        respstr = respstr.replace('减', '-')
        respstr = respstr.replace('除', '/')
        result = cal_exp(mixed_operation(respstr))
        adidas.send(result)
        return
    if '请严格按上述格式回复' in resp:
        respstr = resp.split('例如：')[1]
        formatstr = respstr.split('\n')[0]
        respstr = formatstr.strip()
        res = respstr.split('，')
        phoneNum = 'xsxa'
        idNum = 'xsxs'
        sizeNum = 'A'
        for r in res:
            if len(r) == 1 and r.isalpha():
                sizeNum = r
            if len(r) == 11:
                phoneNum = r
            if len(r) == 18:
                idNum = r
        respstr = respstr.replace(sizeNum,styleCode)
        respstr = respstr.replace(phoneNum,phone)
        respstr = respstr.replace(idNum,idCard)
        itchat.send(msg=respstr, toUserName=adidas['UserName'])
        print('{}---发送消息：'.format(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))) + respstr + ',等待回复')
    return
input('输入回车确认开始发送消息预约口令:')
itchat.send(msg=city,toUserName=adidas['UserName'])
print('{}---发送消息：'.format(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time())))+city+',等待回复')
itchat.run()



