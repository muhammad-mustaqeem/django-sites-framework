# Generated by Django 3.1.3 on 2020-12-02 09:42

import django.contrib.sites.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sites', '0002_alter_domain_unique'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomSite',
            fields=[
                ('site_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='sites.site')),
                ('allow_images', models.BooleanField(default=True)),
                ('allow_videos', models.BooleanField(default=True)),
            ],
            options={
                'db_table': 'custom_sites',
            },
            bases=('sites.site',),
            managers=[
                ('objects', django.contrib.sites.models.SiteManager()),
            ],
        ),
    ]