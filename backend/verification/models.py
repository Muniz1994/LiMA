from django.db import models
import ifcopenshell

import os

from django.conf import settings

from django.db.models.signals import post_save
from django.dispatch import receiver

from check_module.main import ModelCheck


# Create your models here.
class Verification(models.Model):
    model = models.FileField(upload_to="ifc_files/")
    regulation = models.FileField(upload_to="digital_regulations/")
    result = models.CharField(max_length=100, blank=True, default="Not executed")
    date_executed = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.id)


@receiver(post_save, sender=Verification)
def parse_ifc(sender, instance, **kwargs):
    if not getattr(instance, "processed", False):
        ifc_file = ifcopenshell.open(str(instance.model.file))

        verification = ModelCheck(str(instance.regulation.file))

        instance.result = verification.execute()
        instance.processed = True
        instance.save()
