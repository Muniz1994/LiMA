from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser, Regulations, Clause

# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ["email"]


class RegulationsAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "came_into_effect", "date_created", "date_modified"]


class ClauseAdmin(admin.ModelAdmin):
    list_display = ["name", "text", "code", "has_code", "regulation"]


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Regulations, RegulationsAdmin)
admin.site.register(Clause, ClauseAdmin)
