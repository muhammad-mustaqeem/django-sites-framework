from django.contrib.sites.models import Site
from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated

from utils import get_response
from .models import Image, Video
from .permissions import AllowReadOnly
from .serializers import ImageSerializer, VideoSerializer


class ContentViewset(viewsets.ModelViewSet):

    @staticmethod
    def get_content_data(data):
        data['site'] = Site.objects.get_current().id
        data['is_active'] = True
        return data

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=self.get_content_data(request.data.copy()))
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return get_response(status.HTTP_200_OK, 'SUCCESS', data=serializer.data)
        return get_response(status.HTTP_405_METHOD_NOT_ALLOWED, 'UNAUTHORIZED USER', data=[])

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            return get_response(status.HTTP_200_OK, 'SUCCESS', data=self.get_serializer(page, many=True).data)
        return get_response(status.HTTP_200_OK, 'SUCCESS', data=self.get_serializer(queryset, many=True).data)

    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
            return get_response(status.HTTP_200_OK, 'SUCCESS', data=self.get_serializer(instance).data)
        return get_response(status.HTTP_405_METHOD_NOT_ALLOWED, 'UNAUTHORIZED USER', data=[])

    def retrieve(self, request, *args, **kwargs):
        try:
            return get_response(status.HTTP_200_OK, 'SUCCESS', data=self.get_serializer(self.get_object()).data)
        except Http404:
            return get_response(status.HTTP_404_NOT_FOUND, 'NOT FOUND', data=[])


class ImageViewset(ContentViewset):
    serializer_class = ImageSerializer
    permission_classes = [AllowReadOnly | IsAuthenticated]
    queryset = Image.on_site.filter(is_active=True).prefetch_related('site')


class VideoViewset(ContentViewset):
    serializer_class = VideoSerializer
    permission_classes = [AllowReadOnly | IsAuthenticated]
    queryset = Video.on_site.filter(is_active=True).prefetch_related('site')
