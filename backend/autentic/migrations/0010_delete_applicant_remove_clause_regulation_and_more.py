# Generated by Django 4.1.7 on 2023-05-10 16:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('autentic', '0009_remove_projects_owner'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Applicant',
        ),
        migrations.RemoveField(
            model_name='clause',
            name='regulation',
        ),
        migrations.DeleteModel(
            name='Projects',
        ),
        migrations.DeleteModel(
            name='Clause',
        ),
        migrations.DeleteModel(
            name='Regulations',
        ),
    ]