from django.contrib import admin
from .models import CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    list_filter = ('is_active',)
    search_fields = ('username',)
    list_display = (
        'id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'last_login', 'is_active', 'is_superuser',
        'is_staff',
    )


admin.site.register(CustomUser, CustomUserAdmin)
