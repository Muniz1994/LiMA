# Generated by Django 4.1.7 on 2023-02-28 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("autentic", "0005_alter_clause_regulation"),
    ]

    operations = [
        migrations.AddField(
            model_name="clause",
            name="text",
            field=models.CharField(default="No text", max_length=1000),
        ),
    ]