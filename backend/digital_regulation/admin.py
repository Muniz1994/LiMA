from django.contrib import admin

from .models import Regulations, Clause

# Register your models here.


class RegulationsAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "came_into_effect", "date_created", "date_modified"]


class ClauseAdmin(admin.ModelAdmin):
    list_display = ["name", "text", "python_code", "code", "has_code", "regulation"]


admin.site.register(Regulations, RegulationsAdmin)
admin.site.register(Clause, ClauseAdmin)
