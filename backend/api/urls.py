from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ProjectViewSet, TeamMemberViewSet, ContactViewSet, homepage_data, service_detail

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'contact', ContactViewSet)

urlpatterns = [
    path('homepage/', homepage_data, name='homepage-data'),
    path('services/<slug:slug>/', service_detail, name='service-detail'),
    path('', include(router.urls)),
]
