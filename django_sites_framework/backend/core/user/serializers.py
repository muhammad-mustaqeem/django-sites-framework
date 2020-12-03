from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import CustomUser
from custom_sites.models import CustomSite


class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomSite
        fields = '__all__'


class UserAuthSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, required=True, validators=[
        UniqueValidator(CustomUser.objects.all()),
    ])
    password = serializers.CharField(required=True, min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password',)


class UserModelSerializer(serializers.ModelSerializer):
    username = serializers.CharField(min_length=5, required=True, validators=[
        UniqueValidator(CustomUser.objects.all()),
    ])
    email = serializers.EmailField(max_length=50, required=True, validators=[
        UniqueValidator(CustomUser.objects.all()),
    ])
    password = serializers.CharField(required=True, min_length=8, write_only=True)
    first_name = serializers.CharField(required=True, max_length=20)
    last_name = serializers.CharField(required=True, max_length=20)
    site = SiteSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'site',)
