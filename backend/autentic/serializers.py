from rest_framework.serializers import (
    ModelSerializer,
    HyperlinkedModelSerializer,
    PrimaryKeyRelatedField,
    RelatedField,
    SlugRelatedField,
)
from .models import CustomUser, Regulations, Clause


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("email", "last_login", "date_joined", "is_staff")


class ClauseSerializer(ModelSerializer):
    class Meta:
        model = Clause
        fields = ("id", "name", "regulation", "text", "code", "has_code")


class RegulationSerializer(ModelSerializer):
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
