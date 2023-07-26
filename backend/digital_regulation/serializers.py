from rest_framework import serializers
from .models import Regulation, Zone, Rule


class RuleSerializer(serializers.ModelSerializer):


    class Meta:
        model = Rule
        fields = '__all__'


class ZoneSerializer(serializers.ModelSerializer):

    rules = RuleSerializer(many=True)

    class Meta:
        model = Zone
        fields = '__all__'


class RegulationSerializer(serializers.ModelSerializer):

    zones = ZoneSerializer(many=True, read_only=True, source='zone_set')

    class Meta:
        model = Regulation
        fields = "__all__"
