from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Internship(models.Model):
    title= models.CharField(max_length=100)
    description=models.TextField()
    domain= models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Task(models.Model):
    TASK_TYPE_CHOICES = [
        ('oneword', 'One Word Answer'),
        ('code', 'Coding'),
        ('upload', 'File Upload')
    ]

    internship= models.ForeignKey(Internship, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    task_type= models.CharField(max_length=20, choices=TASK_TYPE_CHOICES)
    # expected_output= models.TextField(blank=True, null=True)
    correct_answer= models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"{self.internship.title} - {self.title}"

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    submitted_answer= models.TextField(blank=True, null=True)
    submission_file=models.FileField(upload_to='submissions/', null=True, blank=True)
    marks_awarded = models.FloatField(blank=True, null=True)
    # score = models.FloatField(null=True, blank=True)
    evaluated = models.BooleanField(default=False)
    feedback= models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    # answer = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.task.title}"
