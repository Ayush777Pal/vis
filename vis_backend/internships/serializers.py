from rest_framework import serializers

from .models import Internship, Task, Submission

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model=Internship
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Submission
        fields = '__all__'