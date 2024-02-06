'''
This is a snippet from a larger models.py file to show the `order_by_sector` queryset.

This allows for use with Django's QuerySet API. For example:

posts = Post.objects.all().order_by_sector(Point(1, 2))

'''
from django.conf import settings
from django.db.models.query import QuerySet
from django.contrib.gis.db import models
from django.db.models.query import QuerySet
from django.contrib.gis.db.models.functions import Distance
from django.db.models.functions import Cast

class PostQuerySet(QuerySet):
    def order_by_sector(self, point):
        '''
        Creates a 'sector' value in the returned queryset
        and runs a multi-field order_by (the new 'sector' included)

        point should represent a lat,lng value as a django.contrib.gis.geos.Point instance

        '''
        if not point:
            return self.order_by('-date_created')
        return (self
            .annotate(sector=Cast(Distance('location', point) / settings.NEARBY_DISTANCE, models.PositiveIntegerField()))
            .order_by('sector', '-date_created')
        )

class PostManager(models.Manager):
    def get_queryset(self):
        return PostQuerySet(self.model)

class AbstractRecord(models.Model):
    class Meta:
        abstract = True

    date_created = models.DateTimeField(auto_now_add=True)

class Post(AbstractRecord):
  objects = PostManager()

  location = models.PointField(srid=settings.DATABASE_SRID)