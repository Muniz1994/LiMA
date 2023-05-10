from rest_framework import serializers
from .models import CustomUser, Regulations, Clause


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("email", "last_login", "date_joined", "is_staff")


class ClauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clause
        fields = ("id", "name", "regulation", "text", "python_code", "code", "has_code")


class RegulationSerializer(serializers.ModelSerializer):
    clauses = ClauseSerializer(many=True, read_only=True)

    class Meta:
        model = Regulations
        fields = (
            "id",
            "name",
            "city",
            "came_into_effect",
            "clauses",
            "date_created",
            "date_modified",
        )


class TestSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    string = serializers.CharField(required=False, allow_blank=True, max_length=100)
