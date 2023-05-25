from rest_framework import serializers
from .models import Project, UrbanisticOperation, BuildingModel
from digital_regulation.serializers import RegulationSerializer

class BuildingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingModel
        fields = ['bm_urbanistic_operation', 'bm_ifc_file', 'bm_xkt_file']

class UrbanisticOperationSerializer(serializers.ModelSerializer):

    uo_building_models = BuildingModelSerializer( read_only=True, source='buildingmodel')

    class Meta:
        model = UrbanisticOperation
        fields = ['uo_project', 'uo_type', 'uo_adress', 'uo_building_models']

class ProjectSerializer(serializers.ModelSerializer):

    pj_urbanistic_operation = UrbanisticOperationSerializer( read_only=True, source='urbanisticoperation')

    class Meta:
        model = Project
        fields = ['pj_name','pj_regulations','pj_urbanistic_operation']