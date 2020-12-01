from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny

from utils import get_response
from .models import CustomUser
from .serializers import UserAuthSerializer, UserModelSerializer


def create_authentication_token(user):
    token = Token.objects.get_or_create(user=user)
    return token[0].key


def destroy_authentication_token(request):
    request.user.auth_token.delete()


class UserAuthenticationViewSet(viewsets.ViewSet):
    serializer_class = UserAuthSerializer
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)

    @staticmethod
    def is_user_authenticated(request):
        if request.user.is_authenticated and request.user != 'AnonymousUser':
            return True
        return False

    @action(methods=['POST', ], detail=False)
    def login(self, request, *args, **kwargs):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
            return get_response(status.HTTP_200_OK, 'SUCCESS',
                                data={'auth_token': create_authentication_token(user),
                                      'user': UserModelSerializer(user).data})
        return get_response(status.HTTP_404_NOT_FOUND, 'OBJECT NOT FOUND', [])

    @action(methods=['POST', ], detail=False)
    def logout(self, request, *args, **kwargs):
        if self.is_user_authenticated(request):
            destroy_authentication_token(request)
            logout(request)
            return get_response(status.HTTP_200_OK, 'SUCCESS', data=[])
        return get_response(status.HTTP_404_NOT_FOUND, 'UNAUTHENTICATED', data=[])


class UserModelViewSet(viewsets.ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = CustomUser.objects.all()
    lookup_field = 'id'

    @staticmethod
    def create_user(data):
        user = CustomUser(username=data['username'],
                          email=data['email'],
                          first_name=data['first_name'],
                          last_name=data['last_name'])
        user.set_password(data['password'])
        user.save()
        return user

    @staticmethod
    def deactivate_user(user):
        user = CustomUser.objects.get(username=user)
        user.is_active = False
        user.save()

    def create(self, request, *args, **kwargs):
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = self.create_user(serializer.validated_data)
            return get_response(status.HTTP_201_CREATED, 'SUCCESS',
                                data={'auth_token': create_authentication_token(user),
                                      'user': serializer.data})

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            self.deactivate_user(request.user)
            return get_response(status.HTTP_200_OK, 'SUCCESS', {'USER': request.user})
        return get_response(status.HTTP_401_UNAUTHORIZED, 'UNAUTHORIZED USER', [])
