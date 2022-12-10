from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('api/', views.search_book),
    path('api/<str:query>/', views.search_book),
    path('set/', views.setcookie),
    path('get/', views.getcookie),
]

urlpatterns = format_suffix_patterns(urlpatterns)
