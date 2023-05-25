from rest_framework import serializers
from .models import Regulation, Zone, Rule


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ["rl_name", "rl_text", "rl_external_reference", "rl_code"]


class ZoneSerializer(serializers.ModelSerializer):

    zn_rules = RuleSerializer(many=True, read_only=True, source='rule_set')

    class Meta:
        model = Zone
        fields = ["zn_name", "zn_regulation", "zn_rules"]


class RegulationSerializer(serializers.ModelSerializer):

    rg_zones = ZoneSerializer(many=True, read_only=True, source='zone_set')

    class Meta:
        model = Regulation
        fields = [ "rg_name",
            "rg_scope",
            "rg_zones"]
