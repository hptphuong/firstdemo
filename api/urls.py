from django.conf.urls import include, url
from rest_framework import routers
from api import views


urlpatterns = [
    url(r'^fsa_site/$', views.fsaSiteList),
    url(r'^fsa_user/$', views.fsaUserList),
    url(r'^user_daily/$', views.userDailyList),
    url(r'^user_daily_report/$', views.userDailyReportList),
    url(r'^new_user_daily_report/$', views.newuserDailyReportList),
    # url(r'^user/(?P<id>[0-9a-zA-Z]+)/$', views.user_detail),
    # url(r'^collaborative-filtering/(?P<id>[0-9a-zA-Z]+)/$', views.getMovieFromCollaborativeFilteringByUserId),
    # url(r'^similarity/(?P<id>[0-9a-zA-Z]+)/$', views.getMovieFromSimilarityByMovieId),
    # url(r'^last-action/(?P<id>[0-9a-zA-Z]+)/$', views.getMovieFromLastActionByUserId),
    # url(r'^what-is-popular/$', views.getMovieFromWhatIsPupular),
    # url(r'^login/$', views.login),
    # url(r'^api-token-auth/', obtain_jwt_token),
    # url(r'^movie/(?P<id>[0-9a-zA-Z]+)/$', views.getMovie),
    # url(r'^trending/$', views.getMovieTrending)

]