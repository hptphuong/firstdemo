
from api.models import (
    fsa_site,
    fsa_user,
    user_daily,
    user_daily_report, # Pure model, not have serialize
    newuser_daily_report,
    location_report,
    device_report,
    browser_report,
    page_view_report,
    browser_language_report
)
from api.serializers import (
	FsaSiteModelSerializer,
	FsaUserSerializer,
	UserDailySerializer
)

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import logging
from datetime import datetime

from dateutil import tz
from cassandra.cqlengine.connection import get_session
import json
logger = logging.getLogger(__name__)
#curl http://localhost:8000/user/ -X POST 
# -H "Content-Type: application/json" 
# -d '{"idx":"1002","user_id":"fsoft1002",
# "email":"huynhthang@gmail.com","password":"123456",
# "first_name":"thang","last_name":"huynh","url":"123434"}'

# curl http://localhost:8000/user/fsoft1001/ -X PUT 
# -H "Content-Type: application/json" 
# -d '{"idx":"1003","user_id":"fsoft1003",
# "email":"trantu.uit@gmail.com","password":"tu",
# "first_name":"tu","last_name":"tran"}'

@csrf_exempt
def fsaSiteList(request):
    """
    List all code apis, or create a new snippet.
    """
    if request.method == 'GET':
        api = fsa_site.objects.all()
        serializer = FsaSiteModelSerializer(api, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
    	logger.warn("parse data>>>>>>>>>>>>>>>>>>>")
    	data = JSONParser().parse(request)
    	logger.warn("passed >>>>>>>>>>>>>>>>>>>")
    	logger.warn("data:"+data['idsite'])
    	serializer = FsaSiteModelSerializer(data=data)
    	if serializer.is_valid():
    		serializer.save()
    		return JsonResponse(serializer.data, status=201)
    	return JsonResponse(serializer.errors, status=400)
        
@csrf_exempt
def fsaUserList(request):
	if request.method == 'GET':
		api = fsa_user.objects.all()
		serializer = FsaUserSerializer(api, many=True)
		return JsonResponse(serializer.data, safe=False)

	elif request.method == 'POST':
		logger.warn("parse data>>>>>>>>>>>>>>>>>>>")
		data = JSONParser().parse(request)
		logger.warn("passed >>>>>>>>>>>>>>>>>>>")
		# logger.warn("data:"+data)
		serializer = FsaUserSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse(serializer.data, status=201)
		return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def userDailyList(request):
	logger.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
	logger.warn(">>>>>>>>>>>> userDailyList<<<<<<<<<")
	if request.method == 'GET':
		api = user_daily.objects.all()
		serializer = UserDailySerializer(api, many=True)
		return JsonResponse(serializer.data, safe=False)

	# elif request.method == 'POST':
	# 	data = JSONParser().parse(request)
	# 	utc_zone = tz.gettz('UTC')
	# 	x1_start=datetime.strptime(data['x1_start'][0],'%Y-%m-%d')
	# 	x1_end = datetime.strptime(data['x1_end'][0], '%Y-%m-%d')
	# 	x1_start = x1_start.replace(tzinfo=utc_zone)
	# 	x1_end = x1_end.replace(tzinfo=utc_zone)
	# 	results = (
	# 		user_daily
	# 			.objects.filter(m_date__gt=x1_start)
	# 			.filter(m_date__lt=x1_end)
	# 			.allow_filtering()
 #        )
	# 	session = get_session()
	# 	session.set_keyspace('test')
	# 	tmp=session.execute('select count(*) from user_daily group by userid')
	# 	# for result in user_daily.objects.filter(m_date__gt=x1_start).filter(m_date__lt=x1_end).allow_filtering():
	# 	# 	print(result)
	# 	print(tmp)
	# 	serializer = UserDailySerializer(results, many=True)

	# 	return JsonResponse(json.dumps(serializer.data), status=201, safe=False)
		# if serializer.is_valid():
		# # print(json.dumps(serializer.data))
		# 	return JsonResponse(json.dumps(serializer.data), status=201,safe=False)
		# return JsonResponse(serializer.errors, status=400)

		# data['m_date']=datetime.strptime(data['m_date'],"%Y-%m-%d")
		# # logger.warn("date:"+data)
		# serializer = UserDailySerializer(data=data)
		# if serializer.is_valid():
		# 	serializer.save()
		# 	return JsonResponse(serializer.data, status=201)
		# return JsonResponse(serializer.errors, status=400)
@csrf_exempt
def userDailyReportList(request):

	if request.method == 'POST':
		logger.warn(">>>>>>> Post for userDailyReportList >>>>>")
		data = JSONParser().parse(request)

		utczone = tz.gettz('UTC')
		x1_start=int(datetime.strptime(data['x1_start'][0],'%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x1_start' in data ) else 0
		x1_end = int(datetime.strptime(data['x1_end'][0], '%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x1_end' in data) else 0
		x2_start=int(datetime.strptime(data['x2_start'][0],'%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x2_start' in data) else 0
		x2_end = int(datetime.strptime(data['x2_end'][0], '%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x2_end' in data) else 0

		m_response={}
		# first range
		if(x1_start &x1_end ):
			m_response['date1']=[]
			m_response['value1']=[]

			query_rslt = (
				user_daily_report
					.objects.filter(m_date__gte=x1_start)
					.filter(m_date__lte=x1_end)
					.allow_filtering()
			)
			for i in range(0,len(query_rslt)):
				timestamp_date=datetime.fromtimestamp(query_rslt[i]['m_date']) # it will be asigned at localtimezone, not right, need to convert to utc
				timestamp_date_utc=timestamp_date.astimezone(utczone).date()
				m_response['date1'].append(str(timestamp_date_utc))
				m_response['value1'].append(query_rslt[i]['users'])
		# second range
		if (x2_start & x2_end ):
			m_response['date2']=[]
			m_response['value2']=[]

			query_rslt = (
				user_daily_report
					.objects.filter(m_date__gte=x2_start)
					.filter(m_date__lte=x2_end)
					.allow_filtering()
			)
			for i in range(0,len(query_rslt)):
				timestamp_date=datetime.fromtimestamp(query_rslt[i]['m_date']) # it will be asigned at localtimezone, not right, need to convert to utc
				timestamp_date_utc=timestamp_date.astimezone(utczone).date()
				m_response['date2'].append(str(timestamp_date_utc))
				m_response['value2'].append(query_rslt[i]['users'])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)

@csrf_exempt
def newuserDailyReportList(request):
	if request.method == 'POST':
		logger.warn(">>>> Post for newuserDailyReportList")
		data = JSONParser().parse(request)
		# if(len(data['x1_start'])==0 or len(data['x1_end']) or len(data['x2_start']) or len(data['x2_end'])):
		# 	return JsonResponse({'status':'false','message':'null querry'}, status=400)
		utczone = tz.gettz('UTC')
		x1_start=int(datetime.strptime(data['x1_start'][0],'%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x1_start' in data ) else 0
		x1_end = int(datetime.strptime(data['x1_end'][0], '%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x1_end' in data ) else 0
		x2_start=int(datetime.strptime(data['x2_start'][0],'%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x2_start' in data ) else 0
		x2_end = int(datetime.strptime(data['x2_end'][0], '%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x2_end' in data ) else 0

		m_response={}
		# first range

		if(x1_start & x1_end):
			logger.warn(">>>> x1_start & x1_end")
			m_response['date1']=[]
			m_response['value1']=[]
			query_rslt = (
				newuser_daily_report
					.objects.filter(m_date__gte=x1_start)
					.filter(m_date__lte=x1_end)
					.allow_filtering()
			)
			for i in range(0,len(query_rslt)):
				timestamp_date=datetime.fromtimestamp(query_rslt[i]['m_date']) # it will be asigned at localtimezone, not right, need to convert to utc
				timestamp_date_utc=timestamp_date.astimezone(utczone).date()
				m_response['date1'].append(str(timestamp_date_utc))
				m_response['value1'].append(query_rslt[i]['newusers'])
		
		# second range

		if(x2_start & x2_end):
			logger.warn(">>>> x2_start & x2_end")
			m_response['date2']=[]
			m_response['value2']=[]
			query_rslt = (
				newuser_daily_report
					.objects.filter(m_date__gte=x2_start)
					.filter(m_date__lte=x2_end)
					.allow_filtering()
			)
			for i in range(0,len(query_rslt)):
				timestamp_date=datetime.fromtimestamp(query_rslt[i]['m_date']) # it will be asigned at localtimezone, not right, need to convert to utc
				timestamp_date_utc=timestamp_date.astimezone(utczone).date()
				m_response['date2'].append(str(timestamp_date_utc))
				m_response['value2'].append(query_rslt[i]['newusers'])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)


	# Request for
@csrf_exempt
def locationReportList(request):
	if request.method == 'GET':
		logger.warn(">>>>>>>>>>>>> GET request for location:")
		m_response={}
		query_rslt_all=(
			location_report
				.objects().all()
			)
		m_response['header']=['location_country_code','location_count','location_country_name']
		m_response['value']=[]
		for row in range(0,len(query_rslt_all)):
			# m_response['byCode'][query_rslt_all[row]['location_country_code'].lower()]=(query_rslt_all[row]['location_count'])
			
			# m_response['byName'][query_rslt_all[row]['location_country_name']]=(query_rslt_all[row]['location_count'])
			m_response['value'].append([ query_rslt_all[row]['location_country_code'],query_rslt_all[row]['location_count'],query_rslt_all[row]['location_country_name']])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	if request.method == 'POST':
		logger.warn(">>>>>>>>>>>>> post request for location:")
		m_response={}
		query_rslt_all=(
			location_report
				.objects().all()
			)
		m_response['byCode']={}
		m_response['byName']={}
		for row in range(0,len(query_rslt_all)):
			m_response['byCode'][query_rslt_all[row]['location_country_code'].lower()]=(query_rslt_all[row]['location_count'])
			
			m_response['byName'][query_rslt_all[row]['location_country_name']]=(query_rslt_all[row]['location_count'])

		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)

@csrf_exempt
def deviceReportList(request):
	if request.method == 'GET':
		logger.warn(">>>>>>>>>>>>> GET request for device:")
		m_response={}
		query_rslt_all=(
			device_report
				.objects().all()
			)
		for row in range(0,len(query_rslt_all)):
			m_response[query_rslt_all[row]['config_device']]=(query_rslt_all[row]['device_count'])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)


@csrf_exempt
def browsersReportList(request):
	if request.method == 'GET':
		logger.warn(">>>>>>>>>>>>> GET request for browsers:")
		m_response={}
		query_rslt_all=(
			browser_report
				.objects().all()
			)

		for row in range(0,len(query_rslt_all)):
			logger.warn(str(row))
			m_response[query_rslt_all[row]['config_browser']]=(query_rslt_all[row]['browser_count'])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)

@csrf_exempt
def pageviewsReportList(request):
	if request.method == 'POST':
		logger.warn(">>>>>>>>>>>>> GET request for pageviewsReportList:")
		data = JSONParser().parse(request)
		
		logger.warn(">>>>>>>>>>>>> GET request for pageviewsReportList parsed")
		utczone = tz.gettz('UTC')
		x1_start=int(datetime.strptime(data['x1_start'][0],'%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x1_start' in data ) else 0
		x1_end = int(datetime.strptime(data['x1_end'][0], '%Y-%m-%d').replace(tzinfo=utczone).timestamp()) if ('x1_end' in data ) else 0
		m_response={}
		# first range
		logger.warn(">>>>>>>>>>>>> data['x1_start']:"+str(x1_start))
		if(x1_start & x1_end):
			logger.warn(">>>> x1_start & x1_end")
			m_response['date1']=[]
			m_response['value1']=[]
			query_rslt = (
				page_view_report
					.objects.filter(m_date__gte=x1_start)
					.filter(m_date__lte=x1_end)
					.allow_filtering()
			)
			for i in range(0,len(query_rslt)):
				timestamp_date=datetime.fromtimestamp(query_rslt[i]['m_date']) # it will be asigned at localtimezone, not right, need to convert to utc
				timestamp_date_utc=timestamp_date.astimezone(utczone).date()
				m_response['date1'].append(str(timestamp_date_utc))
				m_response['value1'].append([query_rslt[i]['location_path'],query_rslt[i]['count']])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)
@csrf_exempt
def browsersLanReportList(request):
	if request.method == 'GET':
		logger.warn(">>>>>>>>>>>>> GET request for browsersLanReportList:")
		m_response={}
		query_rslt_all=(
			browser_language_report
				.objects().all()
			)
		for row in range(0,len(query_rslt_all)):
			logger.warn(str(row))
			m_response[query_rslt_all[row]['browser_language']]=(query_rslt_all[row]['count'])
		return JsonResponse(json.dumps(m_response), status=201, safe=False)
	return JsonResponse('not support', status=400)

