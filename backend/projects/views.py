from django.shortcuts import render

from rest_framework import viewsets

# Create your views here.
from .models import Project, UrbanisticOperation, Building
from .serializers import ProjectSerializer, UrbanisticOperationSerializer, BuildingSerializer

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class UrbanisticOperationViewSet(viewsets.ModelViewSet):
    queryset = UrbanisticOperation.objects.all()
    serializer_class = UrbanisticOperationSerializer


class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
