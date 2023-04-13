# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Cof(models.Model):
    cof_id = models.AutoField(db_column='COF_ID', primary_key=True)  # Field name made lowercase.
    cof_dateroasted = models.DateField(db_column='COF_DateRoasted', blank=True, null=True)  # Field name made lowercase.
    cof_datebestby = models.DateField(db_column='COF_DateBestBy', blank=True, null=True)  # Field name made lowercase.
    cof_name = models.CharField(db_column='COF_Name', max_length=100)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'cof'


class CofComment(models.Model):
    cof_comment = models.TextField()
    cof_comment_id = models.AutoField(primary_key=True)
    comment_posted = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'cof_comment'


class CofPull(models.Model):
    espresso_shot_id = models.AutoField(primary_key=True)
    grams_in = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    grams_out = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    duration_seconds = models.IntegerField(blank=True, null=True)
    cof = models.ForeignKey(Cof, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'cof_pull'


class PullComment(models.Model):
    pull_comment_id = models.AutoField(primary_key=True)
    pull_comment = models.TextField()
    comment_posted = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'pull_comment'
        
