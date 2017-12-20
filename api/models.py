from __future__ import unicode_literals
from cassandra.cqlengine import columns
from django_cassandra_engine.models import DjangoCassandraModel
from cassandra.cqlengine.models import Model
from cassandra.cqlengine.management import sync_table

#User model
# CREATE TABLE test.fsa_site (
#     idsite text,
#     login text,
#     name text,
#     url text,)
class fsa_site(DjangoCassandraModel):
    idsite = columns.Text(primary_key=True)
    login = columns.Text(required=False)
    name = columns.Text(required=False)
    password = columns.Text(required=True)
    url = columns.Text(required=False)

class fsa_user(DjangoCassandraModel):
# idsite = columns.Text(primary_key=True)
# login = columns.Text(required=False)
# name = columns.Text(required=False)
# password = columns.Text(required=True)
# url = columns.Text(required=False)
    login =columns.Text(primary_key=True)
    alias =columns.Text(required=False)
    date_registered=columns.Date()
    email =columns.Text(required=False)
    password =columns.Text(required=False)

class user_daily(Model):
    m_date = columns.DateTime(primary_key=True)
    userid = columns.Text(primary_key=True)
    fsa = columns.Text(required=True,primary_key=True)
    fsid = columns.Text(required=False,primary_key=True)
    ck_new = columns.Integer()
    class Meta:
        get_pk_field='fsa'

class user_daily_report(Model):
	bucket=columns.Integer(primary_key=True)
	m_date= columns.BigInt(primary_key=True)
	users=columns.Integer()
class newuser_daily_report(Model):
    bucket=columns.Integer(primary_key=True)
    m_date= columns.BigInt(primary_key=True)
    newusers=columns.Integer()
class draft_newuser_daily_report(Model):
    bucket=columns.Integer(primary_key=True)
    m_date= columns.BigInt(primary_key=True)
    newusers=columns.Integer()
class draft_user_daily_report(Model):
	bucket=columns.Integer(primary_key=True)
	m_date= columns.BigInt(primary_key=True)
	users=columns.Integer()

class fsa_log_visit(Model):
    fsa=columns.Text(primary_key=True)
    userid=columns.Text(primary_key=True)
    fsid =columns.Text(primary_key=True)
    m_date=columns.BigInt(primary_key=True)
    idsite =columns.Text()
    location_ipv4=columns.Text()
    location_ipv6 =columns.Text()
    location_browser_lan=columns.Text()
    location_country_code=columns.Text()
    location_country_name=columns.Text()
    location_browser_en=columns.Text()
    config_os=columns.Text()
    config_browser_name=columns.Text()
    config_browser_version=columns.Text()
    config_resolution=columns.Text()
    config_color_depth=columns.Text()
    config_viewport_size=columns.Text()
    config_java =columns.Text()
    referal_xxx =columns.Text()
class location_report(Model):
    bucket=columns.Integer(primary_key=True)
    location_count=columns.Integer()
    location_country_code=columns.Text(primary_key=True)
    location_country_name= columns.Text()
    



