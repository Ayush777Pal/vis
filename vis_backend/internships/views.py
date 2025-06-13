from rest_framework import viewsets
from .models import Internship, Task, Submission
from .serializers import InternshipSerializer, TaskSerializer, SubmissionSerializer

class InternshipViewSet(viewsets.ModelViewSet):
    queryset= Internship.objects.all()
    serializer_class= InternshipSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset= Task.objects.all()
    serializer_class= TaskSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset= Submission.objects.all()
    serializer_class= SubmissionSerializer