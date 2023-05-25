from django.db import models
import ifcopenshell

import os

from django.conf import settings

from django.db.models.signals import post_save
from django.dispatch import receiver

from check_module.main import ModelCheck

from projects.models import Project

# Create your models here.
class Verification(models.Model):
    
    vf_project = models.OneToOneField(Project, on_delete=models.CASCADE)
    vf_report = models.FileField(upload_to='reports/')


# @receiver(post_save, sender=Verification)
# def parse_ifc(sender, instance, **kwargs):
#     if not getattr(instance, "processed", False):
#         ifc_file = ifcopenshell.open(str(instance.model.file))

#         verification = ModelCheck(str(instance.regulation.file))

#         instance.result = verification.execute()
#         instance.processed = True
#         instance.save()
