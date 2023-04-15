from django.db import models
from django.contrib.auth.models import User
# COFFEE MODELS

class Cof(models.Model):
    cof_id = models.UUIDField(db_column='COF_ID', primary_key=True)  # Field name made lowercase.
    cof_dateroasted = models.DateField(db_column='COF_DateRoasted', blank=True, null=True)  # Field name made lowercase.
    cof_datebestby = models.DateField(db_column='COF_DateBestBy', blank=True, null=True)  # Field name made lowercase.
    cof_name = models.CharField(db_column='COF_Name', max_length=100) # Field name made lowercase.
    cof_user = models.ForeignKey(User, models.DO_NOTHING, db_column='COF_User')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'cof'


class CofComment(models.Model):
    comment_name = models.CharField(max_length=100, blank=True)
    comment = models.TextField()
    cofcomment_id = models.UUIDField(primary_key=True)
    comment_posted = models.DateTimeField()
    cof_id = models.ForeignKey(Cof, models.DO_NOTHING)
    cofpull_id = models.ForeignKey('CofPull', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'cof_comment'


class CofPull(models.Model):
    cofpull_id = models.UUIDField(primary_key=True)
    grams_in = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    grams_out = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    duration_seconds = models.IntegerField(blank=True, null=True)
    cof_id = models.ForeignKey(Cof, models.DO_NOTHING)

    class Meta:
        managed = True
        db_table = 'cof_pull'
