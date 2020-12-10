from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.sites.managers import CurrentSiteManager
from django.db import models

from .managers import CustomUserManager, CustomUserSiteManager
from custom_sites.models import CustomSite


class CustomUser(PermissionsMixin, AbstractBaseUser):
    username = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    site = models.ManyToManyField(CustomSite, related_name='get_site')

    on_site = CustomUserSiteManager()
    objects = CustomUserManager()

    REQUIRED_FIELDS = ['email']
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'

    class Meta:
        db_table = 'user'

    def __str__(self):
        return f"USERNAME = {self.username} - EMAIL = {self.email}"
