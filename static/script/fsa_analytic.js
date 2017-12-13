(function() {
    var O = window,
        M = document,
        m_loccation = M.location;;
    var qa = function(a) { // return true if string * not undefine
            return void 0 != a && -1 < (a.constructor + "").indexOf("String")
        },
        sa = function(a) { //remove whitespace at begin and end string
            return a ? a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
        };
    var ee = function() {
        this.keys = [];
        this.values = {};
        this.m = {}
    };
    ee.prototype.set = function(a, b, c) {
        this.keys.push(a);
        c ? this.m[":" + a] = b : this.values[":" + a] = b
    };
    ee.prototype.get = function(a) {
        return this.m.hasOwnProperty(":" + a) ? this.m[":" + a] : this.values[":" + a]
    };
    ee.prototype.map = function(a) {
        for (var b = 0; b < this.keys.length; b++) {
            var c = this.keys[b],
                d = this.get(c);
            d && a(c, d)
        }
    }
    var $fsaCore = function() {
        this.fName = [];
        this.fImp = [];
        this.trackers = [];
    };
    $fsaCore.prototype.check = function(f_name) {
        // check function in fsaCore
        return this.fName.includes(f_name);
    };
    $fsaCore.prototype.create = function(f_name, f_imp) {
        if (typeof f_name != "string" || typeof f_imp != "function") return void!0;
        this.fName.push(f_name);
        this.fImp[':' + f_name] = f_imp;
    };
    $fsaCore.prototype.callFunction = function(a) {
        this.fImp[":" + a.split(".").slice(-1)].apply(this, arguments);
    };
    $fsaCore.prototype.getTrackerByName = function(trackerName) {
        for (var i = 0; i < this.trackers.length; i++)
            if (this.trackers[i].values[":name"] == trackerName) return this.trackers[i];
    };
    $fsaCore.prototype.parseJsonObjectToTailUrl = function(jsonObj) {

    }
    $fsaCore.prototype.requestImage = function(m_src, tailUrl) {
        // create 1 image request with link = m_src+tailUrl
        var img = new Image,
            t = arguments[2];
        url = encodeURIComponent("https://phuonganalytic.herokuapp.com"),
            title = encodeURIComponent(M.title),
            ref = encodeURIComponent(M.referrer);
        img.src = m_src + tailUrl;
    }

    var fsaCore = new $fsaCore,
        rnd_32int = function() {
            //random integer number
            return Math.round(2147483647 * Math.random())
        };

    function ga_hash(a) {
        // re-use google analytic hash
        var b = 1,
            c;
        if (a)
            for (b = 0,
                c = a.length - 1; 0 <= c; c--) {
                var d = a.charCodeAt(c);
                b = (b << 6 & 268435455) + d + (d << 14);
                d = b & 266338304;
                b = 0 != d ? b ^ d >> 21 : b
            }
        return b
    };
    var ra = function() {
        for (var a = O.navigator.userAgent + (M.cookie ? M.cookie : "") + (M.referrer ? M.referrer : ""), b = a.length, c = O.history.length; 0 < c;)
            a += c-- ^ b++;
        return [rnd_32int() ^ ga_hash(a) & 2147483647, Math.round((new Date).getTime() / 1E3)].join(".")
    };

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(a) {
        if (typeof a == "object" && a.name && a.value)
            document.cookie = a.name + "=" + a.value + (a.domain ? ";domain=" + a.domain : "") + (a.path ? ";path=" + a.path + ";" : ";path=/;") + (a.expires ? "expires=" + a.expires : "");

    };

    function findRootDomain() {
        splitArr = M.location.hostname.split(".");
        Arrlen = splitArr.length;

        // check by tmp variable as _fsckroot
        rootDomain = splitArr.slice(-2).join(".");

        if (Arrlen <= 2)
            return rootDomain

        for (c = -2; c >= 1 - Arrlen; c--) {
            rootDomain = splitArr.slice(c).join(".");
            if (!/;\s_fsckroot=|^_fsckroot=/.test(M.cookie)) {
                setCookie({
                    name: "_fsckroot",
                    value: 123,
                    expires: (new Date((new Date).getTime() + 1)).toGMTString(),
                    domain: rootDomain,
                })

            } else {
                setCookie({
                    name: "_fsckroot",
                    value: 123,
                    expires: (new Date((new Date).getTime() - 1000)).toGMTString(),
                })
                break;
            }

        }
        return rootDomain;
    };


    // Create a create function for fsa core

    fsaCore.create("create", function(a) {
        // Insert to tracker
        // if (void 0 == b || a.split(".").length > 1) return;
        // var m_userId = void 0;
        // if (typeof b == "string") {
        //     m_trackingId = b;
        //     if (!c || typeof c != "string") return;
        //     c == 'auto' ? m_cookieDomain = findRootDomain() : m_cookieDomain = c;
        //     void 0 != d ? m_name = d : m_name = "t0";

        // } // ('create','trackingID')
        // else if (typeof b == "object") { // ('create',jsonOBJ)
        //     (void 0 != b.trackingId && typeof b.trackingId) ? m_trackingId = b.trackingId: void 0;
        //     void 0 != b.cookieDomain ? (b.cookieDomain == "auto" ? m_cookieDomain = findRootDomain() : m_cookieDomain = b.cookieDomain) : m_cookieDomain = findRootDomain();
        //     void 0 != b.name ? m_name = b.name : m_name = "t0";
        //     void 0 != b.userId ? m_userId = b.userId : void 0;
        // } else return;
        var m_name,
            m_trackingId,
            m_cookieDomain,
            m_userId,
            m_language,
            m_encoding;
        // if ( < 2) return;
        switch (arguments.length) {
            case 2:
                if (typeof arguments[1] == "object") {
                    var b = arguments[1];
                    (void 0 != b.trackingId && typeof b.trackingId) ? m_trackingId = b.trackingId: void 0;
                    void 0 != b.cookieDomain ? (b.cookieDomain == "auto" ? m_cookieDomain = findRootDomain() : m_cookieDomain = b.cookieDomain) : m_cookieDomain = findRootDomain();
                    void 0 != b.name ? m_name = b.name : m_name = "t0";
                    void 0 != b.userId ? m_userId = b.userId : void 0;
                } else if (arguments[1] == "string") {
                    m_trackingId = arguments[1];
                    m_cookieDomain = findRootDomain();
                    m_name = "t0";
                } else
                    return;
                break;
            case 3:

                if (typeof arguments[1] == "string" && typeof arguments[2] == "string") {
                    // fsa('create', 'UA-107854568-1', 'auto');
                    m_trackingId = arguments[1];
                    arguments[2] == 'auto' ? m_cookieDomain = findRootDomain() : m_cookieDomain = arguments[2];
                    m_name = "t0";

                } else return;
                break;
            case 4:
                if (typeof arguments[1] == "string" && typeof arguments[2] == "string" && typeof arguments[3] == "string") {
                    // fsa('create', 'UA-107854568-1', 'auto','mytracker');

                    typeof arguments[1] == "string" ? m_trackingId = arguments[1] : m_trackingId = void 0;
                    arguments[2] == 'auto' ? m_cookieDomain = findRootDomain() : m_cookieDomain = arguments[2];
                    arguments[3] == 'auto' ? m_name = "t0" : m_name = arguments[3];

                } else return;
                break;
            case 5:
                if (typeof arguments[1] == "string" && typeof arguments[2] == "string" && typeof arguments[3] == "string" && typeof arguments[4] == "object") {
                    // fsa('create', 'UA-107854568-1', 'auto','mytracker');

                    typeof arguments[1] == "string" ? m_trackingId = arguments[1] : m_trackingId = void 0;
                    arguments[2] == 'auto' ? m_cookieDomain = findRootDomain() : m_cookieDomain = arguments[2];
                    arguments[3] == 'auto' ? m_name = "t0" : m_name = arguments[3];
                    arguments[4].hasOwnProperty("userId") && (m_userId = arguments[4].userId);

                } else
                    return;
                break;
                // ga('create', 'UA-XXXXX-Y', 'auto', 'myTracker', {
                //     userId: '12345'
                // });

            default:
                return
        };
        // if (arguments.length == 2) {



        // } else if (arguments.length == 3) { //[]

        // } else if (arguments.length == 4) {

        // } else
        //     return;
        // }

        // check exist of tracker
        m_trackers = this.trackers;
        for (var i = 0; i < m_trackers.length; i++)
            if (m_trackers[i].get("name") == m_name) {
                console.log("name exist");
                return;
            }
            // Insert to cookie 2 variable _fsa for 2y and _fsid for 1 day
            // generate third & fourth components of _fsid & _fsa
        if (!/_fsa=/.test(document.cookie)) {
            _fsa = ra();
            setCookie({
                    name: "_fsa",
                    value: "FSA1." + m_cookieDomain.split(".").length + "." + _fsa,
                    expires: (new Date((new Date).getTime() + 63072000000)).toGMTString(),
                    domain: m_cookieDomain
                })
                // document.cookie="_fsa=FSA1."+m_domain_arr.length+"."+tmp_ra+"; expires="+(new Date((new Date).getTime() + 63072000000)).toGMTString()+";path=/;"+"domain="+m_domain_arr.join(".");    

        } else _fsa = getCookie('_fsa').split(".").slice(2).join(".");
        if (!/_fsid=/.test(document.cookie)) {
            _fsid = ra();

            setCookie({
                name: "_fsid",
                value: "FSA1." + m_cookieDomain.split(".").length + "." + _fsid,
                expires: (new Date((new Date).getTime() + 86400000)).toGMTString(),
                domain: m_cookieDomain
            })

        } else _fsid = getCookie('_fsid').split(".").slice(2).join(".");;
        tracker = new ee;

        // AĐ FIXED info for tracker
        (void 0 != m_name) && tracker.set("name", m_name);
        (void 0 != m_trackingId) && tracker.set("trackingId", m_trackingId);
        (void 0 != m_cookieDomain) && tracker.set("cookieDomain", m_cookieDomain);
        (void 0 != m_userId) && tracker.set("userId", m_userId);
        (void 0 != _fsa) && tracker.set("clientID", _fsa);
        (void 0 != _fsid) && tracker.set("_fsid", _fsid);
        // add location
        if (m_loccation) {
            var m_path = m_loccation.pathname || "";
            "/" != m_path.charAt(0) && (m_path = "/" + m_path);
            tracker.set("location", m_loccation.protocol + "//" + m_loccation.hostname + m_path + m_loccation.search);
        }
        // add language - ul
        (b = O.navigator) && (m_language = (b && (b.language || b.browserLanguage) || "").toLowerCase());
        (void 0 != m_language) && tracker.set('language', m_language);
        tracker.set("encoding", M.characterSet || M.charset);
        var screen = O.screen

        // add encoding - de

        de = M.characterSet || M.charset;
        tracker.set("encoding", de);

        // add title - dt
        tracker.set("title", M.title || void 0);

        //add screenColors - sd
        tracker.set("screenColors", screen.colorDepth + "-bit");

        // add screenResolution - sr
        tracker.set("screenResolution", screen.width + "x" + screen.height);

        // add viewportSize - vp
        var g = (e = M.body) && e.clientWidth && e.clientHeight,
            ca = [],
            c = M.documentElement;;

        c && c.clientWidth && c.clientHeight && ("CSS1Compat" === M.compatMode || !g) ? ca = [c.clientWidth, c.clientHeight] : g && (ca = [e.clientWidth, e.clientHeight]);
        c = 0 >= ca[0] || 0 >= ca[1] ? "" : ca.join("x");
        tracker.set("viewportSize", c);

        //add javaEnabled - je
        tracker.set("javaEnabled", O.navigator && "function" === typeof O.navigator.javaEnabled && O.navigator.javaEnabled() || !1);



        this.trackers.push(tracker);


    });

    // Implement send function
    // ('[trackerName.]send', [hitType], [...fields], [fieldsObject]);
    var fsaSendPageView = function(a) {
        var tailUrl = "t=pageview";
        tailUrl = tailUrl + "&v=1";
        tailUrl = tailUrl + "&_fsid=" + a.get("_fsid");
        tailUrl = tailUrl + "&cid=" + a.get("clientID");
        tailUrl = tailUrl + "&tid=" + a.get("trackingId");
        tailUrl = tailUrl + "&dl=" + a.get("location"); // Add location -dl
        tailUrl = tailUrl + "&ul=" + a.get("language");
        tailUrl = tailUrl + "&de=" + a.get("encoding");
        tailUrl = tailUrl + "&dt=" + a.get("title");
        tailUrl = tailUrl + "&sd=" + a.get("screenColors");
        tailUrl = tailUrl + "&sr=" + a.get("screenResolution");
        tailUrl = tailUrl + "&vp=" + a.get("viewportSize");
        tailUrl = tailUrl + "&je=" + a.get("javaEnabled") * 1;
        (a.get("userId")) && (tailUrl = tailUrl + "&uid=" + a.get("userId")) != void 0;

        fsaCore.requestImage('http://127.0.0.1:8000/a.gif?', tailUrl);
    };
    fsaCore.create('send', function(a) {

        a.split(".").length < 2 ? trackerName = "t0" : trackerName = a.split(".").slice(0, -1).join(".");
        if (!fsaCore.getTrackerByName(trackerName))
            return
        else
            m_tracker = fsaCore.getTrackerByName(trackerName);
        args = [].slice.call(arguments, 1);
        // get hitType
        if ("object" == typeof args[0]) hitType = args[0].hitType
        else
            hitType = args[0];
        if (void 0 == hitType) return;
        args.unshift(m_tracker);
        if (hitType = "pageview") fsaSendPageView.apply(this, args);

    });

    var fsa = function(a) {

        if (fsaCore.check(a.split(".").slice(-1)[0])) fsaCore.callFunction.apply(fsaCore, arguments);
    };

    fsa.getAllTracker = function() {
        return fsaCore.trackers.slice(0);
    }
    fsa.getTrackerByName = function(trackerName) {
        return fsaCore.getTrackerByName(trackerName);

    }

    var gb = qa(window.FsoftAnalyticsObject) && sa(window.FsoftAnalyticsObject) || "fsa";
    // Get queues for first instance

    (void 0 != O[gb] && O[gb].q) ? queues = O[gb].q: queues = [];
    O[gb] = fsa;
    for (i = 0; i < queues.length; i++) {
        O[gb].apply(O[gb], queues[i]);
    }
})(window);