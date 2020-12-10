from django.contrib import admin

from .models import CustomSite


class CustomSiteAdmin(admin.ModelAdmin):
    list_display = ('id', 'domain', 'name', 'allow_images', 'allow_videos',)


admin.site.register(CustomSite, CustomSiteAdmin)
