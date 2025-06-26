from rest_framework import viewsets
from .models import Internship, Task, Submission
from .serializers import InternshipSerializer, TaskSerializer, SubmissionSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q


#we had create the serilaizer class for crud operations
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
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

    def create(self, request, *args, **kwargs):  # ✅ Now it's inside
        data = request.data
        print("Received data:", data)
        print("Received files:", request.FILES)

        user_id = data.get('user')
        task_id = data.get('task')
        answer = data.get('answer', '').strip()
        uploaded_file = request.FILES.get('file')

        if not user_id or not task_id:
            return Response({'error': 'Missing user or task'}, status=400)

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({'error': 'Task not found'}, status=404)

        existing = Submission.objects.filter(user_id=user_id, task=task).first()
        if existing:
           return Response({'error': 'You have already submitted this task'}, status=400)
        marks = None
        evaluated = False
        feedback = ""

        if task.task_type == 'oneword':
            correct = (task.correct_answer or '').strip().lower()
            submitted = answer.lower()
            marks = 1.0 if submitted == correct else 0.0
            evaluated = True
            feedback = "Correct" if marks == 1.0 else "Incorrect"
        elif task.task_type == 'code' or task.task_type=='upload':
            marks = 0.0
            evaluated = False
            feedback = "File uploaded. Awaiting manual evaluation"

        submission = Submission.objects.create(
            user_id=user_id,
            task=task,
            submitted_answer=answer if answer else None,
            submission_file=uploaded_file,
            marks_awarded=marks,
            evaluated=evaluated,
            feedback=feedback
        )

        serializer = self.get_serializer(submission)
        return Response(serializer.data)


 #normal python functions for bussiness logic
@api_view(['POST'])
def register_user(request):
    print("Received:", request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error':"User already taken"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message':'User registered successfully'}, status=status.HTTP_201_CREATED)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_progress(request):
    user=request.user

    total_tasks=Task.objects.count()
    completed_task_ids = Submission.objects.filter(
        user=user,
        evaluated=True
    ).filter(
        Q(marks_awarded__gt=0) | 
        Q(task__task_type__in=['code', 'upload'])
    ).values_list('task', flat=True).distinct()

    completed_tasks = completed_task_ids.count()    
    evaluated = Submission.objects.filter(user=user, evaluated=False).exists()
    evaluated_status = "completed" if not evaluated and completed_tasks==total_tasks else "pending"

    #for certificate
    user_name = user.get_full_name() or user.username
    internship_title="Summer training Intenship"
    duration = "1st May 2025 - 31st May 2025"

    return Response({
        "total_tasks":total_tasks,
        "completed_tasks":completed_tasks,
        "evaluation_status":evaluated_status,
        "user_name":user_name,
        "internship_title":internship_title,
        "duration":duration
    })

#we are using patch instead of get or post because we need to update only
#marks and feedback and doesn't need whole object
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def evaluate_submission(request, submission_id):
    try:
        submission = Submission.objects.get(id=submission_id)
    except Submission.DoesNotExist:
        return Response({'error': 'Submission not found'}, status=status.HTTP_404_NOT_FOUND)

    marks = request.data.get('marks_awarded')
    feedback = request.data.get('feedback', '')

    if marks is None:
        return Response({'error': 'Marks are required'}, status=status.HTTP_400_BAD_REQUEST)

    submission.marks_awarded = marks
    submission.feedback = feedback
    submission.evaluated = True
    submission.save()

    # ✅ Return serialized updated data
    serializer = SubmissionSerializer(submission)
    return Response(serializer.data, status=status.HTTP_200_OK)