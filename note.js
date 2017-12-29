<!-- Google Analytics -->

<
script >
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');

ga('create', 'UA-XXXXX-Y', 'auto', 'myTracker', {
    userId: '12345'
});

ga('create', {
    trackingId: 'UA-XXXXX-Y',
    cookieDomain: 'auto',
    name: 'myTracker',
    userId: '12345'
});


a('create', 'UA-XXXXX-Y', 'auto');
ga('create', 'UA-XXXXX-Z', 'auto', 'clientTracker'); <
/script>
<!-- End Google Analytics -->



<!-- Fsoft Analytics -->

<
script >
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'http://127.0.0.1:8000/static/script/fsa_analytic.js', 'fsa'); <
/script>
fsa('create', 'UA-XXXXX-Y', 'auto');
fsa('send', 'pageview');
fsa('create', 'UA-XXXXX-Z', 'auto', 'myTracker', {
    userId: '12345'
});

fsa('create', {
    trackingId: 'UA-XXXXX-T',
    cookieDomain: 'auto',
    name: 'myTracker-T',
    userId: '12345-T'
});

fsa('send')

<!-- End Google Analytics -->

Z.D = function(a) {
    var b = Z.J.apply(Z, arguments);
    b = Z.f.concat(b);
    for (Z.f = []; 0 < b.length && !Z.v(b[0]) && !(b.shift(),
            0 < Z.f.length);)
    ;
    Z.f = Z.f.concat(b)
}



Z.v = function(a) {
    try {
        if (a.u)
            a.u.call(O, N.j("t0"));
        else {
            var b = a.c == gb ? N : N.j(a.c);
            if (a.A) {
                if ("t0" == a.c && (b = N.create.apply(N, a.a),
                        null === b))
                    return !0
            } else if (a.ba)
                N.remove(a.c);
            else if (b)
                if (a.i) {
                    if (a.ha && (a.ha = y(a.c, a.a[0], a.X, a.W)), !u(a.a[0], b, a.W))
                        return !0
                } else if (a.K) {
                var c = a.C,
                    d = a.a,
                    e = b.plugins_.get(a.K);
                e[c].apply(e, d)
            } else
                b[a.C].apply(b, a.a)
        }
    } catch (g) {}
};




<
script >
    (function(i, s, o, g, r, a, m) {
        i['FsoftAnalyticsObject'] = r;
        i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            },
            i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.defer = true;
        a.src = g;
        m.parentNode.insertBefore(a, m)

    })(window, document, 'script', 'http://10.88.113.111:8000/static/fsa_analytic.js?1000', 'fsa');

// 'http://10.88.113.111:8000/static/fsa_analytic.js'
fsa('create', 'UA-107854568-t0', 'auto');
fsa('send', 'pageview'); <
/script>