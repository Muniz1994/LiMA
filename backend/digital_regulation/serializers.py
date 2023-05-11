from rest_framework import serializers
from .models import Regulations, Clause


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
