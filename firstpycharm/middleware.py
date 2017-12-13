import logging
from django.utils.deprecation import MiddlewareMixin
logger = logging.getLogger(__name__)
class BookMiddleware(MiddlewareMixin ):
    def __init__(self, get_response=None):
        self.get_response = get_response
    def process_request(self, request):
        logger.warn("Middleware executed")
        print("Middleware executed")
        return None
