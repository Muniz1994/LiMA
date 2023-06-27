from rest_framework import serializers
from .models import Regulation, Zone, Rule


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ["name", "text", "external_reference", "code"]


class ZoneSerializer(serializers.ModelSerializer):

    rules = RuleSerializer(many=True, read_only=True, source='rule_set')

    class Meta:
        model = Zone
        fields = ["name", "regulation", "rules"]


class RegulationSerializer(serializers.ModelSerializer):

    rg_zones = ZoneSerializer(many=True, read_only=True, source='zone_set')

    class Meta:
        model = Regulation
        fields = [ "name",
            "scope",
            "rg_zones"]
