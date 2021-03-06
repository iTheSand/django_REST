"""TODO_notes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView

from users.views import UserView
from todo.views import ProjectViewSet, TodoViewSet

router = DefaultRouter()
router.register('users', UserView)
router.register('project', ProjectViewSet)
router.register('todo', TodoViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Users',
        default_version='1.0',
        description='Some description',
        contact=openapi.Contact('admin@admin.com')
    ),
    public=True,
    permission_classes=(AllowAny, )
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('', TemplateView.as_view(template_name='index.html')),
    # path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

    # re_path(r'^api/(?P<version>\d\.\d)/users/$', UserView.as_view({'get': 'list'})),
    # path('api/1.0/users/', include('users.urls', namespace='1.0')),
    # path('api/2.0/users/', include('users.urls', namespace='2.0')),
]
