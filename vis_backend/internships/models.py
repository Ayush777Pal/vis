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
        ('mcq', 'MCQ'),
        ('code', 'Coding'),
        ('upload', 'File Upload')
    ]

    internship= models.ForeignKey(Internship, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    task_type= models.CharField(max_length=20, choices=TASK_TYPE_CHOICES)
    expected_output= models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.internship.title} - {self.title}"

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    submission_file=models.FileField(upload_to='submissions/', null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    feedback= models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.task.title}"
