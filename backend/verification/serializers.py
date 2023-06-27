from rest_framework import serializers
from .models import Verification


class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verification
        fields = ("project", "report")


# class UploadSerializer(serializers.Serializer):
#     file_uploaded = serializers.FileField()

#     class Meta:
#         fields = ["file_uploaded"]
