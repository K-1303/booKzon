from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('api/user/rec', views.get_recommendations),
    path('api/<str:query>/', views.search_book),
]

urlpatterns = format_suffix_patterns(urlpatterns)
