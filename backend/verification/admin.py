from django.contrib import admin

from .models import Verification


# Register your models here.
class VerificationAdmin(admin.ModelAdmin):
    list_display = ["vf_project", "vf_report"]


admin.site.register(Verification, VerificationAdmin)
