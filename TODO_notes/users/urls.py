from django.urls import path
from .views import UserView

app_name = 'users'

urlpatterns = [
    path('', UserView.as_view({'get': 'list'}))
]
