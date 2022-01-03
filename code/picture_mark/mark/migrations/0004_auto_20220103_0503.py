# Generated by Django 3.2.9 on 2022-01-02 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mark', '0003_auto_20220102_2206'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mission',
            name='Annotation',
        ),
        migrations.AddField(
            model_name='mission',
            name='SelectedImages',
            field=models.ManyToManyField(related_name='SelectedImages', to='mark.Image'),
        ),
        migrations.AlterField(
            model_name='mission',
            name='Images',
            field=models.ManyToManyField(related_name='Images', to='mark.Image'),
        ),
    ]