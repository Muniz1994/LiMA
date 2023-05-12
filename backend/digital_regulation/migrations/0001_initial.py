# Generated by Django 4.1.7 on 2023-05-10 16:30

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Regulations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('city', models.CharField(default='No attributed city', max_length=200)),
                ('came_into_effect', models.DateTimeField(default=datetime.datetime(1990, 1, 1, 0, 0))),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Clause',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('text', models.CharField(default='No text', max_length=10000)),
                ('code', models.CharField(blank=True, max_length=10000)),
                ('python_code', models.CharField(blank=True, max_length=10000)),
                ('has_code', models.BooleanField(default=False)),
                ('regulation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clauses', to='digital_regulation.regulations')),
            ],
        ),
    ]