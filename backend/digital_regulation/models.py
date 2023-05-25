from django.db import models
import datetime

# Create your models here.
class Regulation(models.Model):

    rg_name = models.CharField(max_length=100)
    rg_scope = models.CharField(max_length=200, default="No attributed city")

    def __str__(self) -> str:
        return self.rg_name

class Rule(models.Model):

    rl_name = models.CharField(max_length=100)
    rl_text = models.CharField(max_length=1000)
    rl_external_reference = models.CharField(max_length=100)
    rl_code = models.CharField(max_length=1000)
    
    def __str__(self) -> str:
        return self.rl_name

class Zone(models.Model):

    zn_name = models.CharField(max_length=100)
    zn_regulation = models.ForeignKey(Regulation, on_delete=models.CASCADE)
    zn_rules = models.ManyToManyField(Rule)

    def __str__(self) -> str:
        return self.zn_name
