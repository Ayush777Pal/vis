from grpc import Status
from rest_framework import viewsets
from .models import Internship, Task, Submission
from .serializers import InternshipSerializer, TaskSerializer, SubmissionSerializer
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response

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

    def create(self, request, *args, **kwargs):
        data= request.data
        user_id=data.get('user')
        task_id=data.get('task')
        answer = data.get('answer', '').strip()
        uploaded_file = request.FILES.get('file')

        if not user_id or not task_id:
            return Response({'error':'Missing user or task'}, status=400)
        
        task = Task.objects.get(id=task_id)
        marks= None
        evaluated=False
        feedback=""

        if task.task_type == 'oneword':
            correct = (task.correct_answer or '').strip().lower()
            submitted=answer.lower()
            marks=1.0 if submitted == correct else 0.0
            evaluated= True
            feedback="Correct" if marks==1.0 else "Incorrect"
        elif task.task_type == 'code':
            marks=0.0
            evaluated=False
            feedback="File uploaded. Awaiting for manual evaluation"
        
        serializer = self.get_serializer(Submission)
        return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error':"User already taken"}, status=Status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message':'User registered successfully'}, status=Status.HTTP_201_CREATED)
    