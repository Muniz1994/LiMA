from django.db import models

# Create your models here.
from django.db import models
import datetime
from autentic.models import CustomUser
from digital_regulation.models import Regulation

from django.db.models.signals import post_save
from django.dispatch import receiver

class Project(models.Model):

    date_created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    regulations = models.ManyToManyField(Regulation)

    def __str__(self):
        return self.name


    
class UrbanisticOperation(models.Model):

    URBANISTIC_OPERATION_TYPES = (
        ("CONSTRUCAO","construção"), 
        ("ALTERACAO","alteração"), 
        ("AMPLIACAO","ampliação")
        )

    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    type = models.CharField(max_length=200, choices=URBANISTIC_OPERATION_TYPES)
    adress = models.CharField(max_length=200)

    def __str__(self):
        return self.adress




class Building(models.Model):

    urbanistic_operation = models.OneToOneField(UrbanisticOperation, on_delete=models.CASCADE)
    ifc_file = models.FileField(upload_to='ifc_files/')
    xkt_file = models.CharField(max_length=100)
    model_processed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.xkt_file = str(self.ifc_file)

        super(Building, self).save(*args, **kwargs)

    def __str__(self):
        return self.ifc_file



