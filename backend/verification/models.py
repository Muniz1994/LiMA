from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from digital_regulation.models import Regulation
from check_module.main import ComplianceCheck

# Create your models here.
class Verification(models.Model):
    
    time_executed = models.DateTimeField(auto_now_add=True)
    ifc_file = models.FileField(upload_to='ifc_files/', blank=True)
    report = models.CharField(max_length=200, default='', blank=True)
    regulations = models.ManyToManyField(Regulation, blank=True)

    def get_model_rules(self):

        rule_set = []

        for regulation in self.regulations.all():

            for rule in regulation.rules.all():
                    
                    rule_set.append(rule)

        return(rule_set)

    def run_verification(self):

        check = ComplianceCheck(self.get_model_rules(), self.ifc_file.path)

        check.check_regulation()

        self.report = check.report

        self.save()

        return(self.report)

    def save(self, *args, **kwargs):

        # self.vf_model= str(self.project.urbanisticoperation.buildingmodel.ifc_file)


        super(Verification, self).save(*args, **kwargs)
        
class RuleResult(models.Model):
    
    object_ids = models.TextField(max_length=20000)
    result = models.BooleanField()
    verification = models.ForeignKey(Verification, on_delete=models.CASCADE)
    

    
