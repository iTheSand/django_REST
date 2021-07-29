from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin
from .models import User
from .serializers import UserSerializer


# class UserViewSet(ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


class UserView(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
