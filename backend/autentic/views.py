from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Regulations, Clause
from .serializers import RegulationSerializer, ClauseSerializer, TestSerializer

# Create your views here.


class RegulationViewSet(viewsets.ModelViewSet):
    queryset = Regulations.objects.all()
    serializer_class = RegulationSerializer


class ClauseViewSet(viewsets.ModelViewSet):
    queryset = Clause.objects.all()
    serializer_class = ClauseSerializer
