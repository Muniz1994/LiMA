# Generated by Django 4.1.7 on 2023-03-10 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("autentic", "0007_regulations_came_into_effect_regulations_city_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="clause",
            name="python_code",
            field=models.CharField(blank=True, max_length=10000),
        ),
    ]