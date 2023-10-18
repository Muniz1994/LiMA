from django.db import models
import datetime
import random

# Create your models here.
class Rule(models.Model):

    name = models.CharField(max_length=100)
    text = models.TextField(max_length=1000)
    external_reference = models.CharField(max_length=100)
    code = models.TextField(max_length=10000, blank=True)
    blocks = models.CharField(max_length=10000, blank=True)
    has_code = models.BooleanField(default=False)


    def save(self, *args, **kwargs):
        if (self.code != None) and (self.code != ""):
            self.has_code = True
        else:
            self.has_code = False

        super(Rule, self).save(*args, **kwargs)

    
    def __str__(self) -> str:
        return self.name
    
class Regulation(models.Model):

    name = models.CharField(max_length=100)
    scope = models.CharField(max_length=200, default="No attributed city")
    rules = models.ManyToManyField(Rule, blank=True)

    def __str__(self) -> str:
        return self.name

