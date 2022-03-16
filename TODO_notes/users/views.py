from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin, CreateModelMixin
# from rest_framework.mixins import DestroyModelMixin
from .models import User
from .serializers import UserSerializer, UserSerializerV2


# class UserViewSet(ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


class UserView(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet, CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # деактивация юзера, вместо удаления
    # def destroy(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     user.is_active = False
    #     user.save()
    #     return Response(data='the user is deactivated')

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserSerializerV2
        return UserSerializer
