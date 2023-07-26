from django.db import models
import datetime

# Create your models here.
class Regulation(models.Model):

    name = models.CharField(max_length=100)
    scope = models.CharField(max_length=200, default="No attributed city")
    

    def __str__(self) -> str:
        return self.name

class Rule(models.Model):

    name = models.CharField(max_length=100)
    text = models.TextField(max_length=1000)
    external_reference = models.CharField(max_length=100)
    code = models.TextField(max_length=1000, blank=True)
    blocks = models.CharField(max_length=1000, blank=True)
    
    def __str__(self) -> str:
        return self.name

class Zone(models.Model):

    name = models.CharField(max_length=100)
    regulation = models.ForeignKey(Regulation, on_delete=models.CASCADE)
    rules = models.ManyToManyField(Rule)
    zones = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True )

    def __str__(self) -> str:
        return self.name
