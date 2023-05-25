from django.shortcuts import render

from rest_framework import viewsets

# Create your views here.
from .models import Regulation, Zone, Rule
from .serializers import RegulationSerializer, ZoneSerializer, RuleSerializer

# Create your views here.


class RegulationViewSet(viewsets.ModelViewSet):
    queryset = Regulation.objects.all()
    serializer_class = RegulationSerializer


class ZoneViewSet(viewsets.ModelViewSet):
    queryset = Zone.objects.all()
    serializer_class = ZoneSerializer

class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
