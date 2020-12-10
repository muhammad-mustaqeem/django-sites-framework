from django.contrib.sites.models import Site
from django.db import models


class CustomSite(Site):
    allow_images = models.BooleanField(default=True)
    allow_videos = models.BooleanField(default=True)

    class Meta:
        db_table = 'custom_sites'

    def __str__(self):
        return self.domain

    def natural_key(self):
        return (self.domain,)
