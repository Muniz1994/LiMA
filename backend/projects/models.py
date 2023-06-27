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


    
class UrbanisticOperation(models.Model):

    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    type = models.CharField(max_length=200)
    adress = models.CharField(max_length=200)



class Building(models.Model):

    urbanistic_operation = models.OneToOneField(UrbanisticOperation, on_delete=models.CASCADE)
    is_isolated = models.BooleanField(default=True)
    use = models.CharField(max_length=200, default='')
    ifc_file = models.FileField(upload_to='ifc_files/')
    xkt_file = models.CharField(max_length=100)
    model_processed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.xkt_file = str(self.ifc_file)

        super(Building, self).save(*args, **kwargs)



