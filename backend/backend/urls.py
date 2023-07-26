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
from projects import views as project_views
from verification import views as verification_views



from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()

router.register(r'regulations', regulation_views.RegulationViewSet)
router.register(r'zones',regulation_views.ZoneViewSet)
router.register(r'rules', regulation_views.RuleViewSet)


router.register(r'projects', project_views.ProjectViewSet)
router.register(r'urbanistic-operations', project_views.UrbanisticOperationViewSet)
router.register(r'building-models', project_views.BuildingViewSet)



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/users/", include("autentic.urls")),
    path("api/executeverification/<int:pk>/", verification_views.VerificationExecuteView.as_view()),
    # re_path(r"^ola/$", verification_views.MyView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
