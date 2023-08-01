from rest_framework import serializers
from .models import Regulation, Zone, Rule


class RuleSerializer(serializers.ModelSerializer):

    zone = serializers.CharField(required=False)

    class Meta:
        model = Rule
        fields = '__all__'

    def create(self, validated_data):

        zone_id = validated_data.pop('zone')

        zone = Zone.objects.all().filter(id=zone_id)[0]

        rule = Rule.objects.create(**validated_data)

        rule.zone_set.add(zone)

        return rule


class ZoneSerializer(serializers.ModelSerializer):

    rules = RuleSerializer(many=True, read_only=True)

    class Meta:
        model = Zone
        fields = '__all__'

    # def create(self, validated_data):

    #     rule_data = validated_data.pop('rules')

    #     rules_created = []

    #     for rule in rule_data:
    #         rules_created.append(Rule.objects.create(**rule))
        
    #     zone = Zone.objects.create(**validated_data)

    #     for rule in rules_created:

    #         zone.rules.add(rule)
        
    #     return zone


class RegulationSerializer(serializers.ModelSerializer):

    zones = ZoneSerializer(many=True, read_only=True, source='zone_set')

    class Meta:
        model = Regulation
        fields = "__all__"
