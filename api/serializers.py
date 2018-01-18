from api.models import (
    fsa_site,
    fsa_user,
    user_daily,
    session_overview,
    movie_pageview,
    director_pageview,
    writer_pageview,
    genre_pageview
)
from rest_framework import serializers

from django_cassandra_engine.rest.serializers import DjangoCassandraModelSerializer


class FsaSiteModelSerializer(DjangoCassandraModelSerializer):

    class Meta:
        model = fsa_site
        fields = '__all__'

class FsaUserSerializer(DjangoCassandraModelSerializer):

    class Meta:
        model = fsa_user
        fields = '__all__'

class UserDailySerializer(DjangoCassandraModelSerializer):
    class Meta:
        model = user_daily
        fields = '__all__'

class SessionOverviewSerializer(DjangoCassandraModelSerializer):
    class Meta:
        model = session_overview
        fields = '__all__'
class MoviePageviewSerializer(DjangoCassandraModelSerializer):
    class Meta:
        model = movie_pageview
        fields = '__all__'

class DirectorPageviewSerializer(DjangoCassandraModelSerializer):
    class Meta:
        model = director_pageview
        fields = '__all__'
class WriterPageviewSerializer(DjangoCassandraModelSerializer):
    class Meta:
        model = writer_pageview
        fields = '__all__'

class GenrePageviewSerializer(DjangoCassandraModelSerializer):
    class Meta:
        model = genre_pageview
        fields = '__all__'