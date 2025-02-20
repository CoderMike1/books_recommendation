# Generated by Django 5.1.6 on 2025-02-11 20:41

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_book_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
