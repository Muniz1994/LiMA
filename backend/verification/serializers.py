from rest_framework import serializers
from .models import Verification,RuleResult


class RuleResultSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RuleResult
        fields = '__all__'

class VerificationSerializer(serializers.ModelSerializer):
    
    results = RuleResultSerializer(read_only=True)
    
    class Meta:
        model = Verification
        fields = '__all__'
        



# class UploadSerializer(serializers.Serializer):
#     file_uploaded = serializers.FileField()

#     class Meta:
#         fields = ["file_uploaded"]
