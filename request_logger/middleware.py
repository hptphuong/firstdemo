# -*- coding: utf-8 -*-
# Author: Konstantinos Livieratos <livieratos.konstantinos@gmail.com>

import json,pprint
from django.conf import settings
from kafka import KafkaProducer
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse

from django.contrib.gis.geoip2 import GeoIP2
import base64
import logging
import json
logger = logging.getLogger(__name__)
producer = KafkaProducer(
    bootstrap_servers=settings.KAFKA_SERVERS,
    retries=5,
    value_serializer=lambda m: json.dumps(m).encode('ascii')
)


class RequestLoggerMiddleware(MiddlewareMixin):
    """
    Transmits all requests' data to Kafka as a simple string.
    !Attention: Demonstration purpose only!
    """
    def __init__(self, get_response=None):
        self.get_response = get_response

    def process_request(self, request):
        if (request.path=='/a.gif'):

            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            dataExtracted={}
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            dataExtracted['ip']=ip
            g = GeoIP2('geoip2_db')
            try:
                dataExtracted['country'] = str(g.country(ip))
            except:
                ip = '27.116.56.1'
                dataExtracted['ip_notfound']=1
                dataExtracted['country'] = str(g.country(ip))
            dataExtracted['country']=(g.country(ip))
            dataExtracted['city']=(g.city(ip))
            dataExtracted['_fsid']=request.GET['_fsid']
            dataExtracted['clientID']=request.GET['cid']
            dataExtracted['trackingId'] = request.GET['tid']
            dataExtracted['location'] = request.GET['dl']
            dataExtracted['language'] = request.GET['ul']
            dataExtracted['encoding'] = request.GET['de']
            dataExtracted['title'] = request.GET['dt']
            dataExtracted['screenColors'] = request.GET['sd']
            dataExtracted['screenResolution'] = request.GET['sr']
            dataExtracted['viewportSize'] = request.GET['vp']
            dataExtracted['javaEnabled'] = request.GET['je']
            if('uid' in request.GET):
                dataExtracted['userId'] = request.GET['uid']
            producer.send('log', dataExtracted)
            return HttpResponse(base64.b64decode(""), content_type='image/gif')
   # logger.warn("Data collector ===================\n")
        # # producer.send(
        # #     topic='test',
        # #     key=b'request.t',
        # #     value=info['t'].encode()
        # # )
        # # producer.send(
        # #     topic='test',
        # #     key=b'request.country',
        # #     value=str(g.country(ip)).encode()
        # # )
        # #
        # # producer.send(
        # #     topic='test',
        # #     key=b'request.city',
        # #     value=str(g.city(ip)).encode()
        # # )
        # # producer = KafkaProducer(value_serializer=lambda v: json.dumps(v).encode('utf-8'))
        # # producer.send('test', {'foo': 'bar'})
        # # PIXEL_GIF_DATA = base64.b64decode("")
            #
            # producer.send(
            #     topic='test',
            #     key=b'request.tid',
            #     value=b'phuong'
            # )