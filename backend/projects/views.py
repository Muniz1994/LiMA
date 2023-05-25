from django.shortcuts import render

from rest_framework import viewsets

# Create your views here.
from .models import Project, UrbanisticOperation, BuildingModel
from .serializers import ProjectSerializer, UrbanisticOperationSerializer, BuildingModelSerializer

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class UrbanisticOperationViewSet(viewsets.ModelViewSet):
    queryset = UrbanisticOperation.objects.all()
    serializer_class = UrbanisticOperationSerializer


class BuildingModelViewSet(viewsets.ModelViewSet):
    queryset = BuildingModel.objects.all()
    serializer_class = BuildingModelSerializer
