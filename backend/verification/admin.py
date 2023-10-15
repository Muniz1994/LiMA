from django.contrib import admin

from .models import Verification


# Register your models here.
class VerificationAdmin(admin.ModelAdmin):
    list_display = ['time_executed','ifc_file']


admin.site.register(Verification, VerificationAdmin)
