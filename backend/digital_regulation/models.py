from django.db import models
import datetime


# Create your models here.
class Regulations(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=200, default="No attributed city")
    came_into_effect = models.DateTimeField(default=datetime.datetime(1990, 1, 1))
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class Clause(models.Model):
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=10000, default="No text")
    code = models.CharField(max_length=10000, blank=True)
    python_code = models.CharField(max_length=10000, blank=True)
    has_code = models.BooleanField(default=False)
    regulation = models.ForeignKey(
        Regulations, related_name="clauses", on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        if (self.code != None) and (self.code != ""):
            self.has_code = True
        else:
            self.has_code = False

        super(Clause, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
