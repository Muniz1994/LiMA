from django.contrib import admin

from .models import Project, UrbanisticOperation, BuildingModel

# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    list_display = ['pj_date_created','pj_name', 'pj_user']

class UrbanistcOperationAdmin(admin.ModelAdmin):
    list_display = ['uo_project','uo_type','uo_adress']

class BuildingModelAdmin(admin.ModelAdmin):
    list_display = ['bm_urbanistic_operation','bm_ifc_file','bm_xkt_file']

admin.site.register(Project, ProjectAdmin)
admin.site.register(UrbanisticOperation, UrbanistcOperationAdmin)
admin.site.register(BuildingModel, BuildingModelAdmin)