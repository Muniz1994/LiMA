from rest_framework import serializers
from .models import Project, UrbanisticOperation, Building
from digital_regulation.serializers import RegulationSerializer

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ['urbanistic_operation', 'ifc_file', 'xkt_file']

class UrbanisticOperationSerializer(serializers.ModelSerializer):

    uo_building_models = BuildingSerializer( read_only=True, source='building')

    class Meta:
        model = UrbanisticOperation
        fields = ['project', 'type', 'adress', 'uo_building_models']

class ProjectSerializer(serializers.ModelSerializer):

    pj_urbanistic_operation = UrbanisticOperationSerializer( read_only=True, source='urbanisticoperation')

    class Meta:
        model = Project
        fields = ['name','regulations','pj_urbanistic_operation']