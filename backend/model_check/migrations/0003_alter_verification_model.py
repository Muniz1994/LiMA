# Generated by Django 4.1.7 on 2023-05-11 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('model_check', '0002_alter_verification_model_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='verification',
            name='model',
            field=models.FileField(upload_to='ifc_files/'),
        ),
    ]
