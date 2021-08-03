from rest_framework.serializers import ModelSerializer, StringRelatedField

from users.serializers import UserSerializer
from .models import Project, Todo


class ProjectSerializer(ModelSerializer):
    # users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    # project = StringRelatedField()
    # user = StringRelatedField()

    class Meta:
        model = Todo
        fields = '__all__'
