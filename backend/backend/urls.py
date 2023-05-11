"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from rest_framework import routers
from digital_regulation import views as regulation_views
from model_check import views as model_check_views


from django.conf import settings
from django.conf.urls.static import static


regulation_router = routers.DefaultRouter()
regulation_router.register(r"regulations", regulation_views.RegulationViewSet)
regulation_router.register(r"clause", regulation_views.ClauseViewSet)

model_check_router = routers.DefaultRouter()
model_check_router.register(r"model_check", model_check_views.VerificationViewSet)
# model_check_router.register(
#     r"upload", model_check_views.UploadViewSet, basename="upload"
# )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/licence/", include(regulation_router.urls)),
    path("api/v1/users/", include("autentic.urls")),
    path("api/", include(model_check_router.urls)),
    # re_path(r"^ola/$", model_check_views.MyView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
