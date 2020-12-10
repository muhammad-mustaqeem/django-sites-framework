from django.contrib.sites.managers import CurrentSiteManager
from django.db import models

from user.models import CustomUser
from custom_sites.models import CustomSite


class OperationalLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    request_type = models.CharField(max_length=20)
    request_url = models.CharField(max_length=50)
    was_success = models.BooleanField(default=True)
    executed_on = models.DateTimeField(auto_now_add=True)

    site = models.ForeignKey(CustomSite, on_delete=models.CASCADE)

    on_site = CurrentSiteManager()

    class Meta:
        db_table = 'operational log'

    def __str__(self):
        return f"TYPE = {self.request_type} - URL = {self.request_url} "
