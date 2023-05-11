from django.shortcuts import render

from rest_framework import viewsets

# Create your views here.
from .models import Regulations, Clause
from .serializers import RegulationSerializer, ClauseSerializer

# Create your views here.


class RegulationViewSet(viewsets.ModelViewSet):
    queryset = Regulations.objects.all()
    serializer_class = RegulationSerializer


class ClauseViewSet(viewsets.ModelViewSet):
    queryset = Clause.objects.all()
    serializer_class = ClauseSerializer
