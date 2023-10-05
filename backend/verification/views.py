from django.shortcuts import render

import time

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import Http404

# Create your views here.
from .models import Verification
from .serializers import VerificationSerializer

# Create your views here.


class VerificationViewSet(viewsets.ModelViewSet):
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer

class VerificationExecuteView(APIView):

    def get_object(self, pk):
        try:
            return Verification.objects.get(pk=pk)
        except Verification.DoesNotExist:
            raise Http404
        
    def get(self,request, pk, format=None):
        verification = self.get_object(pk)

        report = verification.run_verification()

        return Response(report)


