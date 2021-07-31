from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='название проекта', max_length=64, unique=True)
    link_rep = models.URLField(verbose_name='ссылка на репозиторий', max_length=128, blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return "{}".format(self.name)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(verbose_name='текст заметки')
    date_creat_and_upd = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return "{} - {}".format(self.project, self.text)
