(function() {
    var O = window,
        M = document;
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


    var fsaCore = new $fsaCore;

    var rnd_32int = function() {
        return Math.round(2147483647 * Math.random())
    };

    function ga_hash(a) {
        // copy of google analytic hash
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
    }
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

    fsaCore.create("create", function(a, b, c, d) {
        // Insert to tracker
        if (void 0 == b || a.split(".").length > 1) return;
        var m_userId = void 0;
        if (typeof b == "string") {
            m_trackingId = b;
            if (!c || typeof c != "string") return;
            c == 'auto' ? m_cookieDomain = findRootDomain() : m_cookieDomain = c;
            void 0 != d ? m_name = d : m_name = "t0";

        } // ('create','trackingID')
        else if (typeof b == "object") { // ('create',jsonoBJ)
            (void 0 != b.trackingId && typeof b.trackingId) ? m_trackingId = b.trackingId: void 0;
            void 0 != b.cookieDomain ? (b.cookieDomain == "auto" ? m_cookieDomain = findRootDomain() : m_cookieDomain = b.cookieDomain) : m_cookieDomain = findRootDomain();
            void 0 != b.name ? m_name = b.name : m_name = "t0";
            void 0 != b.userId ? m_userId = b.userId : void 0;
        } else return;

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
        tracker.set("name", m_name);
        tracker.set("trackingId", m_trackingId);
        tracker.set("cookieDomain", m_cookieDomain);
        tracker.set("userId", m_userId);
        tracker.set("clientID", _fsa);
        tracker.set("_fsid", _fsid);
        this.trackers.push(tracker);
    });

    // Implement send function

    fsaCore.create('send', function(a, b, c, d) {

        console.log("loading send func");
    });

    var fsa = function(a) {

        if (fsaCore.check(a)) fsaCore.callFunction.apply(fsaCore, arguments);
    };

    fsa.getAllTracker = function() {
        return fsaCore.trackers.slice(0);
    }

    var gb = qa(window.FsoftAnalyticsObject) && sa(window.FsoftAnalyticsObject) || "fsa";
    // Get queues for first instance
    if (O[gb].q) queues = O[gb].q;
    O[gb] = fsa;
    for (i = 0; i < queues.length; i++) {
        O[gb].apply(O[gb], queues[i]);
    }
})(window);