from django.contrib import admin

from .models import Image, Video


class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'caption', 'file', 'is_active', 'site_id',)


class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'caption', 'file', 'is_active', 'site_id',)


admin.site.register(Image, ImageAdmin)
admin.site.register(Video, VideoAdmin)
