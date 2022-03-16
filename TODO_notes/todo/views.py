from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer
from .filters import ProjectFilter


class ProjectPagination(LimitOffsetPagination):
    default_limit = 20


class TodoPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter
    queryset = Project.objects.all()


class TodoViewSet(ModelViewSet):
    serializer_class = TodoSerializer
    pagination_class = TodoPagination
    queryset = Todo.objects.all()
    filterset_fields = ['project']

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(data='delete success')
