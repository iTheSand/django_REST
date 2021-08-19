import graphene
from graphene_django import DjangoObjectType

from todo.models import Project, Todo
from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    all_todos = graphene.List(TodoType)

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    projects_by_user = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_projects_by_user(self, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name=name)
        return projects


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        first_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id, first_name):
        user = User.objects.get(pk=id)
        user.first_name = first_name
        user.save()
        return UserUpdateMutation(user=user)


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, first_name, last_name, email):
        user = User(username=username, first_name=first_name, last_name=last_name, email=email)
        user.save()
        return UserCreateMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
