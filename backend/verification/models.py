from django.db import models

from projects.models import Project
from digital_regulation.models import Regulation
from check_module.main import ComplianceCheck

# Create your models here.
class Verification(models.Model):
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    report = models.CharField(max_length=200, default='', blank=True)

    def get_model_rules(self):

        rule_set = []

        for regulation in self.project.regulations.all():

            for zone in regulation.zone_set.all():

                for rule in zone.rules.all():
                    
                    rule_set.append(rule)

        return(rule_set)

    def run_verification(self):

        check = ComplianceCheck(self.get_model_rules(), self.project.urbanisticoperation.building.ifc_file.path)

        check.check_regulation()

        self.report = check.report

        self.save()

        return(self.report)

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
