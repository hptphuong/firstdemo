if (window.trk) {
    trk.getSessionId = function() {

        //var sessionId;

        var sessionId = getCookie('PHPSESSID');

        if(sessionId == null){
            sessionId = getCookie('ASP.NET_SessionId');
        }

        if(sessionId == null){
            sessionId = getCookie('ASPSESSIONID');
        }

        if(sessionId == null){
            sessionId = getCookie('CGISESSID');
        }

        if(sessionId == null){
            sessionId = getCookie('sessionid');
        }

        if(sessionId == null){
            var value = "; " + document.cookie;
            var parts = value.split(";");
            for(i =0; i < parts.length; i++){
                var str = parts[i];
                if(str.indexOf("session") != -1){
                    sessionId = parts[i].split('=')[1];
                    break;
                }
            }
        }

        return sessionId;

    }
    trk.getCookie = function() {
        return document.cookie;
    }
    trk.getBrowserLanguage = function() {
        return navigator.language;
    }
    trk.getPageTitle = function() {
        return document.title;
    }
    trk.getCurrentUrl = function() {
        return window.location.href;
    }
    trk.getExtraData = function() {
        return {
            sessionId: trk.getSessionId(),
            cookies: trk.getCookie(),
            browserLanguage: trk.getBrowserLanguage(),
            pageTitle: trk.getPageTitle(),
            currentUrl: trk.getCurrentUrl()
        };
    }
    trk.callMethod = function(action, eventName, options) {
        console.log(action);
        if (action == 'init') {
            window.trk.id = eventName;
        }else if(action == 'domain'){
            window.trk.domainName = eventName;
        } else if (action == 'track') {
            var url = 'https://' + trk.domainName + '/api/updateconv?cid=' + trk.id + '&' + trk.params;
            var extraData = trk.getExtraData();
            if(!window.jQuery){
              (function() {
              // Load the script
              var script = document.createElement("SCRIPT");
            script.src = 'https://' + trk.domainName + '/files/ajaxJquery.js';
            script.type = 'text/javascript';
            script.onload = function() {
                var $ = window.jQuery;
              $.ajax({
                  url: url,
                  data: extraData,
                  success: function( data ){
                      console.log(data);
              }});
            };
            document.getElementsByTagName("head")[0].appendChild(script);
              })();
            }else{
              $.ajax({
                  url: url,
                  data: extraData,
                  success: function( data ){
                      console.log(data);
              }});
            }
        }else{
            if(window.trk.params == null){
              window.trk.params = 'param_name[]=' + action + '&' + 'param_value[]=' + eventName + '&';
            }else{
              window.trk.params += 'param_name[]=' + action + '&' + 'param_value[]=' + eventName + '&';
            }
        }

    }

    for (var index = 0; index < trk.queue.length; index+=1) {
        var event = trk.queue[index];
        trk.callMethod.apply(trk, event);
    }
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}


console.log('loaded');
