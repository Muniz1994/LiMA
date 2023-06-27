from django.contrib import admin

from .models import Project, UrbanisticOperation, Building

# Register your models here.

class ProjectAdmin(admin.ModelAdmin):
    list_display = ['date_created','name', 'user']

class UrbanistcOperationAdmin(admin.ModelAdmin):
    list_display = ['project','type','adress']

class BuildingAdmin(admin.ModelAdmin):
    list_display = ['urbanistic_operation','ifc_file','xkt_file']

admin.site.register(Project, ProjectAdmin)
admin.site.register(UrbanisticOperation, UrbanistcOperationAdmin)
admin.site.register(Building, BuildingAdmin)