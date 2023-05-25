from django.contrib import admin

from .models import Regulation, Zone, Rule

# Register your models here.


class RegulationAdmin(admin.ModelAdmin):
    list_display = ["rg_name", "rg_scope"]


class ZoneAdmin(admin.ModelAdmin):
    list_display = ["zn_name", "zn_regulation"]

class RuleAdmin(admin.ModelAdmin):
    list_display = ["rl_name", "rl_text", "rl_external_reference", "rl_code"]

admin.site.register(Regulation, RegulationAdmin)
admin.site.register(Zone, ZoneAdmin)
admin.site.register(Rule, RuleAdmin)
