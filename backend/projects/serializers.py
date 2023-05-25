from rest_framework import serializers
from .models import Project, UrbanisticOperation, BuildingModel

class BuildingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingModel
        fields = ['bm_urbanistic_operation', 'bm_ifc_file', 'bm_xkt_file']

class UrbanisticOperationSerializer(serializers.ModelSerializer):

    uo_building_models = BuildingModelSerializer(many=True, read_only=True, source='buildingmodel_set')

    class Meta:
        model = UrbanisticOperation
        fields = ['uo_project', 'uo_type', 'uo_adress', 'uo_building_models']

class ProjectSerializer(serializers.ModelSerializer):

    pj_urbanistic_operations = UrbanisticOperationSerializer(many=False, read_only=True, source='urbanisticoperation_set')

    class Meta:
        model = Project
        fields = ['pj_date_created', 'pj_name', 'pj_user', 'pj_urbanistic_operations']