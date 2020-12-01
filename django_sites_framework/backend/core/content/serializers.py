from django.contrib.sites.models import Site
from rest_framework import serializers

from .models import Image, Video


class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    caption = serializers.CharField(min_length=10, max_length=100, required=True)
    file = serializers.ImageField(required=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = Image
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):
    caption = serializers.CharField(min_length=10, max_length=100, required=True)
    file = serializers.FileField(required=True)
    is_active = serializers.BooleanField(default=True, read_only=True)

    class Meta:
        model = Video
        fields = '__all__'
