from api.models import (
    fsa_site,
    fsa_user,
    user_daily

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