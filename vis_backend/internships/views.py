from rest_framework import viewsets
from .models import Internship, Task, Submission
from .serializers import InternshipSerializer, TaskSerializer, SubmissionSerializer

class InternshipViewSet(viewsets.ModelViewSet):
    serializer_class= InternshipSerializer
    queryset = Internship.objects.all()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()  # <-- ADD THIS LINE

    def get_queryset(self):
        queryset = Task.objects.all()
        internship_id = self.request.query_params.get('internship')
        if internship_id:
            queryset = queryset.filter(internship_id=internship_id)
        return queryset

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset= Submission.objects.all()
    serializer_class= SubmissionSerializer