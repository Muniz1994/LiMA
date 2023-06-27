from django.db import models
import ifcopenshell

import os

from django.conf import settings

from django.db.models.signals import post_save
from django.dispatch import receiver

from check_module.main import ModelCheck

from projects.models import Project
from digital_regulation.models import Regulation

# Create your models here.
class Verification(models.Model):
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    report = models.CharField(max_length=200, default='')

    def get_model_rules(self):

        model_rules = []

        for regulation in self.project.regulations.all():

            for zone in regulation.zone_set.all():

                for rule in zone.rules.all():
                    
                    model_rules.append(rule.name)
                
        self.vf_model_rules = str(model_rules)

        self.save()

        return(model_rules)

    def run_verification(self):

        report = {
            "model": str(self.project.urbanisticoperation.buildingmodel.ifc_file),
            "rules": self.get_model_rules()
        }

        self.report = report

        self.save()

        return(report)

    def save(self, *args, **kwargs):

        # self.vf_model= str(self.project.urbanisticoperation.buildingmodel.ifc_file)


        super(Verification, self).save(*args, **kwargs)


# @receiver(post_save, sender=Verification)
# def parse_ifc(sender, instance, **kwargs):
#     if not getattr(instance, "processed", False):
#         ifc_file = ifcopenshell.open(str(instance.model.file))

#         verification = ModelCheck(str(instance.regulation.file))

#         instance.result = verification.execute()
#         instance.processed = True
#         instance.save()
