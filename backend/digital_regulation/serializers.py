from rest_framework import serializers
from .models import Regulation, Rule


class RuleSerializer(serializers.ModelSerializer):

    regulation = serializers.CharField(required=False)

    class Meta:
        model = Rule
        fields = '__all__'

    def create(self, validated_data):

        regulation_id = validated_data.pop('regulation')

        regulation = Regulation.objects.all().filter(id=regulation_id)[0]

        rule = Rule.objects.create(**validated_data)

        rule.regulation_set.add(regulation)

        return rule


class RegulationSerializer(serializers.ModelSerializer):

    # zones = ZoneSerializer(many=True, read_only=True, source='zone_set')
    rules = RuleSerializer(many=True, read_only=True)

    class Meta:
        model = Regulation
        fields = "__all__"
