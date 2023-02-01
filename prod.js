a._gppConsent = function () {
    var b, c, e, d = {
        configureGppConsent: function () {
            this.lookupGppConsent(function (a) {
                b = a.gppString;
                c && window.removeEventListener("message", c, !1)
            }, function () {
                c && window.removeEventListener("message", c, !1)
            })
        }, callCmpWhileInIframe: function (a,
                                           b, d) {
            var f = {}, h = Math.random().toString(), k = {};
            k.__gppCall = {command: a, parameter: null, callId: h};
            f[h] = function (a) {
                if ("sectionChange" === a.eventName || "loaded" === a.pingData.cmpStatus && "visible" !== a.pingData.cmpDisplayStatus) h = Math.random().toString(), k.__gppCall = {
                    command: "getGPPData",
                    parameter: null,
                    callId: h
                }, f[h] = d, b.postMessage(k, "*")
            };
            b.postMessage(k, "*");
            e = function (a) {
                var b = {};
                try {
                    b = "string" === typeof a.data ? JSON.parse(a.data) : a.data
                } catch (ja) {
                }
                if (b.__gppReturn && b.__gppReturn.callId && (a = b.__gppReturn,
                "function" === typeof f[a.callId])) f[a.callId](a.returnValue)
            };
            window.addEventListener("message", e, !1);
            c = e
        }, lookupGppConsent: function (a, b) {
            var c = function (a) {
                a.data ? "sectionChange" === a.eventName || "loaded" === a.pingData.cmpStatus && "visible" !== a.pingData.cmpDisplayStatus ? (a = h("getGPPData", null, null, null), d(a)) : b("CMP unable to register callback function. Please check CMP setup.") : b("CMP response is not ready yet")
            }, d = function (c) {
                null !== c && c.gppString ? a(c) : b("Consent string is not available")
            }, e = function () {
                for (var a =
                    window, b, c; !b;) {
                    try {
                        if ("function" === typeof a.__gpp) {
                            c = a.__gpp;
                            b = a;
                            break
                        }
                    } catch (y) {
                    }
                    try {
                        if (a.frames.__gppLocator) {
                            b = a;
                            break
                        }
                    } catch (y) {
                    }
                    if (a === window.top) break;
                    if ("undefined" !== typeof a && "undefined" !== typeof a.parent) a = a.parent; else break
                }
                return [b, c]
            }(), f = e[0], h = e[1];
            if (!f) return b("CMP not found");
            "function" === typeof h ? h("addEventListener", c, null, null) : this.callCmpWhileInIframe("addEventListener", f, d)
        }
    };
    a.exceptionLogger(a.bind(d.configureGppConsent, d))();
    return function () {
        return {gppConsent: b}
    }
}