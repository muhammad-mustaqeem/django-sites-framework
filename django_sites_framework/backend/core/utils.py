from rest_framework.response import Response
from custom_sites.models import CustomSite

from log.models import OperationalLog
from user.models import CustomUser


def get_response(status_code, message, data):
    return Response(data={'status_code': status_code, 'message': message, 'data': data}, status=status_code)


def get_current_custom_site(request):
    return CustomSite.objects.get_current(request)


def video_operations_allowed(self):
    return get_current_custom_site(self.request).allow_videos


def image_operations_allowed(self):
    return get_current_custom_site(self.request).allow_images


def create_log_entry(self, request, success):
    log = OperationalLog(user=CustomUser.objects.get(id=1),
                         request_url=request.build_absolute_uri(),
                         request_type=request.method,
                         was_success=True,
                         site=get_current_custom_site(request))
    log.save()
    return log
