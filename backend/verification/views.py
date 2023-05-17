from django.shortcuts import render

import time

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
from .models import Verification
from .serializers import VerificationSerializer

# Create your views here.


class VerificationViewSet(viewsets.ModelViewSet):
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer


# TODO: delete if not used in 2 weeks
# # A view created to test the processing of uploaded data
# class MyView(APIView):
#     def post(self, request, format="jpg"):
#         serializer = VerificationSerializer(data=request.data)
#         my_result = self.give_time()

#         return Response(data={"my_return_data": my_result})

#     def give_time(self):
#         return str(time.localtime())


# class UploadViewSet(viewsets.ViewSet):
#     serializer_class = UploadSerializer

#     def list(self, request):
#         return Response("GET API")

#     def create(self, request):
#         file_uploaded = request.FILES.get("file_uploaded")

#         ifc_file = ""
#         for chunk in file_uploaded.chunks():
#             ifc_file += str(chunk)

#         response = "tralala {}".format(ifc_file)

#         return Response(response)
