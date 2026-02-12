 var lijitData = {
    cdmn: 'pxdrop.lijit.com',
    lm: 'd',
    tt: 't.dhj'
};
    !function(a) {
    a.cls = 'commerce';
    a.dmn = '';
    a.GDPR_v2 = 'CQaJ9gAQaJ9gAAGABCENCCFsAP_gAEPgAAwIKoNB5G5cSXFBMDJ3YJsgaIQXw1Bg4MAhBgIBAwAASJIAJJQG1EESJAiIAiACAAIAIEABAAAAEABAQAAAIIABIACEAEAAAAACIAAAAEABQgAAAAAMAQAAUAAAAEBQEhAggAAEYBIASFQAQgAABQAACECFAACAAAAAAAAAQAAAAAAAgIAAAAAAAAAAAAQAQBAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAACAAgAABA3SAuAAoAC4AKgAXAAyAEcAJwAcgA5wB3AEIAIiARwAn4BigDtgJiAUgAtQBcwDFgG0AN0AQCQJAAFwAUABUAC4AHAAPAAggBkAGgATAAqgBvAD8AIQARIAjgBWgDKAHcAP0AgABFACMAEiAJMAYoA2gB7QE0gKPAXmAw0BkgDJwGXANYAbeA5MIAFABIARwAlIB1QD-iAAIAJBQAEA6owACAdUdAlAAXABQAFQAOAAgABdADIANAAmABVADEAG8APwAowBWgDKAGiAP2AigCLAEYAJEASYAxQBtAD2gJkATTAo8CkAFWALtAXmAw0BkgDJ4GWAZcA1gBt4DkwH9jwAIBERwAgAEgAUACAAEcAJSAdUA_oC2SEBAABYAFAAXABVADEAG8APwA7gCKAEpAMUAbQBNICrAGTgP7IAAwCOAHVAZ4SgJAALAAoABwAJgAVQAxACJAEcAKMAVoBigFHgKaAXmAyQBk4DWAG3kgAwAJACAAEcAOqAywBnhSBEAAuACgAKgAcABAADQAJgAVQAxAB-AESAKMAVoAygBogD9AIsARgAkQBtAD2gJpAUgApoBVgC7QF5gMNAZIAyeBlgGXANYAbeA5MB_ZUACAAooAJABIAFAALYBAACOAEpALqAdUBnhaAGAO4BTQCrAAAA.YAAAAAAAAAAA';
    a.us_privacy = '';
    a.pubid = '602878';
    a.gpp = '';
    a.gpp_sid = '[]';
}(lijitData);
    function _pxTagInject(p, d, w, l) {
    var o, k = [],
    t = p.tt.slice(-1),
    x = {
    cdmn: 1,
    lm: 1,
    tt: 1
},
    y = {
    cid: 1,
    cls: 1,
    dmn: 1,
    GDPR_v2: 1,
    us_privacy: 1,
    pubid: 1,
    gpp: 1,
    gpp_sid: 1,
    evid: 1,
    aq_m: 1
};
    p.dmn = (p.dmn || (w.top[l] === w[l] ? '' + w[l] : d.referrer).split('/')[2]).split(':')[0];
    for (o in p) {
    if (y[o] || ((t != 'j' || p.aq_m) && !x[o])) {
    k.push(o + "=" + p[o]);
};
};
    var s = d.createElement(t == 'f' ? 'img' : 'script');
    s.id = s.title = 'lijitscrpt';
    s.async = s.defer = !0;
    s.src = '//' + p.cdmn + '/1/' + p.lm + '/' + p.tt + '?' + k.join("&");
    d.body.appendChild(s);
}
    _pxTagInject(lijitData, document, window, 'location');