from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse

import logging
logger = logging.getLogger(__name__)
def index(request):
    context = {}
    template = loader.get_template('app/index.html')
    # template = loader.get_template('app/base_site.html')
    return HttpResponse(template.render(context, request))
def login(request):
    context={}
    template=loader.get_template('app/login.html')
    return HttpResponse(template.render(context, request))

def gentella_html(request):
    context = {}
    # The template to be loaded as per gentelella.
    # All resource paths for gentelella end in .html.

    # Pick out the html file name from the url. And load that template.
    logger.warn(">>>>>>>>>>>>>>>gentellat_html>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    load_template = request.path.split('/')[-1]
    report_route = ['audiance_overview.html']

    if(any(load_template in s for s in report_route)):
        logger.warn(">>>>>>>>>>>>>>>load_template>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:"+load_template)
        template = loader.get_template('app/report/' + load_template)        
    else:
        template = loader.get_template('app/' + load_template)
    return HttpResponse(template.render(context, request))

