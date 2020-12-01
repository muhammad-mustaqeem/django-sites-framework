from rest_framework.response import Response


def get_response(status_code, message, data):
    return Response(data={'status_code': status_code,
                          'message': message,
                          'data': data}, status=status_code)
