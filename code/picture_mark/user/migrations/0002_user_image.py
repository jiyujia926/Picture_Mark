# Generated by Django 3.2.9 on 2022-01-02 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mark', '0004_auto_20220103_0503'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ManyToManyField(to='mark.Image'),
        ),
    ]