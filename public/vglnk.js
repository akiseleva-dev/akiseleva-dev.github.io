(function(k) {
        var a = {
            _breaker: {},
            _start: null,
            each: function() {
                var b, c = function(c, d) {
                    return c === a._breaker || !!d && a.elapsed() > b
                };
                return function(e, d, f) {
                    var h = a.type(e);
                    if (1 === arguments.length)
                        b = arguments[0];
                    else if (f = a.extend({
                        timeout: !1
                    }, f),
                    "object" === h && e.hasOwnProperty)
                        for (l in e) {
                            if (e.hasOwnProperty(l) && c(d(e[l], l), f.timeout))
                                break
                        }
                    else if (e) {
                        var l = 0;
                        for (h = e.length; l < h && !c(d(e[l], l), f.timeout); l++)
                            ;
                    }
                }
            }(),
            extend: function(a) {
                var b, e, d = arguments.length;
                a = a || {};
                for (b = 1; b < d; b++) {
                    var f = arguments[b];
                    if (void 0 !== f && null !== f)
                        for (e in f) {
                            var h = f[e];
                            a !== h && void 0 !== h && (a[e] = h)
                        }
                }
                return a
            },
            noop: function() {},
            type: function() {
                var a = function(a, b) {
                    try {
                        return ("function" === typeof window[b] || "object" === typeof window[b]) && a instanceof window[b]
                    } catch (d) {}
                    return !1
                };
                return function(b) {
                    return b = null === b ? "null" : void 0 === b ? "undefined" : a(b, "HTMLElement") || "object" === typeof b && 1 === b.nodeType && "string" === typeof b.nodeName ? "element" : b == b.window ? "window" : a(b, "HTMLDocument") || "object" === typeof b && ("defaultView"in b || "parentWindow"in b) ? "document" : Object.prototype.toString.call(b).slice(8, -1).toLowerCase()
                }
            }()
        };
        a.extend(a, {
            addClass: function(b, c) {
                a.hasClass(b, c) || (b.className = (b.className ? b.className + " " : "") + c)
            },
            all: function(b, c) {
                var e = "array" === a.type(b) ? [] : {};
                a.each(b, function(b, f) {
                    c(b, f) && ("array" === a.type(e) ? e.push(b) : e[f] = b)
                });
                return e
            },
            ancestors: function(a) {
                for (var b = [a]; (a = a.parentNode) && 1 === a.nodeType; )
                    b.push(a);
                return b
            },
            apiCallback: function(b, c) {
                return function(e) {
                    "string" === a.type(e) && (e = {
                        response: [e]
                    });
                    b.apply(c, e.response.concat(e.data))
                }
            },
            attributes: function(b, c) {
                var e;
                c = c || {};
                for (e in c)
                    "function" === a.type(b.setAttribute) ? b.setAttribute(e, c[e]) : b["class" === e ? "className" : e] = c[e]
            },
            attrValues: function(a, c, e) {
                return (c = a[c]) && c.split ? c.split(e || " ") : []
            },
            batchable: function(b, c) {
                c = c || a.noop;
                var e = function() {
                    return a.extend({
                        batch: !0,
                        timeout: 100
                    }, c())
                }
                    , d = a.traits.cors && a.traits.json
                    , f = []
                    , h = null
                    , l = function() {
                    null !== h && (clearTimeout(h),
                        h = null);
                    1 === f.length ? b.apply(null, f[0].arguments) : 1 < f.length && b.apply(null, f);
                    f = []
                }
                    , g = function() {
                    f.push({
                        arguments: a.toArray(arguments),
                        batch: !0
                    });
                    d && e().batch ? null === h && (h = setTimeout(a.entryPoint(a.bind(function() {
                        l()
                    }, this)), e().timeout)) : l()
                };
                a.extend(g, {
                    flush: l,
                    now: b
                });
                return g
            },
            batchArgs: function(b, c) {
                return a.map(b, function(a) {
                    return void 0 === c ? a.arguments : a.arguments[c]
                })
            },
            batchCallType: function(b) {
                var c;
                return a.reduce(null, b, function(a, b) {
                    c = b[0];
                    return null !== a && c !== a ? "batch" : c
                })
            },
            batched: function(b) {
                b = a.toArray(b);
                if ("array" === a.type(b))
                    return a.all(b, function(b) {
                        return "object" === a.type(b) && b.batch && "array" === a.type(b.arguments)
                    }).length === b.length
            },
            bind: function(a, c) {
                return function() {
                    return a.apply(c, arguments)
                }
            },
            cache: function() {
                var b = {}
                    , c = "vglnk_" + (new Date).getTime()
                    , e = 0;
                return function(d, f, h) {
                    d && "string" !== a.type(d) || (h = f,
                        f = d,
                        d = b);
                    var l = d[c];
                    if (l || void 0 !== h)
                        return l || (l = ++e),
                        b[l] || (d[c] = l,
                            b[l] = {}),
                        void 0 !== h && (b[l][f] = h),
                            "string" === typeof f ? b[l][f] : b[l]
                }
            }(),
            canonicalizeHostname: function() {
                var b = {};
                return function(c) {
                    "string" === typeof c && (c = a.createA(c));
                    try {
                        return b[c.hostname] || (b[c.hostname] = c.hostname ? c.hostname.toString().toLowerCase().replace(/^www\./, "").replace(/:.*$/, "") : ""),
                            b[c.hostname]
                    } catch (e) {
                        return ""
                    }
                }
            }(),
            clone: function(b) {
                return a.extend({}, b)
            },
            commonParams: function(b, c) {
                c = c || {};
                var e = {
                    drKey: c.key ? null : c.dr_key,
                    key: c.key,
                    libId: c.library_id,
                    subId: c.sub_id
                };
                "click" !== b && "ping" !== b || a.extend(e, {
                    cuid: c.cuid,
                    loc: window.document.location.href,
                    gdprConsent: a.consent().gdprConsent,
                    ccpaConsent: a.consent().ccpaConsent,
                    gdprApplies: a.consent().gdprApplies,
                    v: 1
                }, e);
                return e
            },
            contains: function(b, c, e) {
                return !!a.find(b, function(a) {
                    return a === c
                }, e)
            },
            context: function(b) {
                "element" === a.type(b) && (b = b.ownerDocument);
                "document" === a.type(b) && (b = b.defaultView || b.parentWindow);
                if ("window" === a.type(b))
                    return b
            },
            contextIsAncestor: function(a, c) {
                for (a = a.self; a.parent && a.parent !== a; )
                    if (a = a.parent,
                    a === c)
                        return !0;
                return !1
            },
            cors: function(b, c, e) {
                var d = new window.XMLHttpRequest;
                d.onreadystatechange = function() {
                    if (4 === d.readyState && 200 === d.status) {
                        var b;
                        if (e)
                            e(d.responseText);
                        else if ("string" === a.type(d.responseText) && (b = d.responseText.match(/^\s*(?:\/\*\*\/)?([^(\s]+)\s*\((.*)\);?\s*$/))) {
                            var c = b[1].replace(/(^\s+|\s+$)/g, "");
                            b = a.fromJSON("[" + b[2] + "]");
                            window[c].apply(window, b)
                        }
                    }
                }
                ;
                try {
                    return d.open("POST", b),
                        d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                        d.withCredentials = !0,
                        d.send(c),
                        !0
                } catch (f) {
                    return !1
                }
            },
            createA: function(b, c) {
                return a.createEl("a", {
                    href: b,
                    target: c
                })
            },
            createEl: function(b, c, e, d) {
                b = (d || document).createElement(b);
                a.attributes(b, c);
                a.css(b, e);
                return b
            },
            css: function(b, c) {
                var e;
                if ("object" === a.type(c))
                    for (e in c)
                        try {
                            b.style[e] = c[e]
                        } catch (l) {}
                else
                    try {
                        var d = window.getComputedStyle(b);
                        var f = a.toArray(arguments).slice(1);
                        var h = a.reduce({}, f, function(a, b) {
                            a[b] = d.getPropertyValue(b);
                            return a
                        });
                        return 1 === f.length ? h[f[0]] : h
                    } catch (l) {
                        return
                    }
                return b
            },
            destructing: function(a) {
                return function(a) {
                    var b = !1, c;
                    return function() {
                        b || (c = a.apply(null, arguments),
                            b = !0);
                        return c
                    }
                }(a)
            },
            elapsed: function(a) {
                return (a = a || this._start) ? (new Date).getTime() - a.getTime() : 0
            },
            entryPoint: function(b) {
                return a.exceptionLogger(function() {
                    a._start = new Date;
                    a.observer.pause();
                    var c = b.apply(this, arguments);
                    a.observer.resume();
                    return c
                })
            },
            escapeRegExp: function() {
                var a;
                return function(b) {
                    a = a || /([.*+?^${}()|[\]\\])/g;
                    return b.replace(a, "\\$1")
                }
            }(),
            eventLink: function(a) {
                var b = a.target || a.srcElement;
                do {
                    try {
                        var e = b.nodeType
                    } catch (d) {
                        break
                    }
                    if (1 === e && (a = b.tagName.toUpperCase(),
                    "A" === a || "AREA" === a))
                        return b;
                    b = b.parentNode
                } while (b)
            },
            every: function(b, c) {
                return !a.some(b, function(a) {
                    return !c(a)
                })
            },
            exceptionLogger: function() {
                var b = !1
                    , c = a.noop;
                return function(a, d) {
                    if (void 0 !== d)
                        b = d,
                            c = a;
                    else
                        return function() {
                            if (b)
                                try {
                                    return a.apply(this, arguments)
                                } catch (f) {
                                    c(f)
                                }
                            else
                                return a.apply(this, arguments)
                        }
                }
            }(),
            find: function(b, c, e) {
                var d;
                a.each(b, function(b, e) {
                    if (c(b, e))
                        return d = b,
                            a._breaker
                }, e);
                return d
            },
            generateNodeFilter: function() {
                var b = function(a, b) {
                    var e;
                    b = "," + b.join(",") + ",";
                    var d = 0;
                    for (e = a.length; d < e; d++)
                        if (c(a[d], b))
                            return !0;
                    return !1
                }
                    , c = function(a, b) {
                    return -1 !== b.indexOf("," + a + ",")
                };
                return function(e) {
                    e = a.extend({
                        custom: null,
                        classes: [],
                        rels: [],
                        selectors: [],
                        tags: []
                    }, e);
                    e.tags.length && (e.tags = "," + e.tags.join(",").toLowerCase() + ",");
                    a.isArray(e.selectors) && (e.selectors = e.selectors.join(","));
                    e.selectors && e.selectors.length && a.select(e.selectors);
                    return function(d, f, h) {
                        f = a.extend({
                            ancestors: !0,
                            self: !0
                        }, f);
                        h = a.extend({}, h);
                        var l = {
                            passed: !0
                        }
                            , g = function(d, f, h, l) {
                            var m;
                            if (m = e.tags && e.tags.length)
                                m = e.tags,
                                    m = c(d.nodeName.toLowerCase(), m);
                            if (m = !m) {
                                if (m = e.classes && e.classes.length) {
                                    m = e.classes;
                                    var t = a.attrValues(d, "className");
                                    m = b(m, t)
                                }
                                m = !m
                            }
                            if (m) {
                                if (m = e.rels && e.rels.length)
                                    m = e.rels,
                                        t = a.attrValues(d, "rel"),
                                        m = c(d.nodeName.toLowerCase(), ",a,") && b(m, t);
                                m = !m
                            }
                            return m && !("function" === a.type(e.custom) && e.custom(d, f, h, l))
                        };
                        if (f.self && !g(d, !0, l, h))
                            return !1;
                        if (f.ancestors)
                            for (; d.parentNode; )
                                if (d = d.parentNode,
                                1 === d.nodeType && !g(d, !1, l, h))
                                    return !1;
                        return l.passed
                    }
                }
            }(),
            fromJSON: function(b) {
                if (a.traits.json)
                    try {
                        return window.JSON.parse(b)
                    } catch (c) {}
            },
            fromQuery: function(b) {
                "?" === b.substr(0, 1) && (b = b.substr(1));
                b = b.split("&");
                var c = {};
                a.each(b, function(a) {
                    a = a.split("=");
                    c[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
                });
                return c
            },
            geometry: function() {
                var b, c = arguments.length, e = Infinity, d = Infinity, f = -Infinity, h = -Infinity;
                for (b = 0; b < c; b++) {
                    var l = a.position(arguments[b]);
                    e = Math.min(e, l.x);
                    d = Math.min(d, l.y);
                    f = Math.max(f, l.x + arguments[b].offsetWidth);
                    h = Math.max(h, l.y + arguments[b].offsetHeight)
                }
                return {
                    x: e,
                    y: d,
                    w: f - e,
                    h: h - d,
                    x1: e,
                    y1: d,
                    x2: f,
                    y2: h
                }
            },
            getActualHref: function(b) {
                return a.cache(b, "href") || b.href
            },
            hasAttrValue: function(b, c, e, d) {
                return c ? a.contains(a.attrValues(b, c, d), e) : !1
            },
            hasClass: function(b, c) {
                return a.hasAttrValue(b, "className", c)
            },
            hasRel: function(b, c) {
                return a.hasAttrValue(b, "rel", c)
            },
            isArray: function(b) {
                return "array" === a.type(b)
            },
            isDefaultPrevented: function(a) {
                return a.isDefaultPrevented && a.isDefaultPrevented() || !1 === a.returnValue || !0 === a.defaultPrevented
            },
            isInDom: function(a) {
                return !(!a || !a.offsetParent)
            },
            isVisible: function(a) {
                return !(!a.offsetHeight && !a.offsetWidth && a.getClientRects && !a.getClientRects().length)
            },
            jsonp: function(b) {
                var c = document.getElementsByTagName("script")[0];
                b = a.createEl("script", {
                    type: "text/javascript",
                    src: b
                });
                c.parentNode.insertBefore(b, c)
            },
            links: function() {
                var b = ["http:", "https:"]
                    , c = function(c, d) {
                    return a.all(c, function(c) {
                        return c.href && (!d.filter_by_scheme || a.contains(b, c.protocol)) && (!d.filter_homepages || "/" !== c.pathname) && (!d.filter_internal || c.hostname !== a.context(c).location.hostname)
                    })
                };
                return function(b, d, f) {
                    d = d || "";
                    f = a.extend({
                        filter_homepages: !0,
                        filter_internal: !0,
                        filter_by_scheme: !0
                    }, f);
                    d = a.map(d.split(","), function(a) {
                        return a + " a[href]"
                    }).join(",");
                    return c(a.withScope(b, d, {
                        ancestors: !1,
                        consolidate: !0
                    }), f)
                }
            }(),
            map: function(b, c, e) {
                return a.reduce([], b, function(a, b, e) {
                    a.push(c(b, e));
                    return a
                }, e)
            },
            matches: function(b, c) {
                if ("element" !== a.type(b))
                    return !1;
                try {
                    return this.Sizzle.matchesSelector(b, c)
                } catch (e) {
                    return !0
                }
            },
            mergeable: function(b) {
                var c = function() {
                    return a.extend({
                        batchable: !0,
                        batchFn: a.noop,
                        nonBatchFn: a.noop,
                        timeout: 100
                    }, b())
                };
                return a.batchable(function() {
                    a.batched(arguments) ? c().batchable ? a.each(a.batchArgs(arguments), function(a) {
                        c().batchFn.apply(this, a)
                    }) : c().nonBatchFn.apply(this, arguments) : c().nonBatchFn.apply(this, arguments)
                }, function() {
                    return {
                        batch: !0,
                        timeout: c().timeout
                    }
                })
            },
            mergeParams: function(b) {
                var c, e, d = arguments.length, f = function(d, e) {
                    c = b[e];
                    b.hasOwnProperty(e) && a.isArray(d) && a.isArray(c) ? b[e] = a.unique(c.concat(d)) : b[e] = d
                };
                for (e = 1; e < d; e++) {
                    var h = arguments[e];
                    a.each(h, f)
                }
                return a.prune(b)
            },
            nodesOfType: function(b) {
                var c = a.toArray(arguments).slice(1);
                return a.all(b, function(b) {
                    return a.contains(c, b.nodeType)
                })
            },
            on: function() {
                var b;
                return function(c, e, d) {
                    if (1 === arguments.length)
                        b = c;
                    else {
                        if (2 === arguments.length) {
                            if (!b)
                                return;
                            d = e;
                            e = c;
                            c = b
                        } else
                            var f = a.toArray(arguments).slice(3, arguments.length);
                        try {
                            var h = c["on" + e]
                        } catch (oa) {}
                        "function" === typeof h && (c["on" + e] = a.bind(function(b) {
                            b = b || window.event;
                            var d = h.apply(c, arguments);
                            this.exceptionLogger(function() {
                                return b ? (void 0 !== d && !1 !== b.returnValue && (b.returnValue = d),
                                a.isDefaultPrevented(b) && "function" === a.type(b.preventDefault) && b.preventDefault(),
                                    b.returnValue) : d
                            })()
                        }, this));
                        var l = a.entryPoint(function() {
                            if (b.enabled())
                                return d.apply(null, a.toArray(arguments).concat(f || []))
                        });
                        c.addEventListener ? c.addEventListener(e, l, !1) : c.attachEvent && c.attachEvent("on" + e, l)
                    }
                }
            }(),
            packageArgs: function() {
                return a.toArray(arguments)
            },
            position: function(b, c) {
                var e = 0
                    , d = 0
                    , f = 0
                    , h = 0;
                c = c || document;
                if (!a.isInDom(b))
                    return !1;
                var l = b;
                do
                    e += l.offsetLeft,
                        d += l.offsetTop,
                        l = l.offsetParent;
                while (l);
                l = b;
                do
                    f += l.scrollLeft,
                        h += l.scrollTop,
                        l = l.parentNode;
                while (l && l !== c.body);
                return {
                    x: e - f,
                    y: d - h
                }
            },
            preventDefault: function(a) {
                a.preventDefault && a.preventDefault();
                return a.returnValue = !1
            },
            prune: function(b) {
                a.each(b, function(a, e) {
                    null !== a && void 0 !== a || delete b[e]
                });
                return b
            },
            ready: function() {
                var b = !1, c = [], e = !1, d, f;
                document.addEventListener ? d = function() {
                        document.removeEventListener("DOMContentLoaded", d, !1);
                        g()
                    }
                    : document.attachEvent && (f = function() {
                        "complete" === document.readyState && (document.detachEvent("onreadystatechange", f),
                            g())
                    }
                );
                var h = function() {
                    if (!b) {
                        b = !0;
                        if ("interactive" === document.readyState || "complete" === document.readyState)
                            return g();
                        if (document.addEventListener)
                            document.addEventListener("DOMContentLoaded", d, !1);
                        else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange", f);
                            var c = !1;
                            try {
                                c = null === window.frameElement
                            } catch (m) {}
                            document.documentElement.doScroll && c && l()
                        }
                        a.on(window, "load", g)
                    }
                };
                var l = function() {
                    if (!e) {
                        try {
                            document.documentElement.doScroll("left")
                        } catch (t) {
                            setTimeout(a.entryPoint(l), 1);
                            return
                        }
                        g()
                    }
                };
                var g = function() {
                    if (!e) {
                        if (!document.body)
                            return setTimeout(a.entryPoint(g), 13);
                        e = !0;
                        c && (a.each(c, function(a) {
                            a()
                        }),
                            c = null)
                    }
                };
                return function(a) {
                    h();
                    e ? a() : c.push(a)
                }
            }(),
            reduce: function(b, c, e, d) {
                a.each(c, function(a, c) {
                    b = e(b, a, c)
                }, d);
                return b
            },
            reformatKeys: function(b) {
                var c, e = function(a) {
                    return "_" + a.toLowerCase()
                };
                for (c in b) {
                    var d = c.replace(/([A-Z])/g, e);
                    "object" === a.type(b[c]) && (b[c] = a.reformatKeys(b[c]));
                    d !== c && (b[d] = b[c],
                        delete b[c])
                }
                return b
            },
            removeClass: function(b, c) {
                if (a.hasClass(b, c)) {
                    var e, d = a.attrValues(b, "className");
                    var f = 0;
                    for (e = d.length; f < e; f++)
                        d[f] === c && delete d[f];
                    b.className = d.join(" ")
                }
            },
            request: function(b, c, e) {
                var d = a.uniqid("vglnk_")
                    , f = a.toArray(arguments).slice(3, arguments.length)
                    , h = function(b, c, d) {
                    var e = {}
                        , f = !!c.length
                        , h = !0 === d || !1 === d;
                    if (f || h)
                        b = a.createA(b),
                        f && (e.search = "?" + c),
                        h && (c = b.protocol || a.context(b).location.protocol || "http:",
                            e.protocol = c.replace(/s?:$/, function() {
                                return d ? "s:" : ":"
                            })),
                            b = a.extend(b, e).href;
                    return b
                };
                var l = function(b, c) {
                    var d = {}
                        , e = a.commonParams();
                    d[c] = {};
                    a.each(b, function(a, b) {
                        b in e ? d[b] = a : d[c][b] = a
                    });
                    d[c] = a.toJSON(d[c]);
                    return a.prune(d)
                };
                e = a.extend({
                    fn: a.noop,
                    json_payload: null,
                    jsonp: !0,
                    "return": !1,
                    ssl: null,
                    timeout: null
                }, e);
                if ("string" === typeof e.fn) {
                    var g = window[e.fn];
                    d = e.fn
                } else
                    "function" === typeof e.fn && (g = e.fn);
                if ("function" === a.type(g)) {
                    var t = a.entryPoint(a.destructing(function() {
                        if (e.json_payload) {
                            var b = e.json_payload;
                            var h = a.fromJSON(c[b]);
                            c = a.extend(c, h);
                            delete c[b]
                        }
                        g({
                            response: a.toArray(arguments),
                            data: f,
                            args: c
                        });
                        window[d] && (window[d] = void 0)
                    }));
                    null !== e.timeout && setTimeout(t, e.timeout)
                }
                e.json_payload && a.traits.cors && (c = l(c, e.json_payload));
                !0 === e.jsonp && (window[d] = t,
                    c = a.extend({
                        format: "jsonp",
                        jsonp: d
                    }, c));
                l = a.toQuery(c);
                return e["return"] ? h(b, l, e.ssl) : a.traits.json && a.traits.cors && a.cors(h(b, "", e.ssl), l, e.jsonp ? null : t) ? !0 : a.jsonp(h(b, l, e.ssl))
            },
            rootContext: function(b) {
                var c = b = this.context(b);
                try {
                    for (; b && b.parent !== b; )
                        b = b.parent
                } catch (e) {}
                return a.find([b, c.top, c], function(b) {
                    return "window" === a.type(b)
                })
            },
            select: function() {
                try {
                    return this.Sizzle.apply(this.Sizzle, arguments)
                } catch (b) {
                    return []
                }
            },
            some: function(b, c) {
                return !!a.find(b, function(a) {
                    return c(a)
                })
            },
            stopPropagation: function(a) {
                a && a.stopPropagation && a.stopPropagation();
                a.cancelBubble = !0
            },
            time: function() {
                return (new Date).getTime()
            },
            toArray: function(a) {
                if (a && void 0 !== a.length)
                    try {
                        return Array.prototype.slice.call(a, 0)
                    } catch (f) {
                        var b, e = [];
                        var d = 0;
                        for (b = a.length; d < b; d++)
                            e[d] = a[d];
                        return e
                    }
            },
            toJSON: function(b) {
                if (a.traits.json)
                    try {
                        return window.JSON.stringify(b)
                    } catch (c) {}
            },
            toQuery: function(b) {
                var c = "";
                a.each(a.prune(b), function(a, b) {
                    c += "&" + encodeURIComponent(b) + "=" + encodeURIComponent(a)
                });
                return c.substr(1)
            },
            updateUrl: function(b, c) {
                return a.extend(a.createA(b), c).href
            },
            uniqid: function() {
                var a = 0;
                return function(b) {
                    return (b || "") + (new Date).getTime() + a++
                }
            }(),
            unique: function(b) {
                return a.reduce([], b, function(b, e) {
                    a.contains(b, e) || b.push(e);
                    return b
                })
            },
            unlink: function(a) {
                var b, e = document.createDocumentFragment();
                if (a.parentNode) {
                    for (; null !== (b = a.firstChild); )
                        e.appendChild(b);
                    a.parentNode.insertBefore(e, a);
                    a.parentNode.removeChild(a)
                }
            },
            withScope: function() {
                var b = function(b, e, d) {
                    if (d.self && a.contains(e, b, {
                        timeout: !0
                    }))
                        return b;
                    if (d.ancestors)
                        return a.find(a.ancestors(b).slice(0), function(b) {
                            return a.contains(e, b, {
                                timeout: !0
                            })
                        }, {
                            timeout: !0
                        })
                };
                return function(c, e, d) {
                    var f, h = a.select(e);
                    d = a.extend({
                        ancestors: !0,
                        consolidate: !1,
                        descendants: !0,
                        self: !0
                    }, d);
                    d.descendants && (f = a.map(h, function(b) {
                        return [b, a.ancestors(b)]
                    }, {
                        timeout: !0
                    }));
                    c = a.all(a.map(c, function(c) {
                        var e, l = [];
                        (e = b(c, h, d)) ? l.push(e) : 1 === c.nodeType && d.descendants && a.each(f, function(b) {
                            var d = b[0];
                            a.contains(b[1], c, {
                                timeout: !0
                            }) && l.push(d)
                        }, {
                            timeout: !0
                        });
                        return [c, l]
                    }, {
                        timeout: !0
                    }), function(a) {
                        return 0 < a[1].length
                    }, {
                        timeout: !0
                    });
                    return d.consolidate ? a.unique(a.reduce([], c, function(a, b) {
                        return a.concat(b[1])
                    }, {
                        timeout: !0
                    })) : c
                }
            }()
        });
        var n = function() {
            var b = a.find(a.toArray(arguments), function(b) {
                return "function" === a.type(b)
            });
            b && (a.Sizzle = b())
        };
        n.amd = !0;
        (function(a) {
                function b(a, b, c, d) {
                    var e, p, r, f;
                    (b ? b.ownerDocument || b : G) !== E && Q(b);
                    b = b || E;
                    c = c || [];
                    if (!a || "string" !== typeof a)
                        return c;
                    if (1 !== (f = b.nodeType) && 9 !== f)
                        return [];
                    if (H && !d) {
                        if (e = pa.exec(a))
                            if (r = e[1])
                                if (9 === f)
                                    if ((p = b.getElementById(r)) && p.parentNode) {
                                        if (p.id === r)
                                            return c.push(p),
                                                c
                                    } else
                                        return c;
                                else {
                                    if (b.ownerDocument && (p = b.ownerDocument.getElementById(r)) && X(b, p) && p.id === r)
                                        return c.push(p),
                                            c
                                }
                            else {
                                if (e[2])
                                    return M.apply(c, b.getElementsByTagName(a)),
                                        c;
                                if ((r = e[3]) && B.getElementsByClassName && b.getElementsByClassName)
                                    return M.apply(c, b.getElementsByClassName(r)),
                                        c
                            }
                        if (B.qsa && (!F || !F.test(a))) {
                            p = e = C;
                            r = b;
                            var A = 9 === f && a;
                            if (1 === f && "object" !== b.nodeName.toLowerCase()) {
                                f = Z(a);
                                (e = b.getAttribute("id")) ? p = e.replace(qa, "\\$&") : b.setAttribute("id", p);
                                p = "[id='" + p + "'] ";
                                for (r = f.length; r--; )
                                    f[r] = p + D(f[r]);
                                r = fa.test(a) && k(b.parentNode) || b;
                                A = f.join(",")
                            }
                            if (A)
                                try {
                                    return M.apply(c, r.querySelectorAll(A)),
                                        c
                                } catch (Ea) {} finally {
                                    e || b.removeAttribute("id")
                                }
                        }
                    }
                    return ra(a.replace(aa, "$1"), b, c, d)
                }
                function e() {
                    function a(c, d) {
                        b.push(c + " ") > x.cacheLength && delete a[b.shift()];
                        return a[c + " "] = d
                    }
                    var b = [];
                    return a
                }
                function d(a) {
                    a[C] = !0;
                    return a
                }
                function f(a) {
                    var b = E.createElement("div");
                    try {
                        return !!a(b)
                    } catch (r) {
                        return !1
                    } finally {
                        b.parentNode && b.parentNode.removeChild(b)
                    }
                }
                function h(a, b) {
                    var c = a.split("|");
                    for (a = a.length; a--; )
                        x.attrHandle[c[a]] = b
                }
                function l(a, b) {
                    var c = b && a
                        , d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
                    if (d)
                        return d;
                    if (c)
                        for (; c = c.nextSibling; )
                            if (c === b)
                                return -1;
                    return a ? 1 : -1
                }
                function g(a) {
                    return function(b) {
                        return "input" === b.nodeName.toLowerCase() && b.type === a
                    }
                }
                function t(a) {
                    return function(b) {
                        var c = b.nodeName.toLowerCase();
                        return ("input" === c || "button" === c) && b.type === a
                    }
                }
                function m(a) {
                    return d(function(b) {
                        b = +b;
                        return d(function(c, d) {
                            for (var e, p = a([], c.length, b), f = p.length; f--; )
                                c[e = p[f]] && (c[e] = !(d[e] = c[e]))
                        })
                    })
                }
                function k(a) {
                    return a && "undefined" !== typeof a.getElementsByTagName && a
                }
                function P() {}
                function D(a) {
                    for (var b = 0, c = a.length, d = ""; b < c; b++)
                        d += a[b].value;
                    return d
                }
                function v(a, b, c) {
                    var d = b.dir
                        , e = c && "parentNode" === d
                        , p = sa++;
                    return b.first ? function(b, c, p) {
                            for (; b = b[d]; )
                                if (1 === b.nodeType || e)
                                    return a(b, c, p)
                        }
                        : function(b, c, f) {
                            var r, h = [I, p];
                            if (f)
                                for (; b = b[d]; ) {
                                    if ((1 === b.nodeType || e) && a(b, c, f))
                                        return !0
                                }
                            else
                                for (; b = b[d]; )
                                    if (1 === b.nodeType || e) {
                                        var A = b[C] || (b[C] = {});
                                        if ((r = A[d]) && r[0] === I && r[1] === p)
                                            return h[2] = r[2];
                                        A[d] = h;
                                        if (h[2] = a(b, c, f))
                                            return !0
                                    }
                        }
                }
                function y(a) {
                    return 1 < a.length ? function(b, c, d) {
                            for (var e = a.length; e--; )
                                if (!a[e](b, c, d))
                                    return !1;
                            return !0
                        }
                        : a[0]
                }
                function ba(a, b, c, d, e) {
                    for (var p, f = [], r = 0, h = a.length, A = null != b; r < h; r++)
                        if (p = a[r])
                            if (!c || c(p, d, e))
                                f.push(p),
                                A && b.push(r);
                    return f
                }
                function z(a, c, e, f, h, l) {
                    f && !f[C] && (f = z(f));
                    h && !h[C] && (h = z(h, l));
                    return d(function(d, p, r, l) {
                        var A, m = [], g = [], t = p.length, y;
                        if (!(y = d)) {
                            y = c || "*";
                            for (var v = r.nodeType ? [r] : r, U = [], k = 0, T = v.length; k < T; k++)
                                b(y, v[k], U);
                            y = U
                        }
                        y = !a || !d && c ? y : ba(y, m, a, r, l);
                        v = e ? h || (d ? a : t || f) ? [] : p : y;
                        e && e(y, v, r, l);
                        if (f) {
                            var D = ba(v, g);
                            f(D, [], r, l);
                            for (r = D.length; r--; )
                                if (A = D[r])
                                    v[g[r]] = !(y[g[r]] = A)
                        }
                        if (d) {
                            if (h || a) {
                                if (h) {
                                    D = [];
                                    for (r = v.length; r--; )
                                        (A = v[r]) && D.push(y[r] = A);
                                    h(null, v = [], D, l)
                                }
                                for (r = v.length; r--; )
                                    (A = v[r]) && -1 < (D = h ? R.call(d, A) : m[r]) && (d[D] = !(p[D] = A))
                            }
                        } else
                            v = ba(v === p ? v.splice(t, v.length) : v),
                                h ? h(null, p, v, l) : M.apply(p, v)
                    })
                }
                function w(a) {
                    var b, c, d = a.length, e = x.relative[a[0].type];
                    var p = e || x.relative[" "];
                    for (var f = e ? 1 : 0, h = v(function(a) {
                        return a === b
                    }, p, !0), l = v(function(a) {
                        return -1 < R.call(b, a)
                    }, p, !0), m = [function(a, c, d) {
                        return !e && (d || c !== ca) || ((b = c).nodeType ? h(a, c, d) : l(a, c, d))
                    }
                    ]; f < d; f++)
                        if (p = x.relative[a[f].type])
                            m = [v(y(m), p)];
                        else {
                            p = x.filter[a[f].type].apply(null, a[f].matches);
                            if (p[C]) {
                                for (c = ++f; c < d && !x.relative[a[c].type]; c++)
                                    ;
                                return z(1 < f && y(m), 1 < f && D(a.slice(0, f - 1).concat({
                                    value: " " === a[f - 2].type ? "*" : ""
                                })).replace(aa, "$1"), p, f < c && w(a.slice(f, c)), c < d && w(a = a.slice(c)), c < d && D(a))
                            }
                            m.push(p)
                        }
                    return y(m)
                }
                function q(a, c) {
                    var e = 0 < c.length
                        , p = 0 < a.length
                        , f = function(d, f, r, h, l) {
                        var A, m, g, v = 0, t = "0", y = d && [], k = [], U = ca, D = d || p && x.find.TAG("*", l), T = I += null == U ? 1 : Math.random() || .1, P = D.length;
                        for (l && (ca = f !== E && f); t !== P && null != (A = D[t]); t++) {
                            if (p && A) {
                                for (m = 0; g = a[m++]; )
                                    if (g(A, f, r)) {
                                        h.push(A);
                                        break
                                    }
                                l && (I = T)
                            }
                            e && ((A = !g && A) && v--,
                            d && y.push(A))
                        }
                        v += t;
                        if (e && t !== v) {
                            for (m = 0; g = c[m++]; )
                                g(y, k, f, r);
                            if (d) {
                                if (0 < v)
                                    for (; t--; )
                                        y[t] || k[t] || (k[t] = ta.call(h));
                                k = ba(k)
                            }
                            M.apply(h, k);
                            l && !d && 0 < k.length && 1 < v + c.length && b.uniqueSort(h)
                        }
                        l && (I = T,
                            ca = U);
                        return y
                    };
                    return e ? d(f) : f
                }
                var u, ca, N, W, E, J, H, F, S, da, X, C = "sizzle" + -new Date, G = a.document, I = 0, sa = 0, ja = e(), ka = e(), la = e(), ha = function(a, b) {
                    a === b && (W = !0);
                    return 0
                }, ua = {}.hasOwnProperty, O = [], ta = O.pop, va = O.push, M = O.push, ma = O.slice, R = O.indexOf || function(a) {
                    for (var b = 0, c = this.length; b < c; b++)
                        if (this[b] === a)
                            return b;
                    return -1
                }
                    , aa = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g, wa = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/, xa = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/, ya = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g, za = /:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/, Aa = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/, ea = {
                    ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                    CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                    TAG: /^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/,
                    ATTR: /^\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\]/,
                    PSEUDO: /^:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
                    CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                    bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                    needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
                }, Ba = /^(?:input|select|textarea|button)$/i, Ca = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/, pa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, fa = /[+~]/, qa = /'|\\/g, K = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig, L = function(a, b, c) {
                    a = "0x" + b - 65536;
                    return a !== a || c ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320)
                };
                try {
                    M.apply(O = ma.call(G.childNodes), G.childNodes),
                        O[G.childNodes.length].nodeType
                } catch (p) {
                    M = {
                        apply: O.length ? function(a, b) {
                                va.apply(a, ma.call(b))
                            }
                            : function(a, b) {
                                for (var c = a.length, d = 0; a[c++] = b[d++]; )
                                    ;
                                a.length = c - 1
                            }
                    }
                }
                var B = b.support = {};
                var Da = b.isXML = function(a) {
                        return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
                    }
                ;
                var Q = b.setDocument = function(a) {
                        var b = a ? a.ownerDocument || a : G;
                        a = b.defaultView;
                        if (b === E || 9 !== b.nodeType || !b.documentElement)
                            return E;
                        E = b;
                        J = b.documentElement;
                        H = !Da(b);
                        a && a !== a.top && (a.addEventListener ? a.addEventListener("unload", function() {
                            Q()
                        }, !1) : a.attachEvent && a.attachEvent("onunload", function() {
                            Q()
                        }));
                        B.attributes = f(function(a) {
                            a.className = "i";
                            return !a.getAttribute("className")
                        });
                        B.getElementsByTagName = f(function(a) {
                            a.appendChild(b.createComment(""));
                            return !a.getElementsByTagName("*").length
                        });
                        B.getElementsByClassName = Y.test(b.getElementsByClassName) && f(function(a) {
                            a.innerHTML = "<div class='a'></div><div class='a i'></div>";
                            a.firstChild.className = "i";
                            return 2 === a.getElementsByClassName("i").length
                        });
                        B.getById = f(function(a) {
                            J.appendChild(a).id = C;
                            return !b.getElementsByName || !b.getElementsByName(C).length
                        });
                        B.getById ? (x.find.ID = function(a, b) {
                                if ("undefined" !== typeof b.getElementById && H)
                                    return (a = b.getElementById(a)) && a.parentNode ? [a] : []
                            }
                                ,
                                x.filter.ID = function(a) {
                                    var b = a.replace(K, L);
                                    return function(a) {
                                        return a.getAttribute("id") === b
                                    }
                                }
                        ) : (delete x.find.ID,
                                x.filter.ID = function(a) {
                                    var b = a.replace(K, L);
                                    return function(a) {
                                        return (a = "undefined" !== typeof a.getAttributeNode && a.getAttributeNode("id")) && a.value === b
                                    }
                                }
                        );
                        x.find.TAG = B.getElementsByTagName ? function(a, b) {
                                if ("undefined" !== typeof b.getElementsByTagName)
                                    return b.getElementsByTagName(a)
                            }
                            : function(a, b) {
                                var c = []
                                    , d = 0;
                                b = b.getElementsByTagName(a);
                                if ("*" === a) {
                                    for (; a = b[d++]; )
                                        1 === a.nodeType && c.push(a);
                                    return c
                                }
                                return b
                            }
                        ;
                        x.find.CLASS = B.getElementsByClassName && function(a, b) {
                            if ("undefined" !== typeof b.getElementsByClassName && H)
                                return b.getElementsByClassName(a)
                        }
                        ;
                        S = [];
                        F = [];
                        if (B.qsa = Y.test(b.querySelectorAll))
                            f(function(a) {
                                a.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                                a.querySelectorAll("[msallowclip^='']").length && F.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                                a.querySelectorAll("[selected]").length || F.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                                a.querySelectorAll(":checked").length || F.push(":checked")
                            }),
                                f(function(a) {
                                    var c = b.createElement("input");
                                    c.setAttribute("type", "hidden");
                                    a.appendChild(c).setAttribute("name", "D");
                                    a.querySelectorAll("[name=d]").length && F.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                                    a.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled");
                                    a.querySelectorAll("*,:x");
                                    F.push(",.*:")
                                });
                        (B.matchesSelector = Y.test(da = J.matches || J.webkitMatchesSelector || J.mozMatchesSelector || J.oMatchesSelector || J.msMatchesSelector)) && f(function(a) {
                            B.disconnectedMatch = da.call(a, "div");
                            da.call(a, "[s!='']:x");
                            S.push("!=", ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)")
                        });
                        F = F.length && new RegExp(F.join("|"));
                        S = S.length && new RegExp(S.join("|"));
                        X = (a = Y.test(J.compareDocumentPosition)) || Y.test(J.contains) ? function(a, b) {
                                var c = 9 === a.nodeType ? a.documentElement : a;
                                b = b && b.parentNode;
                                return a === b || !!(b && 1 === b.nodeType && (c.contains ? c.contains(b) : a.compareDocumentPosition && a.compareDocumentPosition(b) & 16))
                            }
                            : function(a, b) {
                                if (b)
                                    for (; b = b.parentNode; )
                                        if (b === a)
                                            return !0;
                                return !1
                            }
                        ;
                        ha = a ? function(a, c) {
                                if (a === c)
                                    return W = !0,
                                        0;
                                var d = !a.compareDocumentPosition - !c.compareDocumentPosition;
                                if (d)
                                    return d;
                                d = (a.ownerDocument || a) === (c.ownerDocument || c) ? a.compareDocumentPosition(c) : 1;
                                return d & 1 || !B.sortDetached && c.compareDocumentPosition(a) === d ? a === b || a.ownerDocument === G && X(G, a) ? -1 : c === b || c.ownerDocument === G && X(G, c) ? 1 : N ? R.call(N, a) - R.call(N, c) : 0 : d & 4 ? -1 : 1
                            }
                            : function(a, c) {
                                if (a === c)
                                    return W = !0,
                                        0;
                                var d = 0
                                    , e = a.parentNode
                                    , f = c.parentNode
                                    , p = [a]
                                    , h = [c];
                                if (!e || !f)
                                    return a === b ? -1 : c === b ? 1 : e ? -1 : f ? 1 : N ? R.call(N, a) - R.call(N, c) : 0;
                                if (e === f)
                                    return l(a, c);
                                for (; a = a.parentNode; )
                                    p.unshift(a);
                                for (a = c; a = a.parentNode; )
                                    h.unshift(a);
                                for (; p[d] === h[d]; )
                                    d++;
                                return d ? l(p[d], h[d]) : p[d] === G ? -1 : h[d] === G ? 1 : 0
                            }
                        ;
                        return b
                    }
                ;
                b.matches = function(a, c) {
                    return b(a, null, null, c)
                }
                ;
                b.matchesSelector = function(a, c) {
                    (a.ownerDocument || a) !== E && Q(a);
                    c = c.replace(ya, "='$1']");
                    if (!(!B.matchesSelector || !H || S && S.test(c) || F && F.test(c)))
                        try {
                            var d = da.call(a, c);
                            if (d || B.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                                return d
                        } catch (U) {}
                    return 0 < b(c, E, null, [a]).length
                }
                ;
                b.contains = function(a, b) {
                    (a.ownerDocument || a) !== E && Q(a);
                    return X(a, b)
                }
                ;
                b.attr = function(a, b) {
                    (a.ownerDocument || a) !== E && Q(a);
                    var c = x.attrHandle[b.toLowerCase()];
                    c = c && ua.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !H) : void 0;
                    return void 0 !== c ? c : B.attributes || !H ? a.getAttribute(b) : (c = a.getAttributeNode(b)) && c.specified ? c.value : null
                }
                ;
                b.error = function(a) {
                    throw Error("Syntax error, unrecognized expression: " + a);
                }
                ;
                b.uniqueSort = function(a) {
                    var b, c = [], d = 0, e = 0;
                    W = !B.detectDuplicates;
                    N = !B.sortStable && a.slice(0);
                    a.sort(ha);
                    if (W) {
                        for (; b = a[e++]; )
                            b === a[e] && (d = c.push(e));
                        for (; d--; )
                            a.splice(c[d], 1)
                    }
                    N = null;
                    return a
                }
                ;
                var ia = b.getText = function(a) {
                        var b = ""
                            , c = 0;
                        var d = a.nodeType;
                        if (!d)
                            for (; d = a[c++]; )
                                b += ia(d);
                        else if (1 === d || 9 === d || 11 === d) {
                            if ("string" === typeof a.textContent)
                                return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling)
                                b += ia(a)
                        } else if (3 === d || 4 === d)
                            return a.nodeValue;
                        return b
                    }
                ;
                var x = b.selectors = {
                    cacheLength: 50,
                    createPseudo: d,
                    match: ea,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(a) {
                            a[1] = a[1].replace(K, L);
                            a[3] = (a[3] || a[4] || a[5] || "").replace(K, L);
                            "~=" === a[2] && (a[3] = " " + a[3] + " ");
                            return a.slice(0, 4)
                        },
                        CHILD: function(a) {
                            a[1] = a[1].toLowerCase();
                            "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]),
                                a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                                a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]);
                            return a
                        },
                        PSEUDO: function(a) {
                            var b, c = !a[6] && a[2];
                            if (ea.CHILD.test(a[0]))
                                return null;
                            a[3] ? a[2] = a[4] || a[5] || "" : c && za.test(c) && (b = Z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
                                a[2] = c.slice(0, b));
                            return a.slice(0, 3)
                        }
                    },
                    filter: {
                        TAG: function(a) {
                            var b = a.replace(K, L).toLowerCase();
                            return "*" === a ? function() {
                                    return !0
                                }
                                : function(a) {
                                    return a.nodeName && a.nodeName.toLowerCase() === b
                                }
                        },
                        CLASS: function(a) {
                            var b = ja[a + " "];
                            return b || (b = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)"),
                                ja(a, function(a) {
                                    return b.test("string" === typeof a.className && a.className || "undefined" !== typeof a.getAttribute && a.getAttribute("class") || "")
                                }))
                        },
                        ATTR: function(a, c, d) {
                            return function(e) {
                                e = b.attr(e, a);
                                if (null == e)
                                    return "!=" === c;
                                if (!c)
                                    return !0;
                                e += "";
                                return "=" === c ? e === d : "!=" === c ? e !== d : "^=" === c ? d && 0 === e.indexOf(d) : "*=" === c ? d && -1 < e.indexOf(d) : "$=" === c ? d && e.slice(-d.length) === d : "~=" === c ? -1 < (" " + e + " ").indexOf(d) : "|=" === c ? e === d || e.slice(0, d.length + 1) === d + "-" : !1
                            }
                        },
                        CHILD: function(a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3)
                                , h = "last" !== a.slice(-4)
                                , l = "of-type" === b;
                            return 1 === d && 0 === e ? function(a) {
                                    return !!a.parentNode
                                }
                                : function(b, c, m) {
                                    var p;
                                    c = f !== h ? "nextSibling" : "previousSibling";
                                    var g = b.parentNode
                                        , t = l && b.nodeName.toLowerCase();
                                    m = !m && !l;
                                    if (g) {
                                        if (f) {
                                            for (; c; ) {
                                                for (p = b; p = p[c]; )
                                                    if (l ? p.nodeName.toLowerCase() === t : 1 === p.nodeType)
                                                        return !1;
                                                var v = c = "only" === a && !v && "nextSibling"
                                            }
                                            return !0
                                        }
                                        v = [h ? g.firstChild : g.lastChild];
                                        if (h && m) {
                                            m = g[C] || (g[C] = {});
                                            var y = m[a] || [];
                                            var k = y[0] === I && y[1];
                                            var r = y[0] === I && y[2];
                                            for (p = k && g.childNodes[k]; p = ++k && p && p[c] || (r = k = 0) || v.pop(); )
                                                if (1 === p.nodeType && ++r && p === b) {
                                                    m[a] = [I, k, r];
                                                    break
                                                }
                                        } else if (m && (y = (b[C] || (b[C] = {}))[a]) && y[0] === I)
                                            r = y[1];
                                        else
                                            for (; (p = ++k && p && p[c] || (r = k = 0) || v.pop()) && ((l ? p.nodeName.toLowerCase() !== t : 1 !== p.nodeType) || !++r || (m && ((p[C] || (p[C] = {}))[a] = [I, r]),
                                            p !== b)); )
                                                ;
                                        r -= e;
                                        return r === d || 0 === r % d && 0 <= r / d
                                    }
                                }
                        },
                        PSEUDO: function(a, c) {
                            var e = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                            if (e[C])
                                return e(c);
                            if (1 < e.length) {
                                var f = [a, a, "", c];
                                return x.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                                    for (var d, f = e(a, c), h = f.length; h--; )
                                        d = R.call(a, f[h]),
                                            a[d] = !(b[d] = f[h])
                                }) : function(a) {
                                    return e(a, 0, f)
                                }
                            }
                            return e
                        }
                    },
                    pseudos: {
                        not: d(function(a) {
                            var b = []
                                , c = []
                                , e = na(a.replace(aa, "$1"));
                            return e[C] ? d(function(a, b, c, d) {
                                d = e(a, null, d, []);
                                for (var f = a.length; f--; )
                                    if (c = d[f])
                                        a[f] = !(b[f] = c)
                            }) : function(a, d, f) {
                                b[0] = a;
                                e(b, null, f, c);
                                return !c.pop()
                            }
                        }),
                        has: d(function(a) {
                            return function(c) {
                                return 0 < b(a, c).length
                            }
                        }),
                        contains: d(function(a) {
                            a = a.replace(K, L);
                            return function(b) {
                                return -1 < (b.textContent || b.innerText || ia(b)).indexOf(a)
                            }
                        }),
                        lang: d(function(a) {
                            Aa.test(a || "") || b.error("unsupported lang: " + a);
                            a = a.replace(K, L).toLowerCase();
                            return function(b) {
                                var c;
                                do
                                    if (c = H ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                        return c = c.toLowerCase(),
                                        c === a || 0 === c.indexOf(a + "-");
                                while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                        }),
                        target: function(b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id
                        },
                        root: function(a) {
                            return a === J
                        },
                        focus: function(a) {
                            return a === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                        },
                        enabled: function(a) {
                            return !1 === a.disabled
                        },
                        disabled: function(a) {
                            return !0 === a.disabled
                        },
                        checked: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && !!a.checked || "option" === b && !!a.selected
                        },
                        selected: function(a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return !0 === a.selected
                        },
                        empty: function(a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (6 > a.nodeType)
                                    return !1;
                            return !0
                        },
                        parent: function(a) {
                            return !x.pseudos.empty(a)
                        },
                        header: function(a) {
                            return Ca.test(a.nodeName)
                        },
                        input: function(a) {
                            return Ba.test(a.nodeName)
                        },
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && "button" === a.type || "button" === b
                        },
                        text: function(a) {
                            var b;
                            return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                        },
                        first: m(function() {
                            return [0]
                        }),
                        last: m(function(a, b) {
                            return [b - 1]
                        }),
                        eq: m(function(a, b, c) {
                            return [0 > c ? c + b : c]
                        }),
                        even: m(function(a, b) {
                            for (var c = 0; c < b; c += 2)
                                a.push(c);
                            return a
                        }),
                        odd: m(function(a, b) {
                            for (var c = 1; c < b; c += 2)
                                a.push(c);
                            return a
                        }),
                        lt: m(function(a, b, c) {
                            for (b = 0 > c ? c + b : c; 0 <= --b; )
                                a.push(b);
                            return a
                        }),
                        gt: m(function(a, b, c) {
                            for (c = 0 > c ? c + b : c; ++c < b; )
                                a.push(c);
                            return a
                        })
                    }
                };
                x.pseudos.nth = x.pseudos.eq;
                for (u in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    x.pseudos[u] = g(u);
                for (u in {
                    submit: !0,
                    reset: !0
                })
                    x.pseudos[u] = t(u);
                P.prototype = x.filters = x.pseudos;
                x.setFilters = new P;
                var Z = b.tokenize = function(a, c) {
                        var d, e, f, h, l;
                        if (h = ka[a + " "])
                            return c ? 0 : h.slice(0);
                        h = a;
                        var m = [];
                        for (l = x.preFilter; h; ) {
                            if (!g || (d = wa.exec(h)))
                                d && (h = h.slice(d[0].length) || h),
                                    m.push(e = []);
                            var g = !1;
                            if (d = xa.exec(h))
                                g = d.shift(),
                                    e.push({
                                        value: g,
                                        type: d[0].replace(aa, " ")
                                    }),
                                    h = h.slice(g.length);
                            for (f in x.filter)
                                !(d = ea[f].exec(h)) || l[f] && !(d = l[f](d)) || (g = d.shift(),
                                    e.push({
                                        value: g,
                                        type: f,
                                        matches: d
                                    }),
                                    h = h.slice(g.length));
                            if (!g)
                                break
                        }
                        return c ? h.length : h ? b.error(a) : ka(a, m).slice(0)
                    }
                ;
                var na = b.compile = function(a, b) {
                        var c, d = [], e = [], f = la[a + " "];
                        if (!f) {
                            b || (b = Z(a));
                            for (c = b.length; c--; )
                                f = w(b[c]),
                                    f[C] ? d.push(f) : e.push(f);
                            f = la(a, q(e, d));
                            f.selector = a
                        }
                        return f
                    }
                ;
                var ra = b.select = function(a, b, c, d) {
                        var e, f, h, l = "function" === typeof a && a, m = !d && Z(a = l.selector || a);
                        c = c || [];
                        if (1 === m.length) {
                            var g = m[0] = m[0].slice(0);
                            if (2 < g.length && "ID" === (f = g[0]).type && B.getById && 9 === b.nodeType && H && x.relative[g[1].type]) {
                                b = (x.find.ID(f.matches[0].replace(K, L), b) || [])[0];
                                if (!b)
                                    return c;
                                l && (b = b.parentNode);
                                a = a.slice(g.shift().value.length)
                            }
                            for (e = ea.needsContext.test(a) ? 0 : g.length; e--; ) {
                                f = g[e];
                                if (x.relative[h = f.type])
                                    break;
                                if (h = x.find[h])
                                    if (d = h(f.matches[0].replace(K, L), fa.test(g[0].type) && k(b.parentNode) || b)) {
                                        g.splice(e, 1);
                                        a = d.length && D(g);
                                        if (!a)
                                            return M.apply(c, d),
                                                c;
                                        break
                                    }
                            }
                        }
                        (l || na(a, m))(d, b, !H, c, fa.test(a) && k(b.parentNode) || b);
                        return c
                    }
                ;
                B.sortStable = C.split("").sort(ha).join("") === C;
                B.detectDuplicates = !!W;
                Q();
                B.sortDetached = f(function(a) {
                    return a.compareDocumentPosition(E.createElement("div")) & 1
                });
                f(function(a) {
                    a.innerHTML = "<a href='#'></a>";
                    return "#" === a.firstChild.getAttribute("href")
                }) || h("type|href|height|width", function(a, b, c) {
                    if (!c)
                        return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
                });
                B.attributes && f(function(a) {
                    a.innerHTML = "<input/>";
                    a.firstChild.setAttribute("value", "");
                    return "" === a.firstChild.getAttribute("value")
                }) || h("value", function(a, b, c) {
                    if (!c && "input" === a.nodeName.toLowerCase())
                        return a.defaultValue
                });
                f(function(a) {
                    return null == a.getAttribute("disabled")
                }) || h("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(a, b, c) {
                    var d;
                    if (!c)
                        return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
                });
                "function" === typeof n && n.amd ? n(function() {
                    return b
                }) : "undefined" !== typeof module && module.exports ? module.exports = b : a.Sizzle = b
            }
        )(window);
        a.browser = function() {
            var b, c = {}, e = navigator.userAgent.toLowerCase().replace(/\s*[()]\s*/g, "; ").replace(/(\/[\w.]+)\s+/g, "$1; ").replace(/;\s*$/, "").split(/;\s*/);
            a.each(e, function(a) {
                b = (/[\/ :]([^\/ :]+)$/.exec(a) || [])[1];
                c[b ? a.substr(0, a.length - b.length - 1).replace(/\d*$/, "") : a] = b || !0
            });
            return {
                aol: c.aol,
                blackberry: c.blackberry,
                firefox: c.firefox,
                ie: !(!c.msie && !c.trident),
                ios: !(!c.applewebkit || !c.mobile),
                opera: c.opera,
                playstation: c.playstation,
                version: parseFloat(c.version || c.crios || c.msie || c.rv || c.firefox) || !1
            }
        }();
        a.page = function() {
            var b, c = a.rootContext(window);
            c = {
                description: function() {
                    return a.map(a.select("meta[name='description' i]").slice(0, 1), function(a) {
                        return a.getAttribute("content")
                    })[0]
                }(),
                font_size: function() {
                    var b = a.css(document.body, "font-size");
                    if (b)
                        return parseFloat(b)
                }(),
                referrer: c.document.referrer,
                title: c.document.title
            };
            for (b in c)
                c[b] = c[b] || null;
            return c
        }();
        a.harmony = {
            PASSIVE: 1,
            UNSAFE_QUIRKSMODE_EVENTS: .5,
            COMMERCIAL_LINK_EVENTS: .1,
            LINK_EVENTS: -1,
            AGGRESSIVE: -1
        };
        a.harmony.DEFAULT = 0;
        a.pii = function() {
            var b = {
                email: /[A-Z0-9._%+-]+(?:%(?:25)*40|@)[A-Z0-9.-]+\.[A-Z]{2,4}/,
                numeric: /\d([^0-9A-Z]{0,4}\d){6,18}/
            }
                , c = {
                contains: function(a, b) {
                    return this.regexp(b).test(a)
                },
                redact: function(a, b) {
                    return a.replace(this.regexp(b), "___")
                },
                regexp: function(c) {
                    c = a.extend({}, c);
                    var d = a.map(a.all(b, function(a, b) {
                        return !1 !== c[b]
                    }), function(a) {
                        return a.source
                    });
                    return new RegExp("(\\b" + d.join("\\b|\\b") + "\\b)","gi")
                },
                transmits: function(a, b) {
                    return this.contains(a + " " + document.referrer, b || {
                        numeric: !1
                    })
                }
            };
            return {
                contains: a.bind(c.contains, c),
                redact: a.bind(c.redact, c),
                transmits: a.bind(c.transmits, c)
            }
        }();
        a.platforms = function() {
            var b = {
                NONE: {
                    id: "full",
                    scope: "body",
                    spec: {
                        selector: "body"
                    }
                },
                bbp: {
                    spec: {
                        parser: /^post-(\d+)$/,
                        selector: "div[id^='post-']"
                    },
                    scope: "li .post"
                },
                hdlr: {
                    spec: {
                        parser: /^post_(\d+)$/,
                        selector: "div[id^='post_']"
                    },
                    scope: ".post-content-area"
                },
                ipb: {
                    spec: {
                        parser: /^post_id_(\d+)$/,
                        selector: "div[id^='post_id_']"
                    },
                    scope: ".post_body .post"
                },
                phpb: {
                    spec: {
                        parser: /^p(\d+)$/,
                        selector: "div.post[id^='p']"
                    },
                    scope: ".postbody .content,.postbody .signature"
                },
                ubb: {
                    spec: {
                        parser: /^number(\d+)$/,
                        parse_el: "span[id^=number]",
                        selector: "a[name^='Post'] ~ table"
                    },
                    scope: ".post_inner *[id^='body'],.post_inner .signature"
                },
                vb3: {
                    spec: {
                        parser: /^post_message_(\d+)$/,
                        selector: "div[id^='post_message_'], table[id^='post_message_'],section[id^='post_message_']"
                    },
                    scope: "div[id^='post_message_'],div[id^='post_message_'] ~ div:not([class])"
                },
                vb4: {
                    spec: {
                        parser: /^post_(\d+)$/,
                        selector: "li[id^='post_']"
                    },
                    scope: ".post-content,.postbody .content,.postbody .signature,ul.conversation-list .list-item-body"
                },
                wppr: {
                    spec: {
                        attributes: ["id", "className"],
                        parser: /(?:^|\s)post-(\d+)(?:\s|$)/,
                        selector: "article[class*='post-'], div[id^='post-']"
                    }
                }
            }
                , c = {
                getPostId: function(b) {
                    var c;
                    if (this === a.platforms.NONE)
                        return " ";
                    var e = this.spec.parse_el ? a.select(this.spec.parse_el, b)[0] : b;
                    a.find(this.spec.attributes || ["id"], a.bind(function(a) {
                        c = e[a] ? e[a].match(this.spec.parser) : null;
                        return !!c
                    }, this));
                    if (c)
                        return c[1]
                },
                getPostIds: function(b) {
                    var c = [];
                    a.each(this.getPosts(b), a.bind(function(b) {
                        (b = this.getPostId(b)) && !a.contains(c, b) && c.push(b)
                    }, this));
                    return c.length ? c : null
                },
                getPosts: function(b) {
                    var c = [];
                    !b && document && document.body && (b = [document.body]);
                    b && this.spec && (c = a.withScope(b, this.spec.selector, {
                        consolidate: !0
                    }));
                    return c
                }
            };
            a.each(b, function(e, d) {
                e.id = e.id || d;
                a.each(c, function(b, c) {
                    e[c] = a.bind(b, e)
                });
                b[d] = e
            });
            b.DEFAULT_POST_ID = " ";
            b.findById = function(b) {
                return a.find(a.platforms, function(a) {
                    return a.id === b
                })
            }
            ;
            return b
        }();
        a.observer = function() {
            var b, c = [], e = 0, d = function() {
                b || (b = new MutationObserver(a.entryPoint(function(b) {
                    var d = [];
                    a.each(b, function(b) {
                        var c = [];
                        "characterData" === b.type ? b.target && (c = [b.target]) : "attributes" === b.type ? c = [b.target] : b.addedNodes && b.addedNodes.length && (c = a.toArray(b.addedNodes));
                        c.length && (d = d.concat(c))
                    });
                    0 < d.length && a.each(c, function(a) {
                        a.callback(d)
                    })
                })))
            }, f = function(c) {
                var f = {
                    attributes: !1,
                    characterData: !1,
                    childList: !1,
                    subtree: !0
                };
                e || (d(),
                c.opts.attributes && (f = a.extend(f, {
                    attributes: !0
                }),
                "array" === a.type(c.opts.attributes) && (f = a.extend(f, {
                    attributeFilter: c.opts.attributes
                }))),
                c.opts.content && (f = a.extend(f, {
                    characterData: !0,
                    childList: !0
                })),
                    b.observe(c.context, f))
            };
            return {
                start: function(b, d, e) {
                    b.document && (b = b.document);
                    d = a.extend({
                        attributes: !1,
                        content: !0
                    }, d);
                    a.traits.mutation && a.contains(["document", "element"], a.type(b)) && (b = {
                        callback: e,
                        context: b,
                        opts: d
                    },
                        c.push(b),
                        f(b))
                },
                pause: function() {
                    e++;
                    b && b.disconnect()
                },
                resume: function() {
                    e--;
                    a.each(c, f)
                }
            }
        }();
        a.traits = {
            basicCompatibility: !(a.browser.blackberry || a.browser.playstation),
            beacon: !!window.navigator.sendBeacon && !!window.Blob,
            cors: window.XMLHttpRequest && void 0 !== (new window.XMLHttpRequest).withCredentials,
            crossWindowCommunication: !a.browser.ios,
            fastRegexp: !a.browser.firefox,
            json: !!window.JSON && !!window.JSON.stringify && !!window.JSON.parse,
            jsRedirectSetsReferrer: a.browser.aol || !(a.browser.ie || a.browser.opera),
            mutation: window.MutationObserver && !a.browser.ie,
            performanceTimingApi: !!(window.performance && window.performance.mark && window.performance.measure && window.performance.now && window.performance.getEntriesByName),
            performanceNavigationTiming: !!(window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation") && window.performance.getEntriesByType("navigation")[0] && window.performance.getEntriesByType("navigation")[0].domInteractive),
            referrerPolicy: !a.browser.ie,
            quirksMode: !window.addEventListener,
            windowLevelHandlers: !!window.addEventListener
        };
        a.consent = function() {
            var b, c, e, d, f, h, g, k, t = {
                configureGdprAndCcpaConsent: function() {
                    this.lookupGdprConsent(function(a) {
                        2 === d && (b = a.tcString,
                            e = "boolean" === typeof a.gdprApplies ? a.gdprApplies : !0);
                        f && window.removeEventListener("message", f, !1)
                    }, function() {});
                    this.configureCcpaConsent()
                },
                callCmpFromSafeFrame: function(a, b, c, d) {
                    window.$sf.ext.register(1, 1, function(a, e) {
                        "cmpReturn" === a ? c(e[b]) : d()
                    });
                    window.$sf.ext.cmp(a)
                },
                callCmpWhileInIframe: function(a, b, c) {
                    var e = {}
                        , h = Math.random().toString()
                        , l = {};
                    l.__tcfapiCall = {
                        command: a,
                        parameter: null,
                        callId: h
                    };
                    l.__tcfapiCall.version = d;
                    e[h] = c;
                    b.postMessage(l, "*");
                    g = function(a) {
                        var b = {};
                        try {
                            b = "string" === typeof a.data ? JSON.parse(a.data) : a.data
                        } catch (V) {}
                        if (b.__tcfapiReturn && b.__tcfapiReturn.callId && (a = b.__tcfapiReturn,
                        "function" === typeof e[a.callId]))
                            e[a.callId](a.returnValue, a.success)
                    }
                    ;
                    window.addEventListener("message", g, !1);
                    f = g
                },
                lookupGdprConsent: function(a, b) {
                    var c = function(c, d) {
                        d && "string" === typeof c.tcString ? "tcloaded" === c.eventStatus || "useractioncomplete" === c.eventStatus ? a(c) : "cmpuishown" === c.eventStatus && 0 < c.tcString.length && !0 === c.purposeOneTreatment ? a(c) : b("Consent string is not available") : b("CMP unable to register callback function. Please check CMP setup.")
                    }
                        , e = function() {
                        for (var a = window, b, c; !b; ) {
                            try {
                                if ("function" === typeof a.__tcfapi) {
                                    d = 2;
                                    c = a.__tcfapi;
                                    b = a;
                                    break
                                }
                            } catch (V) {}
                            try {
                                if (a.frames.__tcfapiLocator) {
                                    d = 2;
                                    b = a;
                                    break
                                }
                            } catch (V) {}
                            if (a === window.top)
                                break;
                            if ("undefined" !== typeof a && "undefined" !== typeof a.parent)
                                a = a.parent;
                            else
                                break
                        }
                        return [b, c]
                    }()
                        , f = e[0];
                    e = e[1];
                    if (!f)
                        return b("CMP not found");
                    "function" === typeof e ? 2 === d && e("addEventListener", d, c) : 2 === d && this.callCmpWhileInIframe("addEventListener", f, c)
                },
                configureCcpaConsent: function() {
                    this.lookupCcpaConsent(function(a) {
                        c = a.uspData;
                        h && window.removeEventListener("message", h, !1)
                    }, function() {})
                },
                lookupCcpaConsent: function(a, b) {
                    var c = window, d, e = (new Date).getTime(), f = {
                        uspData: "",
                        success: !1
                    }, g = function(c, d) {
                        f.uspData = c && c.uspString || "";
                        (f.success = d) ? a(f) : b()
                    };
                    try {
                        var l = window.__uspapi || window.top.__uspapi
                    } catch (V) {
                        b(V)
                    }
                    if ("function" === typeof l)
                        l("getUSPData", 1, g);
                    else {
                        for (; !d; ) {
                            try {
                                c.frames.__uspapiLocator && (d = c)
                            } catch (V) {
                                b(V);
                                return
                            }
                            if (c === window.top) {
                                b();
                                return
                            }
                            c = c.parent
                        }
                        l = {
                            __uspapiCall: {
                                command: "getUSPData",
                                version: 1,
                                parameter: null,
                                callId: e
                            }
                        };
                        d.postMessage(l, "*");
                        k = function(c) {
                            c.data && c.data.__uspapiReturn && c.data.__uspapiReturn.callId === e && (c.data.__uspapiReturn.success ? a(c.data.__uspapiReturn.returnValue) : b())
                        }
                        ;
                        window.addEventListener("message", k, !1);
                        h = k
                    }
                }
            };
            a.exceptionLogger(a.bind(t.configureGdprAndCcpaConsent, t))();
            return function() {
                return {
                    gdprConsent: b,
                    ccpaConsent: c,
                    gdprApplies: e
                }
            }
        }();
        var g, u, w, z;
        var q = {
            EVENT_LEVEL_LINK: 1,
            EVENT_LEVEL_TOP: 2,
            PLUGIN_MANUAL: 1,
            TYPE_ACCEPTABLE: "l",
            allowed: function() {
                var b;
                return function() {
                    b || (b = a.generateNodeFilter({
                        classes: ["novig"],
                        rels: ["novig"],
                        selectors: g.exclude_scope,
                        tags: "applet embed noscript object head img input link meta param select button iframe option script style svg textarea title".split(" "),
                        custom: function(b, e, d, f) {
                            if (!g.whitelist || f.skipWhitelist)
                                return !1;
                            if (e)
                                d.passed = !1;
                            else if (d.passed)
                                return !1;
                            e = q.whitelistNodes();
                            d.passed = d.passed || e && e.length && a.contains(e, b);
                            return !1
                        }
                    }));
                    return b.apply(q, arguments)
                }
            }(),
            api: function() {
                var b = function() {
                    var b = {
                        optimize: "content",
                        domains: "content"
                    };
                    return function(c, d, f) {
                        var h = a.toArray(arguments).slice(3, arguments.length)
                            , l = b[c];
                        l && (f = a.extend({}, f, {
                            json_payload: l
                        }));
                        l = e(f);
                        var m = d;
                        m = a.extend(a.commonParams(c, g), m);
                        m.subId && m.key !== g.key && (m.subId = null);
                        return {
                            data: h,
                            method: c,
                            opts: l,
                            params: m
                        }
                    }
                }()
                    , c = function(b) {
                    var c = {}
                        , d = {};
                    a.each(b, function(b) {
                        var f = b[0]
                            , h = b[1]
                            , l = b[2] || {};
                        b = a.toArray(b).slice(3, b.length);
                        d[f] = a.mergeParams(d[f] || a.commonParams(f, g), h);
                        c[f] = c[f] || [];
                        c[f].push({
                            data: b,
                            opts: e(l)
                        })
                    });
                    return {
                        calls: c,
                        params: d
                    }
                }
                    , e = function(b) {
                    b = b || {};
                    "function" === a.type(b.fn) && (b.fn = function(c) {
                        return function(d) {
                            var e = d.response ? d.response[0] : null;
                            if ("object" === a.type(e) && "array" === a.type(e.crawl) && "object" === a.type(z.crawler) && "function" === a.type(z.crawler.crawl)) {
                                var f = a.map(e.crawl, function(a) {
                                    return a + ""
                                });
                                delete e.crawl;
                                z.crawler.crawl(f)
                            }
                            return c.apply(b, arguments)
                        }
                    }(b.fn));
                    return b
                }
                    , d = function(b) {
                    var c = b.opts.base_url || g.api_url
                        , d = b.opts.path || "/" + b.method;
                    delete b.opts.base_url;
                    return a.request.apply(a, [c + d, b.params, b.opts].concat(b.data))
                }
                    , f = function(b, c, d) {
                    a.each(c, function(c) {
                        c && c.opts && c.opts.fn && b && c.opts.fn({
                            response: a.packageArgs(b),
                            data: c.data,
                            args: d
                        })
                    })
                };
                var h = function() {
                    var b = function(b) {
                        var c = b.data[0].params
                            , d = b.data[0].calls;
                        b = a.fromJSON(b.response[0]) || {};
                        a.each(b, function(b, e) {
                            var h = c[e];
                            e = d[e];
                            var l;
                            "string" === a.type(b) && (l = b.match(/^[^(]+\((.*)\);?\s*$/)) && (b = a.fromJSON(l[1]));
                            f(b, e, h)
                        })
                    };
                    return function(e) {
                        e = c(e, !0);
                        d({
                            data: e,
                            method: "batch",
                            params: a.extend(a.commonParams("batch", g), e.params),
                            opts: {
                                json_payload: "batch",
                                jsonp: !1,
                                fn: a.bind(b, window)
                            }
                        })
                    }
                }();
                var l = function(e, h, l) {
                    var g = c(e, !1);
                    e = a.reduce({}, g.calls[l], function(a, b) {
                        return {
                            jsonp: a.jsonp || !b.opts || !1 !== b.opts.jsonp,
                            ssl: a.ssl || !b.opts || !1 !== b.opts.ssl
                        }
                    });
                    return d(b(h, g.params[h], {
                        fn: function(a) {
                            f(a.response[0], g.calls[h], g.params[h])
                        },
                        jsonp: e.jsonp,
                        ssl: e.ssl
                    }, g))
                };
                var k = function() {
                    return d(b.apply(this, arguments))
                };
                return a.batchable(function() {
                    if (a.batched(arguments)) {
                        var b = a.batchArgs(arguments);
                        var c = a.batchCallType(b);
                        return "batch" === c ? h.call(this, b) : l.call(this, b, c)
                    }
                    return k.apply(this, arguments)
                }, function() {
                    return {
                        batch: g.batch_calls,
                        timeout: g.batch_call_timeout
                    }
                })
            }(),
            addEventListener: function(a, c) {
                this.fire(a, c)
            },
            click: function() {
                var b = function(b, c) {
                    if ("_self" === c)
                        return b;
                    if (a.traits.crossWindowCommunication && a.traits.jsRedirectSetsReferrer)
                        return b = b.open("", c),
                            b.focus(),
                            b
                }
                    , c = function(b) {
                    var c = b.previousSibling
                        , e = b.nextSibling
                        , h = ["", b.textContent, ""]
                        , l = function(a, b) {
                        for (var c = a.data; (a = a[b + "Sibling"]) && 3 === a.nodeType; )
                            c += a.data;
                        return c
                    }
                        , g = function(a, b, c) {
                        a = a.replace(/\s+/g, " ");
                        b = b.replace(/\s+/g, " ");
                        c = c.replace(/\s+/g, " ");
                        a = a.replace(/^\s+/, "");
                        " " === b.substr(0, 1) && (b = b.substr(1),
                            a += " " !== a.substr(a.length - 1, 1) ? " " : "");
                        " " === b.substr(b.length - 1, 1) && (b = b.substr(0, b.length - 1),
                            c = (" " !== c.substr(0, 1) ? " " : "") + c);
                        c = c.replace(/\s+$/, "");
                        return [a, b, c]
                    };
                    void 0 !== h[1] && (h[0] = c && 3 === c.nodeType ? l(c, "previous") : "",
                        h[2] = e && 3 === e.nodeType ? l(e, "next") : "",
                        h = g.apply(this, h),
                    "" !== h[0] && "" !== h[2] && (h[0] = h[0].split(" ").reverse().slice(0, 10 + (" " === h[0].substr(h[0].length - 1, 1) ? 1 : 0)).reverse().join(" "),
                        h[2] = h[2].split(" ").slice(0, 10).join(" "),
                        b = {
                            type: "context",
                            itype: (a.cache(b, "params") || {}).type,
                            before: h[0],
                            after: h[2],
                            txt: h[1],
                            loc: window.document.location.href,
                            out: a.getActualHref(b),
                            v: 2
                        },
                        q.log("info", a.toQuery(b))))
                };
                return function(e, d) {
                    var f = {}
                        , h = a.context(e) || window;
                    d = e.target || d;
                    d = !d || d === h.name || "_top" === d && h.top === h || "_parent" === d && h.parent === h ? "_self" : d;
                    var l = b(h, d);
                    if ("_self" === d || a.traits.crossWindowCommunication && a.traits.jsRedirectSetsReferrer)
                        try {
                            if (void 0 === l.document)
                                throw !0;
                            var k = "jsonp"
                        } catch (T) {
                            k = "go"
                        }
                    else
                        k = "go";
                    var t = a.destructing(a.apiCallback(function() {
                        this.eventTimer.stop("clk");
                        var b = a.toArray(arguments);
                        b.unshift(e, l, d);
                        this.onApiClick.apply(this, b)
                    }, this));
                    a.cache(this, "link", "string" === typeof e ? e : a.getActualHref(e));
                    if ("string" === typeof e && (e = a.createA(e, d),
                        !this.processLink(e)) || !g.enabled)
                        return t();
                    !a.traits.referrerPolicy && this.isPrivate(e) && (k = "go");
                    var m = this.clickParams(e, k);
                    this.eventTimer.start("clk");
                    g.log_context && c(e);
                    if ("go" === k)
                        m = this.redirectUrl(m, f),
                            this.redirect(m, h, l, d);
                    else if (l === h)
                        this.api.now("click", m, a.extend(f, {
                            fn: t,
                            timeout: g.click_timeout
                        }));
                    else {
                        if (a.contextIsAncestor(h, l))
                            return this.redirect(a.getActualHref(e), h, l, d);
                        t = a.entryPoint(t);
                        setTimeout(function() {
                            t()
                        }, g.click_timeout);
                        l.document.open();
                        l.callback = t;
                        l.document.write("<html><head><title>" + a.getActualHref(e) + '</title><script type="text/javascript" src="' + this.api.now("click", m, a.extend(f, {
                            fn: "callback",
                            "return": !0
                        })) + '">\x3c/script></head></html>');
                        l.document.close()
                    }
                }
            }(),
            clickParams: function(b, c) {
                b = a.extend(a.cache(b, "params"), a.cache("opt_params"), {
                    format: c,
                    out: a.getActualHref(b),
                    reaf: g.reaffiliate || null,
                    ref: a.page.referrer || null,
                    rewrit: a.cache(b, "rewrit"),
                    title: a.page.title,
                    txt: b.innerHTML
                });
                128 < b.txt.length && (b.txt = b.txt.replace(/<[^>]+>/g, ""),
                    b.txt = 128 < b.txt.length ? b.txt.substr(0, 125) + "..." : b.txt);
                return b
            },
            enabled: function() {
                g.enabled && w !== window && window.vglnk && (window.vglnk.key || "function" === typeof window.vglnk) && (g.enabled = !1);
                return g.enabled
            },
            expose: function() {
                return function(b, c) {
                    if ((c = c || this[b]) && !z[b]) {
                        var e = z;
                        c = "function" === a.type(c) ? a.entryPoint(a.bind(c, q)) : c;
                        e[b] = c
                    }
                }
            }(),
            fire: function() {
                var b = {};
                return function(c, e) {
                    c = c.toLowerCase();
                    var d = b[c] || {
                        fired: !1,
                        listeners: []
                    };
                    "function" === typeof e ? d.fired ? setTimeout(function() {
                        e({
                            type: c
                        })
                    }, 0) : d.listeners.push(e) : (d.fired = !0,
                        a.each(d.listeners, function(a) {
                            "function" === typeof a && a({
                                type: c
                            })
                        }),
                        d.listeners = []);
                    b[c] = d
                }
            }(),
            handleRightClick: function(b, c) {
                if (g.rewrite_modified && b && c)
                    switch (c) {
                        case "setup":
                            a.cache(b, "href") || a.cache(b, "href", b.href);
                            b.href = this.redirectUrl(this.clickParams(b, "go"));
                            setTimeout(a.entryPoint(a.bind(function() {
                                this.handleRightClick(b, "teardown")
                            }, this)), 0);
                            break;
                        case "teardown":
                            a.cache(b, "href") && (b.href = a.cache(b, "href"))
                    }
            },
            harmony: function(a) {
                return g.harmony_level <= a
            },
            init: function() {
                var b = function() {
                    var b = a.rootContext(window)
                        , e = !0 === b.__v5k;
                    b.__v5k = !0;
                    return !e
                };
                return function() {
                    var c = this;
                    u = {};
                    if (b()) {
                        try {
                            c.initLibEvents(),
                                c.initNamespace(),
                                c.initOptions()
                        } catch (e) {}
                        a.exceptionLogger(a.bind(c.logException, c), !g.dev);
                        a.each(g.script_timeout);
                        return a.entryPoint(function() {
                            c.initProcessors();
                            c.initDRApi();
                            c.initApi();
                            c.enabled() && (c.initLegacyCallbacks(),
                                c.ping())
                        })()
                    }
                }
            }(),
            initApi: function() {
                var b, c = {};
                if (window.vglnk)
                    for (b in window.vglnk)
                        "_plugin" === b.substr(-7) && (c[b] = window.vglnk[b]);
                z = w[k] = a.noop;
                this.expose("click");
                this.expose("link", a.bind(function(b) {
                    "element" === a.type(b) && b.href && (this.initContext(a.context(b)),
                        this.processLink(b))
                }, this));
                this.expose("open", a.bind(this.click, this));
                this.expose("$", a.clone(a));
                this.expose("allowed");
                this.expose("api");
                this.expose("apiNow", a.bind(this.api.now, this.api));
                this.expose("harmony");
                this.expose("isBlacklisted");
                this.expose("isCommercial");
                this.expose("initLinks");
                this.expose("opt");
                this.expose("platform");
                this.expose("sendLinks");
                this.expose("clickParams", function() {
                    return a.extend(a.commonParams("click", g), q.clickParams.apply(q, arguments))
                });
                this.expose("registerProcessor", function() {
                    if (0 < arguments.length)
                        return q.registerProcessor.apply(q, arguments)
                });
                a.extend(z, z === window.vglnk ? c : {})
            },
            initContext: function() {
                var b = [];
                return function(c) {
                    if (void 0 === c)
                        return b;
                    c && !a.contains(b, c) && (b.push(c),
                        this.initLinks(c),
                        this.initEvents(c))
                }
            }(),
            initDomObserver: function(b, c) {
                a.observer.start(b, c, a.batchable(function(b) {
                    a.batched(arguments) && (b = a.reduce([], a.batchArgs(arguments, 0), function(a, b) {
                        return a.concat(b)
                    }));
                    g.whitelist && q.whitelistNodes(!0);
                    b = a.all(a.unique(b), function(a) {
                        return !!a.parentNode && q.allowed(a)
                    });
                    0 < b.length && (q.processLinks(a.links(b)),
                        a.each(u, function(a, c) {
                            a.opts.mode !== q.PLUGIN_MANUAL && q.runPlugin(c, b)
                        }))
                }, function() {
                    return {
                        batch: g.batch_mutation,
                        timeout: g.batch_mutation_timeout
                    }
                }))
            },
            initDRApi: function() {
                var b = !1;
                window.DrivingRevenue = a.entryPoint(a.destructing(a.bind(function() {
                    b = !0;
                    g.dr_key = window.DR_id;
                    this.enabled() && this.ping()
                }, this)));
                a.on("DOMReady", function() {
                    if (!b)
                        try {
                            delete window.DrivingRevenue
                        } catch (c) {
                            window.DrivingRevenue = void 0
                        }
                })
            },
            initEvents: function(b) {
                var c = a.traits.windowLevelHandlers ? b : b.document
                    , e = function(c) {
                    c = c || b.event;
                    (c = a.eventLink(c)) && !a.cache(c, "evented") && (f(q.EVENT_LEVEL_LINK, c),
                        a.cache(c, "evented", !0))
                }
                    , d = function(b, c) {
                    return function() {
                        var d = [b].concat(a.toArray(arguments));
                        c.apply(q, d)
                    }
                }
                    , f = function(b, c) {
                    a.on(c, "click", d(b, q.onClick));
                    a.on(c, "contextmenu", d(b, q.onContextmenu))
                };
                if (g.dynamic)
                    a.on("DOMReady", function() {
                        q.initDomObserver(b);
                        g.dynamic_scope && a.each(a.select(g.dynamic_scope, b.document), function(a) {
                            q.initDomObserver(a, {
                                attributes: ["class", "id", "style"],
                                content: !1
                            })
                        })
                    });
                a.on(c, "copy", a.bind(q.onCopy, q));
                a.on(c, "mousedown", e);
                a.on("DOMReady", function() {
                    a.each(b.document.links, function(b) {
                        a.on(b, "mousedown", e)
                    })
                });
                a.traits.quirksMode && !q.harmony(a.harmony.UNSAFE_QUIRKSMODE_EVENTS) || f(q.EVENT_LEVEL_TOP, c)
            },
            initLegacyOptions: function() {
                var a, c = {
                    DR_id: "dr_key",
                    vglnk_api_key: "key",
                    vglnk_cuid: "cuid",
                    vglnk_domain: "api_url",
                    vglnk_reaf: "reaffiliate",
                    vglnk_subid: "sub_id"
                };
                for (a in c)
                    void 0 !== window[a] && (z[c[a]] = window[a],
                    "vglnk_domain" === a && (z[c[a]] += "/api"))
            },
            initLegacyCallbacks: function() {
                var b, c = {
                    vl_cB: a.bind(this.onApiClick, this),
                    vl_disable: function() {
                        g.enabled = !1
                    }
                };
                for (b in c)
                    window[b] = c[b]
            },
            initLibEvents: function() {
                a.on(q);
                a.ready(a.bind(function() {
                    this.fire("DOMReady")
                }, this))
            },
            initLinks: function(b) {
                var c = a.bind(function(b) {
                    this.processLinks(a.toArray(b.document.links))
                }, this);
                void 0 === b ? a.each(this.initContext(), c) : c(b)
            },
            initNamespace: function() {
                window.vglnk && window.vglnk.key && (k = "vglnk");
                var a = window
                    , c = k.split(".");
                for (k = c.pop(); 0 < c.length; ) {
                    var e = c.shift();
                    a[e] = a[e] || {};
                    a = a[e]
                }
                w = a;
                z = w[k] = w[k] || {}
            },
            initOptions: function() {
                var b;
                this.initLegacyOptions();
                g = a.extend(this.publicOptions({
                    anywhere_url: "https://redirect.viglink.com",
                    api_url: "https://api.qa.viglink.com/api",
                    asset_url: "https://cdn.viglink.com/api",
                    cuid: null,
                    data_observer: !1,
                    dev: !1,
                    dr_key: null,
                    enabled: a.traits.basicCompatibility,
                    key: null,
                    link_urls: !0,
                    partner: null,
                    platform: a.platforms.NONE.id,
                    reaffiliate: !1,
                    sub_id: null,
                    sync_url: "https://api.viglink.com/api",
                    whitelist: !1,
                    blacklist_domains: null,
                    commercial_domains: null,
                    harmony_level: a.harmony.DEFAULT,
                    link_target: null,
                    private_domains: null,
                    rewrite_any: !0,
                    rewrite_modified: !1,
                    rewrite_original: !0
                }), g, z, {
                    batch_calls: !0,
                    batch_call_timeout: 100,
                    batch_links: !1,
                    batch_mutation: !0,
                    batch_mutation_timeout: 250,
                    click_timeout: 1E3,
                    debug: !1,
                    debug_performance: !1,
                    declare_handler: !1,
                    dynamic: !0,
                    dynamic_scope: null,
                    exclude_scope: null,
                    hop_timeout: 2E3,
                    insert_host: "i.viglink.com",
                    library_id: null,
                    links_merge_timeout: 75,
                    links_version: "3.2",
                    log_context: !0,
                    nofollow: {},
                    norewrite: {},
                    script_timeout: 2E3,
                    testing_js: [],
                    time: !1,
                    time_log_timeout: 3E3,
                    plugins: {
                        crawler: {},
                        harmony: {},
                        link_affiliation: {},
                        modified_clicks: {}
                    }
                });
                g.sync_url = g.sync_url || g.api_url;
                for (b in g)
                    "_plugin" === b.substr(-7) && delete g[b]
            },
            initPlugins: function() {
                var b, c = 1, e = {
                    link_affiliation: "convert",
                    link_optimization: "optimize",
                    page_harmony: "harmony",
                    partner_integration: "partners",
                    product_linker: "insert",
                    product_widget: "spotlight"
                }, d = ["spotlight"], f = ["harmony"], h = function(a) {
                    return function(a) {
                        return function() {
                            delete u[a].opts.mode;
                            c = 1;
                            clearTimeout(b);
                            k()
                        }
                    }(a)
                }, l = function(b) {
                    var c;
                    a.find(e, function(a, b) {
                        return "insert" === a && (c = b)
                    });
                    b[c] || (b[c] = {
                        enabled: !0,
                        key: g.key,
                        link_phrases: !1
                    });
                    b[c].link_urls = g.link_urls;
                    return b
                }, k = function() {
                    var d = {
                        _ran: !1,
                        init: a.noop,
                        initDocuments: a.noop,
                        initNodes: a.noop,
                        "public": {}
                    }
                        , e = function(b, c) {
                        b.setup = b.setup || (window.vglnk ? window.vglnk[c + "_plugin"] : null);
                        "function" === a.type(b.setup) && (b.initDocuments || (b = a.extend(b, d, b.setup(a.reformatKeys(b.opts), a.clone(a), z, h(g.key))),
                        b["public"] && q.expose(c, b["public"], !1)),
                        b.opts.mode !== q.PLUGIN_MANUAL && q.runPlugin(c))
                    }
                        , h = function(b) {
                        var c = function() {
                            if (b) {
                                var c = a.toArray(arguments);
                                c.unshift("custom", b);
                                q.log.apply(this, c)
                            }
                        };
                        c.eventTimer = q.eventTimer;
                        return c
                    }
                        , l = function(a) {
                        return !a._ran
                    };
                    b = null;
                    a.each(f, function(a) {
                        var b = u[a];
                        b && !b._ran && e(b, a)
                    });
                    a.each(a.all(u, l), e);
                    a.find(u, l) && (b = setTimeout(a.entryPoint(k), Math.min(Math.max(Math.pow(2, ++c), 100), 5E3)))
                }, t = function() {
                    setTimeout(function() {
                        q.api.flush()
                    }, 100);
                    k();
                    a.on("DOMReady", function() {
                        setTimeout(q.api.flush, 0)
                    })
                };
                return function(b) {
                    b = l(b);
                    a.each(b, a.bind(function(b, c) {
                        c = e[c] || c;
                        "object" === typeof b && !1 !== b.enabled && (u[c] = {
                            opts: b
                        },
                        a.contains(d, c) && a.jsonp(this.opt("asset_url") + "/plugins/" + c + ".js"),
                            this.opt("data_observer") && "convert" !== c && "partners" !== c ? b.mode = this.PLUGIN_MANUAL : b.mode === this.PLUGIN_MANUAL && this.expose("init_" + c, h(c)))
                    }, this));
                    t()
                }
            }(),
            initProcessors: function() {
                this.registerProcessor(function(b) {
                    var c = a.createA(g.api_url);
                    "/api/click" !== b.pathname || b.hostname !== c.hostname && !b.hostname.match(/(^|\.)(api|cdn|apicdn)\.viglink\.com$/) || (c = a.fromQuery(b.search),
                    void 0 !== c.out && (b.href = c.out,
                        delete c.out,
                        a.cache(b, "params", c)))
                });
                this.registerProcessor(function(b) {
                    g.nofollow[b.href] && !a.hasRel(b, "nofollow") && (b.rel = (b.rel ? b.rel + " " : "") + "nofollow")
                });
                this.registerProcessor(function(b) {
                    g.declare_handler && a.attributes(b, {
                        "data-hl": "viglink"
                    })
                });
                this.registerProcessor(function(b) {
                    window.IPBoard && window.IPBoard.prototype && window.IPBoard.prototype.delegate && a.hasRel(b, "external") && (b.rel = b.rel.replace(/(^| )external( |$)/, ""),
                        b.target = "_blank")
                });
                this.registerProcessor(function() {
                    a.each(a.select(".vl_disclosure"), function(b) {
                        var c = a.createEl(b.tagName, {
                            height: 0,
                            visibility: "hidden"
                        });
                        document.body.appendChild(c);
                        var e = a.css(c, "display");
                        document.body.removeChild(c);
                        a.css(b, {
                            display: e
                        })
                    })
                })
            },
            isAuctionLink: function(b) {
                return !0 === a.cache(b, "auctioned")
            },
            isBlacklisted: function(b) {
                return "object" === a.type(g.blacklist_domains) && g.blacklist_domains[a.canonicalizeHostname(b)]
            },
            isCommercial: function(b) {
                return this.loadedCommercial() && g.commercial_domains[a.canonicalizeHostname(b)]
            },
            isPrivate: function(b) {
                if ("array" !== a.type(g.private_domains))
                    return !1;
                var c = a.canonicalizeHostname(b);
                return a.find(g.private_domains, function(b) {
                    return (new RegExp("(^|\\.)" + a.escapeRegExp(b) + "$","i")).test(c)
                })
            },
            isRewritable: function() {
                var b = a.canonicalizeHostname(document.location)
                    , c = a.generateNodeFilter({
                    classes: ["norewrite"],
                    rels: ["norewrite", "noskim"],
                    custom: function(c, d) {
                        if (!d)
                            return !1;
                        d = a.canonicalizeHostname(c);
                        var e = "";
                        try {
                            e = c.protocol,
                                d.charAt(0)
                        } catch (oa) {
                            return !0
                        }
                        e = !("" !== d && e.match(/^https?:$/i) && !g.norewrite[d]);
                        var h;
                        if (h = !e) {
                            h = a.cache(c, "type");
                            var l = a.cache(c, "params") || {};
                            h = !(h || l.type)
                        }
                        h && (e = b === d || !g.rewrite_original || !g.rewrite_any && !q.isCommercial(c));
                        return e
                    }
                });
                return function(a) {
                    return c(a)
                }
            }(),
            loadedCommercial: function() {
                return "object" === a.type(g.commercial_domains)
            },
            log: function(b, c, e, d) {
                var f = a.toQuery({
                    libId: g.library_id,
                    nocache: a.uniqid()
                });
                var h = "pixel.gif";
                if ("custom" === b)
                    f += "&" + a.toQuery({
                        key: c,
                        type: e
                    }),
                        a.each("array" === a.type(d) ? d : [d], function(b) {
                            a.each(["e", "i", "o"], function(a) {
                                delete b[a]
                            });
                            f += "&" + a.toQuery(b)
                        });
                else {
                    f += "&" + a.toQuery({
                        key: g.key,
                        drKey: g.key ? null : g.dr_key,
                        subId: g.sub_id
                    });
                    if ("time" === b && a.traits.json)
                        h = "time.gif",
                            b = {
                                e: a.toJSON(c),
                                v: 2
                            };
                    else if ("exception" === b)
                        b = {
                            e: c,
                            o: e
                        };
                    else if ("info" === b)
                        b = {
                            i: c
                        };
                    else
                        return;
                    f += "&" + a.toQuery(b)
                }
                h = g.api_url + "/" + h + "?" + f;
                a.pii.transmits(h) || (a.createEl("img").src = h)
            },
            eventTimer: function() {
                var b, c = !1, e = {}, d = function(b, c) {
                    return function() {
                        if (a.traits[c])
                            return b.apply(this, arguments)
                    }
                }, f = function(b, c) {
                    return function() {
                        if (a.reduce(!1, c, function(a, b) {
                            return a || g[b]
                        }))
                            return b.apply(this, arguments)
                    }
                }, h = a.batchable(function() {
                    var b = a.batched(arguments) ? a.batchArgs(arguments) : [arguments];
                    b = a.map(b, function(b) {
                        return a.prune({
                            event: b[0],
                            time: b[1],
                            total: b[2]
                        })
                    });
                    b.length && q.log("time", b)
                }, function() {
                    return {
                        timeout: g.time_log_timeout
                    }
                }), l = f(h, ["time"]);
                h = function(a) {
                    window.performance.mark("viglink-" + a + "-start")
                }
                ;
                var k = a.traits.performanceNavigationTiming ? window.performance.getEntriesByType("navigation")[0].domInteractive : 0;
                a.traits.performanceTimingApi && (b = window.performance.now());
                return {
                    force: d(h, "performanceTimingApi"),
                    start: d(f(h, ["debug_performance", "time"]), "performanceTimingApi"),
                    stop: d(f(function(d, f) {
                        var h = e[d] || 0;
                        var g = "viglink-" + d;
                        var m = "viglink-" + d + "-start"
                            , v = "viglink-" + d + "-stop";
                        window.performance.mark(v);
                        window.performance.measure(g, m, v);
                        g = window.performance.getEntriesByName(g, "measure");
                        g = g.slice(h);
                        e[d] = h + g.length;
                        f || a.each(g, function(a) {
                            l(d, a.duration, a.startTime - k)
                        });
                        c || (c = !0,
                            l("load", b - k, b - k))
                    }, ["debug_performance", "time"]), "performanceTimingApi")
                }
            }(),
            logException: function(b) {
                if (g.debug) {
                    var c = {
                        link: a.cache(this, "link"),
                        loc: window.document.location.href,
                        UA: navigator.userAgent
                    };
                    "string" === typeof b ? c.message = b : c = a.extend(c, b);
                    this.log("exception", b, a.toQuery(c))
                }
            },
            onApiClick: function(b, c, e, d, f) {
                var h = d || a.getActualHref(b)
                    , l = a.bind(function() {
                    this.redirect(h, a.context(b), c, e)
                }, this);
                "object" === typeof f && (f.tracking || f.image) ? (d = a.createEl(f.tracking ? "iframe" : "img", {
                    src: f.tracking || f.image
                }, {
                    height: 0,
                    width: 0,
                    visibility: "hidden"
                }),
                    document.body.appendChild(d),
                    setTimeout(a.entryPoint(l), f.timeout || g.hop_timeout)) : l()
            },
            onApiPing: function(b, c, e, d, f, h) {
                g.rewrite_original = !1;
                f = a.reformatKeys(f || {});
                var l, k;
                d = function(b) {
                    var c = {}
                        , d = function(b) {
                        a.isArray(b) ? c[b[0]] = b[1] : c[b] = 1
                    };
                    a.isArray(b) && a.each(b, d);
                    return c
                }
                ;
                a.exceptionLogger(function() {
                    a.canonicalizeHostname(window.location).match(/(^|\.)cnn\.com$/) && (g.exclude_scope = "#optanon,.OUTBRAIN,*[class*=outbrain],*[class*=partner],*[class*=sponsored]")
                })();
                a.exceptionLogger(function() {
                    a.canonicalizeHostname(window.location).match(/^(www\.)?msn\.com$/) && (g.dynamic_scope = ".gallery-container > .gallerydata,section.gallery:first-child ~ .gallerydata",
                        g.exclude_scope = "*[class^=stb-],.sticky-footer",
                        g.declare_handler = !0)
                })();
                var t = a.extend(g.plugins, f.plugins);
                g = a.extend(g, f);
                delete g.plugins;
                g.click_timeout = c;
                g.library_id = b;
                this.eventTimer.stop("png");
                "array" === a.type(g.testing_js) && 0 < g.testing_js.length && a.each(g.testing_js, function(b) {
                    a.jsonp(b)
                });
                a.extend(g.nofollow, d(h));
                a.extend(g.norewrite, d(e));
                for (l in g)
                    "on" === l.toLowerCase().substr(0, 2) && 2 < l.length && "function" === a.type(g[l]) && (a.on(q, l.toLowerCase().substr(2), a.bind(g[l], window)),
                        delete g[l]);
                this.initPlugins(t);
                this.initContext(window);
                (k = a.rootContext(window)) && k !== window && this.initContext(k);
                this.fire("libready")
            },
            onClick: function(b, c) {
                c = c || window.event;
                var e = c.ctrlKey || c.metaKey || c.altKey || c.shiftKey;
                var d = c.which && 1 === c.which || 0 === c.button
                    , f = a.eventLink(c);
                if (f && d && !e && !a.isDefaultPrevented(c) && this.allowed(f) && this.isRewritable(f) && !this.isAuctionLink(f) && this.shouldHandleClick(b, f)) {
                    if (a.traits.beacon && g.data_observer)
                        return e = a.createA(this.api.now("click", this.clickParams(f), {
                            "return": !0
                        })),
                            b = e.href.split("?")[0],
                            e = new window.Blob([e.search],{
                                type: "application/x-www-form-urlencoded"
                            }),
                            navigator.sendBeacon(b, e),
                            c;
                    this.click(f);
                    return a.preventDefault(c)
                }
            },
            onContextmenu: function(b, c) {
                (c = a.eventLink(c || window.event)) && this.allowed(c) && this.isRewritable(c) && !this.isAuctionLink(c) && this.shouldHandleClick(b, c) && this.handleRightClick(c, "setup")
            },
            onCopy: function(b) {
                var c, e = [];
                if (window.getSelection) {
                    var d = window.getSelection();
                    b = 0;
                    for (c = d.rangeCount; b < c; b++) {
                        try {
                            var f = d.getRangeAt(b).toString().replace(/((^)\s+|\s+$|\r)/g, "").replace(/\s*\n\s*/g, "\n")
                        } catch (h) {}
                        0 < f.length && 128 >= f.length && e.push(f)
                    }
                }
                a.each(e, function(b) {
                    q.log("info", a.toQuery({
                        type: "selection",
                        txt: b,
                        loc: location.href
                    }))
                })
            },
            opt: function(a, c) {
                void 0 !== c && void 0 !== this.publicOptions()[a] && (g[a] = c);
                return g[a]
            },
            ping: function() {
                var b = !1;
                return function() {
                    if (!b && (g.key || g.dr_key)) {
                        var c = {
                            ref: document.referrer || null,
                            v: 2
                        };
                        b = !0;
                        a.pii.transmits(this.api.now("ping", c, {
                            "return": !0
                        })) || (this.eventTimer.force("png"),
                            g.batch_calls = !1,
                            c.type = this.TYPE_ACCEPTABLE,
                            this.api.now("ping", c, {
                                fn: a.apiCallback(this.onApiPing, this)
                            }))
                    }
                }
            }(),
            platform: function() {
                return a.platforms.findById(g.platform) || a.platforms.NONE
            },
            processLink: function(b) {
                var c = a.cache(b, "processors") || {}
                    , e = this.allowed(b)
                    , d = this.isRewritable(b);
                a.each(this.registerProcessor(), function(f) {
                    if (f.opts.any || g.rewrite_any || q.loadedCommercial()) {
                        if (!c[f.id] && e && (d || f.opts.any)) {
                            var h;
                            f.opts.scope && "body" !== f.opts.scope && (h = a.some([f.opts.scope + " a", f.opts.scope], function(c) {
                                return a.matches(b, c)
                            }));
                            !1 !== h && f.fn(b)
                        }
                        c[f.id] = !0
                    }
                });
                a.cache(b, "processors", c);
                return b
            },
            processLinks: function(b) {
                a.each(b, a.bind(this.processLink, this))
            },
            publicOptions: function() {
                var b = {};
                return function(c) {
                    "object" === a.type(c) && (b = c);
                    return a.extend({}, b)
                }
            }(),
            redirect: function(b, c, e, d) {
                var f = function(b, c, d) {
                    var e = [];
                    if (a.traits.referrerPolicy) {
                        var f = function(a) {
                            var b = c.document.createElement("meta");
                            b.name = "referrer";
                            b.content = a;
                            c.document.getElementsByTagName("head")[0].appendChild(b)
                        };
                        q.isPrivate(b) && (e = [f("no-referrer"), f("never")]);
                        d();
                        try {
                            a.each(e, function(a) {
                                a.parentNode.removeChild(a)
                            })
                        } catch (T) {}
                    } else
                        d()
                };
                c = c || window.top;
                a.traits.crossWindowCommunication || e ? a.traits.jsRedirectSetsReferrer ? setTimeout(a.entryPoint(function() {
                    e && e !== c ? a.contextIsAncestor(c, e) ? e.location = b : e.location.replace(b) : f(b, c, function() {
                        c.location = b
                    })
                }), 0) : ("_blank" === d && (d = a.uniqid("win_")),
                    d = a.createA(b, d),
                    d.rel = "norewrite",
                    c.document.body.appendChild(d),
                    d.click(),
                    d.parentNode.removeChild(d)) : (d = c.open(b, d),
                    d.focus())
            },
            redirectUrl: function(b, c) {
                c = c || {};
                return this.api.now("click", b, a.extend(c, {
                    base_url: g.anywhere_url,
                    path: "/"
                }, {
                    "return": !0
                }))
            },
            runPlugin: function(b, c) {
                var e = window.document
                    , d = u[b];
                if (d && d.initDocuments) {
                    if (c)
                        d.initNodes(c);
                    else if (d.init(),
                    "function" === a.type(d.initDocuments) && "document" === a.type(e) && d.initDocuments([e]),
                    "function" === a.type(d.initNodes) && "element" === a.type(e.body))
                        a.on("DOMReady", function() {
                            d.initNodes([e.body])
                        });
                    d._ran = !0
                }
            },
            registerProcessor: function() {
                var b = !1
                    , c = []
                    , e = function(d, e) {
                    if (void 0 === d)
                        return c;
                    "function" === a.type(d) && (e = a.extend({
                        any: !1,
                        scope: null
                    }, e),
                        c.push({
                            fn: d,
                            id: a.uniqid(),
                            opts: e
                        }),
                    b && this.initLinks())
                };
                e(function() {
                    b = !0
                }, {
                    any: !0
                });
                return e
            }(),
            sendLinks: a.mergeable(function() {
                return {
                    batchFn: q.api,
                    nonBatchFn: q.api.now,
                    batchable: g.batch_links,
                    timeout: g.links_merge_timeout
                }
            }),
            shouldHandleClick: function(b, c) {
                var e = !0
                    , d = "inserted" === a.cache(c, "type");
                b === this.EVENT_LEVEL_LINK && (e = this.harmony(a.harmony.LINK_EVENTS) || (this.isCommercial(c) || d) && this.harmony(a.harmony.COMMERCIAL_LINK_EVENTS));
                return e
            },
            whitelistNodes: function() {
                var b;
                return function(c) {
                    if (!b || c)
                        b = a.select(".allowvig");
                    return b
                }
            }()
        };
        q.init();
        try {
            delete window.vglnk_self
        } catch (b) {}
    }
)("undefined" === typeof vglnk_self ? "vglnk" : vglnk_self);
window.vglnk = window.vglnk || {};
window.vglnk.convert_plugin = function(k, a, n) {
    var g = {}, u;
    k = a.extend({
        any: !0,
        convert_minimum_bid: !1,
        check_exp_domains: !0
    }, k);
    var w = {
        getDomains: function() {
            var k = [];
            a.each(g, function(a, b) {
                2 !== g[b] && (k.push(b),
                    g[b] = 2)
            });
            0 < k.length && n.apiNow("domains", {
                domains: k.join("|"),
                v: "2"
            }, {
                fn: a.apiCallback(w.onDomainApi, w)
            })
        },
        init: function() {
            n.opt("link_target", k.link_target);
            n.opt("rewrite_any", k.any);
            n.opt("rewrite_original", !0);
            (u = !n.opt("data_observer") && (!k.any || n.harmony(a.harmony.COMMERCIAL_LINK_EVENTS) || k.convert_minimum_bid || k.check_exp_domains)) && n.registerProcessor(a.bind(function(a) {
                this.initDomainLookup();
                this.saveDomain(a)
            }, this), {
                any: !0
            })
        },
        initDomainLookup: function() {
            var g = !1;
            return function() {
                g || (g = !0,
                    a.on("DOMReady", a.bind(this.getDomains, this)))
            }
        }(),
        onDomainApi: function() {
            var g = a.destructing(function() {
                n.initLinks()
            });
            return function(k) {
                var b = n.opt("blacklist_domains")
                    , c = n.opt("commercial_domains") || {}
                    , e = a.destructing(function() {
                    b = b || {}
                });
                a.each(k.results, function(a, f) {
                    c[f] = !0;
                    a.unlink && (e(),
                        b[f] = !0)
                });
                n.opt("commercial_domains", c);
                n.opt("blacklist_domains", b);
                g()
            }
        }(),
        saveDomain: function(k) {
            k = a.canonicalizeHostname(k);
            g[k] = g[k] || 1
        },
        unlinkBlacklisted: function(g) {
            n.isBlacklisted(g) && a.unlink(g)
        }
    };
    return {
        init: a.bind(w.init, w),
        initNodes: function() {
            w.getDomains()
        }
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.crawler_plugin = function(k, a, n) {
    var g = []
        , u = n.platform();
    k = {
        crawl: function(k) {
            u && "array" === a.type(k) && 0 !== k.length && (k = a.all(k, function(k) {
                return !a.contains(g, k)
            }),
                k = this.findPostsById(k),
                a.each(k, a.bind(function(a) {
                    a.content = this.redact(a.el.innerHTML.replace(/(^\s+|\s+$)/g, ""));
                    delete a.el
                }, this)),
                k = a.all(k, function(a) {
                    return !(!a.content || !a.id)
                }),
            0 < k.length && this.processPosts(k))
        },
        findPostsById: function(g) {
            return a.all(a.map(u.getPosts(), function(a) {
                return {
                    el: a,
                    id: u.getPostId(a)
                }
            }), function(k) {
                return a.contains(g, k.id)
            })
        },
        processPosts: function(k) {
            k = a.map(k, function(a) {
                g.push(a.id);
                return {
                    c: a.content,
                    i: a.id
                }
            });
            n.api("content", {
                content: a.toJSON({
                    ct: k,
                    pt: u.id,
                    u: window.document.location.href
                })
            }, {
                jsonp: !1
            })
        },
        redact: function(g) {
            return a.pii.redact(g)
        }
    };
    return {
        "public": {
            crawl: a.bind(k.crawl, k)
        }
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.modified_clicks_plugin = function(k, a, n) {
    return {
        init: function() {
            n.opt("rewrite_modified", !0)
        }
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.privacy_plugin = function(k, a, n) {
    return {
        init: function() {
            k.domains && n.opt("private_domains", k.domains)
        }
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.dr_search_box_plugin = function(k, a, n) {
    k = a.extend({
        key: null
    }, k);
    var g = {
        init: function(k) {
            a.each(this.getDRSearchForms(k), function(k) {
                if (!a.cache(k, "evented")) {
                    var n = g.getInput(k)
                        , q = function() {
                        n.value || a.css(n, {
                            "background-image": "url(http://cdn.viglink.com/images/ebay_watermark.gif)"
                        })
                    };
                    a.cache(k, "evented", !0);
                    k.onsubmit = null;
                    n.onfocus = null;
                    n.onblur = null;
                    a.on(n, "focus", function() {
                        a.css(n, {
                            "background-image": "none"
                        })
                    });
                    a.on(n, "blur", q);
                    q();
                    a.on(k, "submit", function(a) {
                        g.onSubmit(a, k)
                    })
                }
            })
        },
        getDRSearchForms: function(k) {
            var n = [];
            a.each(k, function(k) {
                "element" === a.type(k) && a.each(k.getElementsByTagName("form"), function(a) {
                    g.getInput(a) && a.id.match(/^DR-ebay-search(CSS|2)?$/i) && n.push(a)
                })
            });
            return n
        },
        getInput: function(a) {
            return a.p || a.q2
        },
        onSubmit: function(u, w) {
            u = u || window.event;
            w = "http://shop.ebay.com/i.html?" + a.toQuery({
                _nkw: g.getInput(w).value
            });
            w = a.createA(w, "_blank");
            a.cache(w, "params", {
                key: k.key
            });
            n.click(w);
            return a.preventDefault(u)
        }
    };
    if (k.key)
        return {
            init: a.bind(g.init, g),
            initNodes: function(a) {
                g.init(a)
            }
        }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.harmony_plugin = function(k, a, n) {
    k = a.extend({
        level: a.harmony.DEFAULT
    }, k);
    return {
        init: function() {
            var a = parseFloat(k.level, 10);
            isFinite(a) && n.opt("harmony_level", a)
        }
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.optimize_plugin = function(k, a) {
    k = a.extend({
        exclude_page_title: null,
        exclude_link_text: null
    }, k);
    return {
        init: function() {
            var n = {
                opt: !0
            };
            null !== k.exclude_page_title && a.extend(n, {
                optExTitle: k.exclude_page_title
            });
            null !== k.exclude_link_text && a.extend(n, {
                optExText: k.exclude_link_text
            });
            a.cache("opt_params", n)
        }
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.insert_plugin = function(k, a, n, g) {
    var u, w = null, z = !1, q = null;
    k = a.extend({
        cat: null,
        dynamic_sample_rate: 1,
        heading_threshold: 2,
        insertion_order: "api",
        key: null,
        link_headings: !1,
        link_phrases: !0,
        link_target: null,
        link_urls: !0,
        manual_mode: 1 === k.mode,
        per_page: null,
        per_phrase: 5,
        proximity: null,
        same_proximity: 100,
        scope: null,
        ui: !0
    }, k);
    "api" !== k.insertion_order && "dom" !== k.insertion_order && (k.insertion_order = "api");
    if (k.key) {
        var b = n.platform();
        var c = {
            cache: function() {
                var b, c, e = function() {
                    b = {};
                    c = {}
                }, g = function(d, e) {
                    var f = c
                        , h = b
                        , g = {};
                    e = e || [a.platforms.DEFAULT_POST_ID];
                    e = a.all(a.unique(a.map(e, function(a) {
                        return f[a]
                    })), function(a) {
                        return null !== a
                    });
                    a.find(e, function(b) {
                        if (h[b] && h[b].data && h[b].order) {
                            if (d)
                                return g[d] = h[b].data[d],
                                    !0;
                            a.each(h[b].order, function(a) {
                                var c = h[b].data[a];
                                g[a] || (g[a] = c)
                            })
                        }
                    });
                    return d ? g[d] : g
                }, n = function(d, e, f, h) {
                    var g = b
                        , k = c;
                    f = f || "-";
                    h = h || [a.platforms.DEFAULT_POST_ID];
                    g[f] = g[f] || {
                        data: {},
                        order: []
                    };
                    g[f].data[d] || (g[f].data[d] = e,
                        g[f].order.push(d));
                    a.each(h, function(a) {
                        k[a] = f
                    });
                    return !0
                }, t = function(b, c, d, e) {
                    var f = a.all(a.toArray(arguments), function(a) {
                        return !!a
                    });
                    "array" === a.type(f[f.length - 1]) && (e = f.pop());
                    b = f[0];
                    c = f[1];
                    if (1 >= f.length)
                        return g(b, e);
                    if (2 <= f.length)
                        return n(b, c, d, e)
                };
                k.manual_mode && a.extend(t, {
                    reset: e
                });
                e();
                return t
            }(),
            enabled: function() {
                return k.link_phrases || k.link_urls
            },
            focusLink: function(b) {
                b.id || (b.id = a.uniqid("vl-link-"));
                location.href.hash = "#" + b.id;
                window.scrollBy(0, -150)
            },
            getPartnerParams: function() {
                var a, b, c = n.opt("partner"), e = {};
                for (a in c)
                    break;
                if (a)
                    for (b in c[a])
                        e[a + "_" + b] = c[a][b];
                return e
            },
            getPhrases: function(d, e) {
                g.eventTimer.start("ins");
                n.api("insert", a.extend(c.getPartnerParams(), {
                    cat: k.cat,
                    i: e ? e.join("|") : null,
                    mode: k.mode,
                    pt: b.id,
                    ps: k.product_source,
                    u: window.document.location.href,
                    v: "2.0"
                }), {
                    fn: a.apiCallback(c.onInsertApi, c)
                }, d, e)
            },
            hasCalled: function() {
                var b = {}
                    , c = Math.random() < k.dynamic_sample_rate
                    , e = function(b) {
                    return c && a.isArray(b) ? a.map(b, function(a) {
                        return e(a)
                    }) : c && b === a.platforms.DEFAULT_POST_ID ? window.document.location.href : b
                }
                    , g = function(c) {
                    c = e(c);
                    return a.isArray(c) && c.length ? a.all(c, function(a) {
                        return b[a]
                    }).length === c.length : !!b[a.platforms.DEFAULT_POST_ID]
                }
                    , n = function(c) {
                    c = e(c);
                    a.isArray(c) && c.length ? a.each(c, function(a) {
                        b[a] = !0
                    }) : b[a.platforms.DEFAULT_POST_ID] = !0
                };
                return function(a, b) {
                    return b ? n(a) : g(a)
                }
            }(),
            init: function() {
                g.eventTimer.start("insert-init-run");
                k.scope = k.scope || b.scope;
                k.link_urls && (u = /(?:(?:\b(https?:\/\/)|(?:^|\s)\W*(www\d{0,3}\.|(?:[a-z0-9-]+\.)+[a-z]{2,4}\/))((?:[^\s()<>]+|\((?:[^\s()<>]|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))|(?:^|\s)\W*((?:[a-z0-9-]+\.)+com\b\/?)(?!\.[a-z0-9-]+))/i)
            },
            initLink: function() {
                return function(b, c, e) {
                    var d = k.link_target;
                    if (d = "U" === c.type ? n.opt("link_target") : d || e)
                        b.target = d;
                    b.href || (b.href = c.url);
                    b.rel = "nofollow";
                    a.cache(b, "params", {
                        exp: w,
                        iid: c.iid,
                        key: k.key,
                        mid: c.mid,
                        type: c.type || null
                    });
                    if (!0 === c.auc) {
                        c = a.fromQuery(b.search);
                        if (e = c.u || c.out)
                            delete c.format,
                                delete c.out,
                                delete c.u,
                                a.extend(c, n.clickParams(b), {
                                    out: e
                                }),
                                b.search = "?" + a.toQuery(c);
                        a.cache(b, "auctioned", !0)
                    }
                    a.cache(b, "href", b.href);
                    n.link(b)
                }
            }(),
            insertLinks: function() {
                var b = a.generateNodeFilter({
                    classes: ["nolinks", "atma-nolink", "atma-nolinks"],
                    tags: ["map"],
                    custom: function(b) {
                        return a.matches(b, "a") && !!b.href
                    }
                })
                    , e = function(b, c, d, e) {
                    var f = {
                        phrase_to_nodes: {},
                        regexp_cache: {},
                        stats: {}
                    };
                    a.each(c, function(a) {
                        l(b, a, d, e, f)
                    }, {
                        timeout: !0
                    });
                    "api" === k.insertion_order && h(d, f);
                    return f.stats
                }
                    , h = function(b, c) {
                    var d = t(b);
                    d.push("&!UNLINKED!&");
                    a.each(d, function(d) {
                        (d = c.phrase_to_nodes[d]) && a.each(d, function(a) {
                            w(a, a.data, b, c)
                        })
                    })
                }
                    , l = function(a, c, d, e, f) {
                    if (n.allowed(c, {}, {
                        skipWhitelist: !0
                    }) && b(c, {
                        ancestors: !e,
                        self: !0
                    }))
                        if (3 === c.nodeType)
                            q(a, c, d, f);
                        else if (1 === c.nodeType)
                            for (c = c.firstChild; c; )
                                e = c.nextSibling,
                                    l(a, c, d, !0, f),
                                    c = e
                }
                    , q = function() {
                    var b = function(b, c) {
                        var d = [];
                        a.each(b, function(b) {
                            if (c[b])
                                var e = c[b];
                            else
                                e = a.escapeRegExp(b).split(" ").join("\\s+"),
                                    e = new RegExp("(?:^|[\\s\"'\\(])(" + e + ")(?=\\s|\\W*$|\\W{2})","i"),
                                    c[b] = e;
                            d.push(e)
                        });
                        k.link_urls && u && d.push(u);
                        return d
                    }
                        , d = function(b, d) {
                        d = t(d);
                        b = c.normalizePhrase(b);
                        return a.all(d, function(a) {
                            return -1 !== b.indexOf(a)
                        })
                    };
                    return function(e, f, g, h) {
                        var l = !1
                            , v = h.phrase_to_nodes
                            , y = h.regexp_cache;
                        if (f.parentNode && (!n.opt("whitelist") || n.allowed(f)))
                            if (f.data && (l = e.test(f.data.replace(/\s+/, " "))),
                            l && "dom" === k.insertion_order)
                                m(e, f, g, h);
                            else if (l && "api" === k.insertion_order) {
                                var q = d(f.data, g);
                                e = b(q, y);
                                var t = [f];
                                a.each(e, function(b) {
                                    var d = [];
                                    a.each(t, function(e) {
                                        for (var f, g, h, k, l; e && e.data && "" !== e.data && (!a.traits.fastRegexp && (h = e.data.match(/^\s+/)) || (h = e.data.match(b))) && h.input !== f; )
                                            f = h.input,
                                                g = h.slice(1).join(""),
                                                k = c.normalizePhrase(g),
                                                g = P(e, h),
                                            g.previous && g.previous.data && d.push(g.previous),
                                                e = g.next,
                                                l = a.contains(q, k) ? k : "&!UNLINKED!&",
                                                k = v,
                                                g = g.match,
                                            k[l] || (k[l] = []),
                                                k[l].push(g);
                                        e && !h && d.push(e)
                                    }, {
                                        timeout: !0
                                    });
                                    t = d
                                })
                            }
                    }
                }()
                    , t = function(b) {
                    b = c.cache(b);
                    return a.map(b, function(a, b) {
                        return b
                    })
                }
                    , m = function(b, c, d, e) {
                    for (var f, g, h; c && c.data && "" !== c.data && (!a.traits.fastRegexp && (h = c.data.match(/^\s+/)) || (h = c.data.match(b))) && h.input !== f; )
                        f = h.input,
                            g = h.slice(1).join(""),
                            c = P(c, h),
                            w(c.match, g, d, e),
                            c = c.next
                }
                    , w = function() {
                    var b = function(b, c) {
                        if (b && "U" === b.type)
                            return !0;
                        b = !b || !k.per_phrase || !c[b.phrase] || c[b.phrase].count < k.per_phrase;
                        c = !k.per_page && 0 !== k.per_page || a.reduce(0, c, function(a, b) {
                            return a + ("U" !== b.type ? b.count : 0)
                        }) < k.per_page;
                        return b && c
                    }
                        , d = function(b, d, e) {
                        var f = !!n.opt("dynamic_scope")
                            , h = function() {
                            var d;
                            if (!e.phrase)
                                return !0;
                            if (k.proximity || k.same_proximity) {
                                var f = a.geometry(g);
                                a.find(c.cache(b), function(b) {
                                    var g;
                                    if (b.links) {
                                        if ((g = c.normalizePhrase(b.phrase) === c.normalizePhrase(e.phrase)) && !k.same_proximity || !g && !k.proximity)
                                            return !1;
                                        var h = g ? Math.max(k.same_proximity, k.proximity) : k.proximity;
                                        b.links = a.all(b.links, function(b) {
                                            var c = a.isInDom(b.el);
                                            !d && c && (d = a.find(b.segments, function(b) {
                                                b = b.geometry;
                                                b = a.extend({}, b);
                                                b.x1 -= h;
                                                b.y1 -= h;
                                                b.x2 += h;
                                                b.y2 += h;
                                                if (b.x1 < f.x2 && b.x2 > f.x1 && b.y1 < f.y2 && b.y2 > f.y1)
                                                    return !0
                                            }));
                                            return c
                                        });
                                        return d
                                    }
                                })
                            }
                            return !d
                        };
                        if (!d.parentNode)
                            return !1;
                        var g = a.createEl("span");
                        d.parentNode.insertBefore(g, d);
                        g.appendChild(d);
                        return function(a) {
                            g.parentNode.insertBefore(d, g);
                            g.parentNode.removeChild(g);
                            return a
                        }((!f || a.isVisible(g)) && h())
                    };
                    return function(e, f, g, h) {
                        h = h.stats;
                        var l = c.normalizePhrase(f);
                        l = f ? c.cache(l, g) : null;
                        f && !l && (l = {
                            url: f.match(/^https?:\/\//i) ? f : "http://" + f,
                            type: "U"
                        });
                        if (g = l && l.url.match(/https?:\/\//i) && f && b(l, h) && d(g, e, l)) {
                            var m;
                            k.link_headings || !(m = a.css(e.parentElement, "font-size")) ? g = !0 : (m = parseFloat(m),
                                g = 0 >= m || m / a.page.font_size < k.heading_threshold)
                        }
                        if (g && (g = l,
                            m = a.createEl("a"),
                            m.innerHTML = f.replace(/([a-z0-9]+ *|[^a-z0-9]+)/ig, "<span>$1</span>"),
                            m.className = "vglnk",
                            a.cache(m, "type", "inserted"),
                            a.cache(m, "phrase", f),
                        k.ui && "U" !== g.type && (m.title = "Link added by VigLink"),
                            c.initLink(m, g),
                        !a.cache(m, "unlinked") && !n.isBlacklisted(m))) {
                            f = e.parentNode;
                            f.insertBefore(m, e);
                            f.removeChild(e);
                            e = l;
                            f = {
                                el: m,
                                segments: []
                            };
                            var q = m.getElementsByTagName("span")
                                , t = {
                                els: []
                            };
                            m = 0;
                            for (g = q.length; m < g; m++) {
                                var v = q[m];
                                void 0 === u || v.offsetTop === u.offsetTop ? t.els.push(v) : (f.segments.push(t),
                                    t = {
                                        els: [v]
                                    });
                                var u = v
                            }
                            t.geometry = a.geometry.apply(a, t.els);
                            f.segments.push(t);
                            e.links = e.links || [];
                            e.links.push(f);
                            u = l.phrase || l.url;
                            h[u] = h[u] || {
                                count: 0,
                                iid: l.iid,
                                imp: l.imp,
                                phrase: l.phrase,
                                url: l.url,
                                type: l.type
                            };
                            h[u].count++
                        }
                    }
                }()
                    , P = function(a, b) {
                    var c = b.slice(1).join("");
                    b = b.index + b[0].length - c.length;
                    0 < b ? b = a.splitText(b) : (b = a,
                        a = null);
                    c = b.length <= c.length ? null : b.splitText(c.length);
                    return {
                        previous: a,
                        match: b,
                        next: c
                    }
                };
                return function(d, f) {
                    var h, l = {};
                    g.eventTimer.start("insert-run");
                    if (h = c.regexp(f))
                        (d = a.all(d, b)) && d.length && (l = e(h, d, f, !1)),
                        k.link_phrases && c.sendInsertedTerms(l);
                    g.eventTimer.stop("insert-run", !0);
                    z || (z = !0,
                        g.eventTimer.stop("insert-init-run", !0))
                }
            }(),
            insertManually: function() {
                var b = !1
                    , f = a.clone(k)
                    , g = function(b) {
                    return a.map(b, function(a, b) {
                        return {
                            iid: "00000000",
                            phrase: b,
                            type: "0",
                            url: a
                        }
                    })
                };
                return function(d, h, n) {
                    var l = !1;
                    e.init();
                    if (k.manual_mode && !b) {
                        b = !0;
                        var q = h = h || {};
                        k.same_proximity = q.same_proximity || k.same_proximity;
                        k.proximity = q.proximity || k.proximity;
                        k.per_page = q.per_page || k.per_page;
                        k.per_phrase = q.per_phrase || k.per_phrase;
                        q = h.target_node || document.body;
                        d = g(d);
                        c.loadPhrases(d, null, [q]);
                        k = f;
                        c.cache.reset();
                        l = !0;
                        b = !1
                    }
                    "function" === a.type(n) && n(l, q)
                }
            }(),
            loadPhrases: function(b, e, g, k) {
                a.each(b, function(a) {
                    a.phrase && a.url && a.iid && (a.phrase = c.normalizePhrase(a.phrase),
                        c.cache(a.phrase, {
                            auc: a.auc,
                            count: 0,
                            iid: a.iid,
                            imp: e,
                            phrase: a.phrase,
                            mid: a.mid,
                            url: a.url,
                            type: a.type || ""
                        }, e, k))
                });
                c.hasCalled(k, !0);
                this.insertLinks(g, k)
            },
            normalizePhrase: function(a) {
                return a.toLowerCase().replace(/(^\s+|\s+$)/g, "").split(/\s+/).join(" ")
            },
            onInsertApi: function(b, c, e) {
                g.eventTimer.stop("ins");
                "object" === a.type(b) && (w = b.exp,
                    q = b.imp_id,
                b.results && this.loadPhrases(b.results, q, c, e))
            },
            regexp: function(b) {
                b = c.cache(b);
                b = a.map(b, function(b, c) {
                    return a.escapeRegExp(c).split(" ").join("\\s+")
                });
                if (0 < b.length) {
                    var d = "(?:^|[\\s\"'\\(])(" + b.join("|") + ")(?=\\s|\\W*$|\\W{2})";
                    d = new RegExp(u ? "(?:" + d + "|" + u.source + ")" : d,"i")
                }
                return d || u
            },
            sendInsertedTerms: function(b) {
                b = a.map(b, function(a, b) {
                    return {
                        count: a.count,
                        phrase: b,
                        iid: a.iid,
                        impId: a.imp,
                        url: a.url,
                        type: a.type
                    }
                });
                b.length && n.apiNow("inserted", {
                    cat: k.cat,
                    exp: w,
                    terms: a.toJSON(b),
                    u: window.document.location.href,
                    v: "2.0"
                })
            }
        };
        var e = {
            init: a.destructing(a.bind(c.init, c)),
            initNodes: function(d) {
                var e = []
                    , g = []
                    , l = [];
                c.enabled() && (k.scope ? (a.each(d, function(b) {
                    var c = a.withScope([b], k.scope, {
                        ancestors: !0,
                        consolidate: !0,
                        descendants: !1,
                        self: !0
                    });
                    c.length ? (l.push(b),
                        g = g.concat(c)) : (b = a.withScope([b], k.scope, {
                        ancestors: !1,
                        consolidate: !0,
                        descendants: !0,
                        self: !1
                    }),
                    b.length && (l = l.concat(b),
                        g = g.concat(b)))
                }, {
                    timeout: !0
                }),
                    l = a.unique(l),
                    g = a.unique(g)) : g = l = d,
                n.opt("dynamic_scope") && (l = a.all(l, function(b) {
                    return !a.matches(b, ":has(a.vglnk)")
                }, {
                    timeout: !0
                })),
                l.length && (g.length && (e = b.getPostIds(g)),
                    k.link_phrases && !c.hasCalled(e) ? c.getPhrases(l, e) : c.insertLinks(l, e)))
            }
        };
        k.manual_mode && a.extend(e, {
            "public": {
                run: c.insertManually
            }
        });
        return e
    }
}
;
window.vglnk = window.vglnk || {};
window.vglnk.partners_plugin = function(k, a, n) {
    k = a.extend({
        log_links: !0,
        log_status: !1,
        pai_type: null,
        sync_type: null,
        scope: "body"
    }, k);
    var g = {
        initLinkLogger: function() {
            n.registerProcessor(function(g) {
                n.sendLinks("optimize", {
                    desc: a.page.description,
                    links: [g.href],
                    mode: ["P"],
                    title: a.page.title,
                    u: a.context(g).document.location.href,
                    ver: n.opt("links_version")
                }, {
                    jsonp: !1
                })
            }, {
                scope: k.scope
            })
        },
        logStatus: function(g) {
            a.createEl("img").src = a.updateUrl(n.opt("sync_url"), {
                pathname: "/api/sync/status.gif",
                search: "?" + a.toQuery({
                    st: g
                })
            })
        },
        run: function() {
            k.log_links && !n.opt("data_observer") && g.initLinkLogger();
            k.pai_type ? g.sync("partner", k.pai_type) : k.sync_type && g.sync(k.sync_type)
        },
        sync: function() {
            return function(u, w) {
                var z = "pixel";
                if ("partner" === u)
                    if (a.isArray(w) && w.length) {
                        var q = {
                            partner_id: w.shift(),
                            gdprApplies: a.consent().gdprApplies,
                            gdprConsent: a.consent().gdprConsent,
                            ccpaConsent: a.consent().ccpaConsent
                        };
                        var b = "/api/sync.gif"
                    } else
                        return;
                else if (a.contains(["pixel", "script"], u))
                    w = null,
                        q = {
                            key: n.opt("key"),
                            gdprApplies: a.consent().gdprApplies,
                            gdprConsent: a.consent().gdprConsent,
                            ccpaConsent: a.consent().ccpaConsent
                        },
                        "pixel" === u ? b = "/api/sync.gif" : (z = "script",
                            b = "/api/sync.js");
                else
                    return;
                q = a.updateUrl(n.opt("sync_url"), {
                    pathname: b,
                    search: "?" + a.toQuery(q)
                });
                k.log_status && g.logStatus("bg");
                "script" === z ? (g.sync("pixel", w),
                    a.jsonp(q)) : (z = a.createEl("img"),
                    a.on(z, "load", function() {
                        var a = w;
                        k.log_status && g.logStatus("su");
                        a && g.sync(u, a)
                    }),
                    a.on(z, "error", function() {
                        var a = w;
                        k.log_status && g.logStatus("fa");
                        a && g.sync(u, a)
                    }),
                    z.src = q)
            }
        }()
    };
    return {
        init: function() {
            g.run()
        }
    }
}
;
