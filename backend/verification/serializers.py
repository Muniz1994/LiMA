from rest_framework import serializers
from .models import Verification


class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = ("vf_project", "vf_report")


# class UploadSerializer(serializers.Serializer):
#     file_uploaded = serializers.FileField()

#     class Meta:
#         fields = ["file_uploaded"]
