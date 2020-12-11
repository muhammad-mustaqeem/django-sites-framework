from django.urls import include, path
from rest_framework.routers import DefaultRouter

from user.views import UserAuthenticationViewSet, UserModelViewSet

router = DefaultRouter()
router.register(prefix='auth', viewset=UserAuthenticationViewSet, basename='auth')
router.register(prefix='api', viewset=UserModelViewSet, basename='api')

urlpatterns = [
    path('', include(router.urls)),
]
