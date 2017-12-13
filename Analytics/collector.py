from django.http import HttpResponse
# from django.contrib.gis.utils import GeoIP
from django.contrib.gis.geoip2 import GeoIP2
import base64
import logging
import json
logger = logging.getLogger(__name__)

def pixel_gif(request):

    PIXEL_GIF_DATA = base64.b64decode("")
    info=request.GET

    #
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    #
    #
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    if (ip=='127.0.0.1'):
        ip = '118.69.213.98'
    g = GeoIP2('geoip2_db')

    logger.warn("pixel_gif!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    logger.warn("url" + info['url'])
    logger.warn("title" + info['t'])
    logger.warn("!!!!!!!!!!!IP!!!!!!!!:"+ip)
    logger.warn("!!!!!!!!!!!!!!!!!!country"+json.dumps(g.country(ip)))
    logger.warn("!!!!!!!!!!!!!!!!!!city:" + json.dumps(g.city(ip)))
    logger.warn("pixel_gif!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    return HttpResponse(PIXEL_GIF_DATA, content_type='image/gif')

def generatejs(request):
    js_str="""
    (function() {
        var img = new Image,
          url = encodeURIComponent(document.location.href),
          title = encodeURIComponent(document.title),
          ref = encodeURIComponent(document.referrer);
          img.src = 'https://phuonganalytic.herokuapp.com/a.gif?url=' + url + '&t=' + title + '&ref=' + ref;
        })();
    """
    return HttpResponse(js_str)



