from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase, APISimpleTestCase
from .views import UserView
from .models import User
from todo.models import Project, Todo
from mixer.backend.django import mixer


class TestUserViewSet(APITestCase):
    url = '/api/users/'

    # def setUp(self):
    #     factory = APIRequestFactory()
    #     self.request = factory.get(self.url)

    # def test_get_list(self):
    #     view = UserView.as_view({'get': 'list'})
    #     response = view(self.request)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, {
            'username': 'django55',
            'first_name': 'DJ',
            'last_name': 'ango',
            'email': 'django55@ya.ru',
            'is_active': True
        })
        view = UserView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_user(self):
        factory = APIRequestFactory()
        admin = User.objects.create_superuser('test', 'test@test.ru', 'qwerty')
        request = factory.post(self.url, {
            'username': 'django55',
            'first_name': 'DJ',
            'last_name': 'ango',
            'email': 'django55@ya.ru',
            'is_active': True
        })
        force_authenticate(request, admin)
        view = UserView.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        # admin = User.objects.create_superuser('test', 'test@test.ru', 'qwerty')
        # client = APIClient()
        # client.force_authenticate(admin)
        user = User.objects.create(username='django55', first_name='DJ', last_name='ango', email='django55@ya.ru')
        response = self.client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), user.username)

    def test_post_client(self):
        admin = User.objects.create_superuser('test', 'test@test.ru', 'qwerty')
        client = APIClient()
        # client.force_authenticate(admin)
        client.login(username='test', password='qwerty')
        response = client.post(self.url, {
            'username': 'django55',
            'first_name': 'DJ',
            'last_name': 'ango',
            'email': 'django55@ya.ru',
            'is_active': True
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        client.logout()
        response = client.post(self.url, {
            'username': 'django55',
            'first_name': 'DJ',
            'last_name': 'ango',
            'email': 'django55@ya.ru',
            'is_active': True
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_mixer(self):
        user = mixer.blend(User)
        response = self.client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), user.username)

    def test_project_mixer(self):
        project = mixer.blend(Project, link_rep='https://github.com/iTheSand/git_test')
        response = self.client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('link_rep'), 'https://github.com/iTheSand/git_test')

    def test_todo_mixer(self):
        todo = mixer.blend(Todo, user__username='Test')
        response = self.client.get(f'/api/todo/{todo.id}/')
        self.assertEqual(response.data.get('is_active'), True)
        self.assertEqual(response.data.get('text'), todo.text)
        response = self.client.get(f'/api/users/{todo.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), 'Test')


# class SimpleTest(APISimpleTestCase):
#     def test_simple(self):
#         self.assertEqual(1 + 2, 3)
