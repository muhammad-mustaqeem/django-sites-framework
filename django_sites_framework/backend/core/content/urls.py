from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageViewset, VideoViewset

router = DefaultRouter()
router.register(prefix='image_api', viewset=ImageViewset, basename='image_api')
router.register(prefix='video_api', viewset=VideoViewset, basename='video_api')

urlpatterns = [
    path('api/', include(router.urls)),
]
