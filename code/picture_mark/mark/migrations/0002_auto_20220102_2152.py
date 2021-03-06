# Generated by Django 3.2.9 on 2022-01-02 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mark', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Annotation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Tag', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Point',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('X', models.DecimalField(decimal_places=10, max_digits=10)),
                ('Y', models.DecimalField(decimal_places=10, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Polygon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Point', models.ManyToManyField(to='mark.Point')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.TextField()),
                ('Url', models.TextField()),
                ('Width', models.DecimalField(decimal_places=10, max_digits=10)),
                ('Height', models.DecimalField(decimal_places=10, max_digits=10)),
                ('Annotation', models.ManyToManyField(to='mark.Annotation')),
            ],
        ),
        migrations.CreateModel(
            name='Box',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('LeftDown', models.ManyToManyField(related_name='LeftDown', to='mark.Point')),
                ('LeftUp', models.ManyToManyField(related_name='LeftUp', to='mark.Point')),
                ('RightDown', models.ManyToManyField(related_name='RightDown', to='mark.Point')),
                ('RightUp', models.ManyToManyField(related_name='RightUp', to='mark.Point')),
            ],
        ),
        migrations.AddField(
            model_name='annotation',
            name='Box',
            field=models.ManyToManyField(to='mark.Box'),
        ),
        migrations.AddField(
            model_name='annotation',
            name='Polygon',
            field=models.ManyToManyField(to='mark.Polygon'),
        ),
        migrations.AddField(
            model_name='mission',
            name='Annotation',
            field=models.ManyToManyField(to='mark.Annotation'),
        ),
        migrations.AddField(
            model_name='mission',
            name='Images',
            field=models.ManyToManyField(to='mark.Image'),
        ),
    ]
