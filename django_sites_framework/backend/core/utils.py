from rest_framework.response import Response
from custom_sites.models import CustomSite


def get_response(status_code, message, data):
    return Response(data={'status_code': status_code, 'message': message, 'data': data}, status=status_code)


def get_current_custom_site(request):
    return CustomSite.objects.get_current(request)
