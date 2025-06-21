from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import InternshipViewSet, TaskViewSet,SubmissionViewSet
from .views import *

router = DefaultRouter()
router.register(r'internship', InternshipViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'submissions', SubmissionViewSet)

urlpatterns=[
    path("",include(router.urls)),
    path('progress/', user_progress),
    path('me/', current_user),
    path('register/', register_user)
] 