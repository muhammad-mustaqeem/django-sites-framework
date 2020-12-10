from django.contrib import admin
from .models import Image, Video


def mark_active(modeladmin, request, queryset):
    queryset.update(is_active=True)


mark_active.short_description = "Mark Content Active"


class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'caption', 'file', 'is_active', 'site_id',)
    actions = [mark_active]

    def save_model(self, request, obj, form, change):
        print('CREATE EXECUTED FROM THE ADMIN')
        obj.save()


class VideoAdmin(admin.ModelAdmin):
    list_display = ('id', 'caption', 'file', 'is_active', 'site_id',)
    actions = [mark_active]


admin.site.register(Image, ImageAdmin)
admin.site.register(Video, VideoAdmin)
