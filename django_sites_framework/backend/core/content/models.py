from django.contrib.sites.managers import CurrentSiteManager
from django.contrib.sites.models import Site
from django.db import models

from custom_sites.models import CustomSite


class Image(models.Model):
    caption = models.CharField(max_length=100)
    file = models.ImageField(upload_to='images/')
    site = models.ForeignKey(CustomSite, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    on_site = CurrentSiteManager()

    class Meta:
        db_table = 'image'

    def __str__(self):
        return f'CAPTION = {self.caption}'


class Video(models.Model):
    caption = models.CharField(max_length=100)
    file = models.FileField(upload_to='videos/')
    site = models.ForeignKey(CustomSite, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    on_site = CurrentSiteManager()

    class Meta:
        db_table = 'video'

    def __str__(self):
        return f'CAPTION = {self.caption}'
