from django.contrib import admin
from .models import Internship, Task, Submission

@admin.register(Internship)
class InternshipAdmin(admin.ModelAdmin):
    list_display = ('title', 'domain')
    search_fields = ('title', 'domain')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'internship', 'task_type')
    list_filter = ('task_type', 'internship')
    search_fields = ('title',)

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'marks_awarded', 'evaluated')
    list_filter = ('evaluated',)
    search_fields = ('user__username', 'task__title')
