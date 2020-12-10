from django.contrib import admin

from .models import OperationalLog


class OperationalLogAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'request_type', 'request_url', 'was_success', 'executed_on',)
    list_filter = ('request_type', 'was_success', 'executed_on',)
    list_per_page = 40


admin.site.register(OperationalLog, OperationalLogAdmin)
