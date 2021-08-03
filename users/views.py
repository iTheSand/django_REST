from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin
# from rest_framework.mixins import DestroyModelMixin
from .models import User
from .serializers import UserSerializer


# class UserViewSet(ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


class UserView(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # def destroy(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     user.is_active = False
    #     user.save()
    #     return Response(data='the user is deactivated')
