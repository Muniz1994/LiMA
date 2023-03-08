from django.urls import include, path
from rest_framework import routers

urlpatterns = [
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/register/", include("dj_rest_auth.registration.urls")),
]
