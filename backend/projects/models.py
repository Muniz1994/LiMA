from django.db import models

# Create your models here.
from django.db import models
import datetime
from autentic.models import CustomUser
from digital_regulation.models import Regulation

class Project(models.Model):

    pj_date_created = models.DateTimeField(auto_now_add=True)
    pj_name = models.CharField(max_length=200)
    pj_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    pj_regulations = models.ManyToManyField(Regulation)

    def __str__(self) -> str:
        return self.pj_name
    
    
class UrbanisticOperation(models.Model):

    uo_project = models.OneToOneField(Project, on_delete=models.CASCADE)
    uo_type = models.CharField(max_length=200)
    uo_adress = models.CharField(max_length=200)



class BuildingModel(models.Model):

    bm_urbanistic_operation = models.OneToOneField(UrbanisticOperation, on_delete=models.CASCADE)
    bm_ifc_file = models.FileField(upload_to='ifc_files/')
    bm_xkt_file = models.FileField(upload_to='xkt_files/')
