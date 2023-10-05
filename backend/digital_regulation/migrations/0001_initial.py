# Generated by Django 4.1.7 on 2023-10-05 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('text', models.TextField(max_length=1000)),
                ('external_reference', models.CharField(max_length=100)),
                ('code', models.TextField(blank=True, max_length=1000)),
                ('blocks', models.CharField(blank=True, max_length=10000)),
                ('has_code', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Regulation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('scope', models.CharField(default='No attributed city', max_length=200)),
                ('rules', models.ManyToManyField(blank=True, to='digital_regulation.rule')),
            ],
        ),
    ]
