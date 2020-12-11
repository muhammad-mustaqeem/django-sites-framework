from rest_framework.permissions import BasePermission


class AllowReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == 'GET'
