var $e = ((e) =>
    typeof require < 'u'
        ? require
        : typeof Proxy < 'u'
        ? new Proxy(e, {
              get: (t, r) => (typeof require < 'u' ? require : t)[r],
          })
        : e)(function (e) {
    if (typeof require < 'u') return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e + '" is not supported');
});
var b = {
        HIGHLIGHT_COLOR: '#0da2e7',
        HIGHLIGHT_BG: '#0da2e71a',
        ALLOWED_ORIGINS: ['http://localhost:3000'],
        DEBOUNCE_DELAY: 10,
        Z_INDEX: 1e4,
        TOOLTIP_OFFSET: 25,
        MAX_TOOLTIP_WIDTH: 200,
        SCROLL_DEBOUNCE: 420,
        FULL_WIDTH_TOOLTIP_OFFSET: '12px',
        HIGHLIGHT_STYLE: {
            FULL_WIDTH: { OFFSET: '-5px', STYLE: 'solid' },
            NORMAL: { OFFSET: '0', STYLE: 'solid' },
        },
        SELECTED_ATTR: 'data-lov-selected',
        HOVERED_ATTR: 'data-lov-hovered',
        OVERRIDE_STYLESHEET_ID: 'lovable-override',
    },
    D = (e) => {
        b.ALLOWED_ORIGINS.forEach((t) => {
            try {
                if (!window.parent) return;
                if (!e || typeof e != 'object') {
                    console.error('Invalid message format');
                    return;
                }
                window.parent.postMessage(e, t);
            } catch (r) {
                console.error(`Failed to send message to ${t}:`, r);
            }
        });
    },
    mr = () =>
        new Promise((e) => {
            if (document.readyState !== 'loading') {
                e();
                return;
            }
            requestIdleCallback(() => {
                e();
            });
        }),
    St = async () => {
        await mr();
        let e = import.meta.hot;
        return (
            e &&
                (await new Promise((t) => {
                    let r = () => {
                        if (!e.data.pending) {
                            t();
                            return;
                        }
                        setTimeout(r, 50);
                    };
                    r();
                })),
            window.__REACT_SUSPENSE_DONE &&
                (await window.__REACT_SUSPENSE_DONE),
            !0
        );
    },
    et = () =>
        new Promise((e) => {
            let t = document.getElementById('root');
            if (t && t.children.length > 0) {
                e();
                return;
            }
            new MutationObserver((o, n) => {
                let i = document.getElementById('root');
                i && i.children.length > 0 && (n.disconnect(), e());
            }).observe(document.body, { childList: !0, subtree: !0 });
        });
var hr = () => {
        let e = window.fetch;
        window.fetch = async function (...t) {
            let r = Date.now();
            try {
                let o;
                if (t?.[1]?.body)
                    try {
                        typeof t[1].body == 'string'
                            ? (o = t[1].body)
                            : t[1].body instanceof FormData
                            ? (o =
                                  'FormData: ' +
                                  Array.from(t[1].body.entries())
                                      .map(([l, a]) => `${l}=${a}`)
                                      .join('&'))
                            : t[1].body instanceof URLSearchParams
                            ? (o = t[1].body.toString())
                            : (o = JSON.stringify(t[1].body));
                    } catch {
                        o = 'Could not serialize request body';
                    }
                let n = await e(...t),
                    i;
                try {
                    n.clone && (i = await n.clone().text());
                } catch (l) {
                    i = `[Clone failed: ${
                        l instanceof Error ? l.message : 'Unknown error'
                    }]`;
                }
                return (
                    D({
                        type: 'NETWORK_REQUEST',
                        request: {
                            url: t?.[0] || n.url,
                            method: t?.[1]?.method || 'GET',
                            status: n.status,
                            statusText: n.statusText,
                            responseBody: i,
                            requestBody: o,
                            timestamp: new Date().toISOString(),
                            duration: Date.now() - r,
                            origin: window.location.origin,
                            headers: t?.[1]?.headers
                                ? Object.fromEntries(
                                      new Headers(t?.[1]?.headers)
                                  )
                                : {},
                        },
                    }),
                    n
                );
            } catch (o) {
                let n;
                if (t?.[1]?.body)
                    try {
                        typeof t[1].body == 'string'
                            ? (n = t[1].body)
                            : t[1].body instanceof FormData
                            ? (n =
                                  'FormData: ' +
                                  Array.from(t[1].body.entries())
                                      .map(([a, s]) => `${a}=${s}`)
                                      .join('&'))
                            : t[1].body instanceof URLSearchParams
                            ? (n = t[1].body.toString())
                            : (n = JSON.stringify(t[1].body));
                    } catch {
                        n = 'Could not serialize request body';
                    }
                let i = {
                        url: t?.[0],
                        method: t?.[1]?.method || 'GET',
                        origin: window.location.origin,
                        timestamp: new Date().toISOString(),
                        duration: Date.now() - r,
                        headers: t?.[1]?.headers
                            ? Object.fromEntries(new Headers(t?.[1]?.headers))
                            : {},
                        requestBody: n,
                    },
                    l =
                        o instanceof TypeError
                            ? {
                                  ...i,
                                  error: {
                                      message: o?.message || 'Unknown error',
                                      stack: o?.stack,
                                  },
                              }
                            : {
                                  ...i,
                                  error: {
                                      message:
                                          o &&
                                          typeof o == 'object' &&
                                          'message' in o &&
                                          typeof o.message == 'string'
                                              ? o.message
                                              : 'Unknown fetch error',
                                      stack:
                                          o &&
                                          typeof o == 'object' &&
                                          'stack' in o &&
                                          typeof o.stack == 'string'
                                              ? o.stack
                                              : 'Not available',
                                  },
                              };
                throw (D({ type: 'NETWORK_REQUEST', request: l }), o);
            }
        };
    },
    gr = () => {
        let e = document.querySelector('div#root');
        return e ? e.childElementCount === 0 : !1;
    },
    bt = (() => {
        let e = !1,
            t = ({
                message: r,
                lineno: o,
                colno: n,
                filename: i,
                error: l,
            }) => ({
                message: r,
                lineno: o,
                colno: n,
                filename: i,
                stack: l?.stack,
            });
        return () => {
            if (e) return;
            let r = new Set(),
                o = (l) => {
                    let { lineno: a, colno: s, filename: c, message: d } = l;
                    return `${d}|${c}|${a}|${s}`;
                };
            hr();
            let n = (l) =>
                    r.has(l)
                        ? !0
                        : (r.add(l), setTimeout(() => r.delete(l), 5e3), !1),
                i = (l) => {
                    let a = o(l);
                    if (n(a)) return;
                    let s = t(l);
                    D({
                        type: 'RUNTIME_ERROR',
                        error: { ...s, blankScreen: gr() },
                    });
                };
            window.addEventListener('error', i),
                window.addEventListener('unhandledrejection', (l) => {
                    if (!l.reason?.stack) return;
                    let a =
                        l.reason?.stack ||
                        l.reason?.message ||
                        String(l.reason);
                    if (n(a)) return;
                    let s = {
                        message:
                            l.reason?.message || 'Unhandled promise rejection',
                        stack: l.reason?.stack || String(l.reason),
                    };
                    D({ type: 'UNHANDLED_PROMISE_REJECTION', error: s });
                }),
                (e = !0);
        };
    })();
var tt = class {
        constructor(t) {
            this.message = `[Circular Reference to ${t}]`;
        }
    },
    P = class {
        constructor(t, r) {
            (this._type = t), (this.value = r);
        }
    },
    yr = {
        maxDepth: 10,
        indent: 2,
        includeSymbols: !0,
        preserveTypes: !0,
        maxStringLength: 1e4,
        maxArrayLength: 100,
        maxObjectKeys: 100,
    };
function le(e, t = {}, r = new WeakMap(), o = 'root') {
    let n = { ...yr, ...t };
    if (o.split('.').length > n.maxDepth)
        return new P('MaxDepthReached', `[Max depth of ${n.maxDepth} reached]`);
    if (e === void 0) return new P('undefined', 'undefined');
    if (e === null) return null;
    if (typeof e == 'string')
        return e.length > n.maxStringLength
            ? new P(
                  'String',
                  `${e.slice(0, n.maxStringLength)}... [${
                      e.length - n.maxStringLength
                  } more characters]`
              )
            : e;
    if (typeof e == 'number')
        return Number.isNaN(e)
            ? new P('Number', 'NaN')
            : Number.isFinite(e)
            ? e
            : new P('Number', e > 0 ? 'Infinity' : '-Infinity');
    if (typeof e == 'boolean') return e;
    if (typeof e == 'bigint') return new P('BigInt', e.toString());
    if (typeof e == 'symbol') return new P('Symbol', e.toString());
    if (typeof e == 'function')
        return new P('Function', {
            name: e.name || 'anonymous',
            stringValue: e.toString().slice(0, n.maxStringLength),
        });
    if (e && typeof e == 'object') {
        if (r.has(e)) return new tt(r.get(e));
        r.set(e, o);
    }
    if (e instanceof Error) {
        let s = { name: e.name, message: e.message, stack: e.stack };
        for (let c of Object.getOwnPropertyNames(e))
            s[c] || (s[c] = le(e[c], n, r, `${o}.${c}`));
        return new P('Error', s);
    }
    if (e instanceof Date)
        return new P('Date', {
            iso: e.toISOString(),
            value: e.valueOf(),
            local: e.toString(),
        });
    if (e instanceof RegExp)
        return new P('RegExp', {
            source: e.source,
            flags: e.flags,
            string: e.toString(),
        });
    if (e instanceof Promise) return new P('Promise', '[Promise]');
    if (e instanceof WeakMap || e instanceof WeakSet)
        return new P(e.constructor.name, '[' + e.constructor.name + ']');
    if (e instanceof Set) {
        let s = Array.from(e);
        return s.length > n.maxArrayLength
            ? new P('Set', {
                  values: s
                      .slice(0, n.maxArrayLength)
                      .map((c, d) => le(c, n, r, `${o}.Set[${d}]`)),
                  truncated: s.length - n.maxArrayLength,
              })
            : new P('Set', {
                  values: s.map((c, d) => le(c, n, r, `${o}.Set[${d}]`)),
              });
    }
    if (e instanceof Map) {
        let s = {},
            c = 0,
            d = 0;
        for (let [f, m] of e.entries()) {
            if (d >= n.maxObjectKeys) {
                c++;
                continue;
            }
            let g =
                typeof f == 'object'
                    ? JSON.stringify(le(f, n, r, `${o}.MapKey`))
                    : String(f);
            (s[g] = le(m, n, r, `${o}.Map[${g}]`)), d++;
        }
        return new P('Map', { entries: s, truncated: c || void 0 });
    }
    if (ArrayBuffer.isView(e)) {
        let s = e;
        return new P(e.constructor.name, {
            length: s.length,
            byteLength: s.byteLength,
            sample: Array.from(s.slice(0, 10)),
        });
    }
    if (Array.isArray(e))
        return e.length > n.maxArrayLength
            ? e
                  .slice(0, n.maxArrayLength)
                  .map((s, c) => le(s, n, r, `${o}[${c}]`))
                  .concat([`... ${e.length - n.maxArrayLength} more items`])
            : e.map((s, c) => le(s, n, r, `${o}[${c}]`));
    let i = {},
        l = [...Object.getOwnPropertyNames(e)];
    n.includeSymbols &&
        l.push(...Object.getOwnPropertySymbols(e).map((s) => s.toString()));
    let a = 0;
    return (
        l.slice(0, n.maxObjectKeys).forEach((s) => {
            try {
                let c = e[s];
                i[s] = le(c, n, r, `${o}.${s}`);
            } catch (c) {
                i[s] = new P('Error', `[Unable to serialize: ${c.message}]`);
            }
        }),
        l.length > n.maxObjectKeys &&
            ((a = l.length - n.maxObjectKeys),
            (i['...'] = `${a} more properties`)),
        i
    );
}
var Ir = { log: console.log, warn: console.warn, error: console.error },
    Cr = { log: 'info', warn: 'warning', error: 'error' },
    vt = (() => {
        let e = !1,
            t = [],
            r = null,
            o = 250,
            n = () => {
                if (t.length === 0) {
                    r = null;
                    return;
                }
                let i = [...t];
                (t.length = 0),
                    (r = null),
                    D({ type: 'CONSOLE_OUTPUT', messages: i });
            };
        return () => {
            if (e) return;
            let i = (l) => {
                console[l] = (...a) => {
                    Ir[l].apply(console, a);
                    let s = null;
                    if (l === 'warn' || l === 'error') {
                        let m = new Error();
                        m.stack &&
                            (s = m.stack
                                .split(
                                    `
`
                                )
                                .slice(2).join(`
`));
                    }
                    let c = a.map((m) =>
                            le(m, {
                                maxDepth: 5,
                                includeSymbols: !0,
                                preserveTypes: !0,
                            })
                        ),
                        d =
                            c
                                .map((m) =>
                                    typeof m == 'string'
                                        ? m
                                        : JSON.stringify(m, null, 2).slice(
                                              0,
                                              1e4
                                          )
                                )
                                .join(' ') +
                            (s
                                ? `
` + s
                                : ''),
                        f = {
                            level: Cr[l],
                            message: d.slice(0, 1e4),
                            logged_at: new Date().toISOString(),
                            raw: c,
                        };
                    t.push(f), r === null && (r = setTimeout(n, o));
                };
            };
            i('log'), i('warn'), i('error'), (e = !0);
        };
    })();
var Et = () => {
    let e = (t) => {
        !t?.origin ||
            !t?.data?.type ||
            !b.ALLOWED_ORIGINS.includes(t.origin) ||
            (t.data.type === 'NAVIGATE' &&
                (t.data.direction === 'back'
                    ? window.history.back()
                    : t.data.direction === 'forward' &&
                      window.history.forward()));
    };
    window.addEventListener('message', e);
};
var At = () => {
    let e = () => {
        let t = document.location.href,
            r = document.querySelector('body'),
            o = new MutationObserver(() => {
                t !== document.location.href &&
                    ((t = document.location.href),
                    window.top &&
                        (window.top.postMessage({
                            type: 'URL_CHANGED',
                            url: document.location.href,
                        }),
                        window.top.postMessage(
                            {
                                type: 'URL_CHANGED',
                                url: document.location.href,
                            },
                            'http://localhost:3000'
                        )));
            });
        r && o.observe(r, { childList: !0, subtree: !0 });
    };
    window.addEventListener('load', e);
};
var Y;
(function (e) {
    (e[(e.Document = 0)] = 'Document'),
        (e[(e.DocumentType = 1)] = 'DocumentType'),
        (e[(e.Element = 2)] = 'Element'),
        (e[(e.Text = 3)] = 'Text'),
        (e[(e.CDATA = 4)] = 'CDATA'),
        (e[(e.Comment = 5)] = 'Comment');
})(Y || (Y = {}));
function Sr(e) {
    return e.nodeType === e.ELEMENT_NODE;
}
function ge(e) {
    var t = e?.host;
    return t?.shadowRoot === e;
}
function me(e) {
    return Object.prototype.toString.call(e) === '[object ShadowRoot]';
}
function br(e) {
    return (
        e.includes(' background-clip: text;') &&
            !e.includes(' -webkit-background-clip: text;') &&
            (e = e.replace(
                ' background-clip: text;',
                ' -webkit-background-clip: text; background-clip: text;'
            )),
        e
    );
}
function rt(e) {
    try {
        var t = e.rules || e.cssRules;
        return t ? br(Array.from(t).map(ot).join('')) : null;
    } catch {
        return null;
    }
}
function ot(e) {
    var t = e.cssText;
    if (vr(e))
        try {
            t = rt(e.styleSheet) || t;
        } catch {}
    return t;
}
function vr(e) {
    return 'styleSheet' in e;
}
var Lt = (function () {
    function e() {
        (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
    }
    return (
        (e.prototype.getId = function (t) {
            var r;
            if (!t) return -1;
            var o =
                (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id;
            return o ?? -1;
        }),
        (e.prototype.getNode = function (t) {
            return this.idNodeMap.get(t) || null;
        }),
        (e.prototype.getIds = function () {
            return Array.from(this.idNodeMap.keys());
        }),
        (e.prototype.getMeta = function (t) {
            return this.nodeMetaMap.get(t) || null;
        }),
        (e.prototype.removeNodeFromMap = function (t) {
            var r = this,
                o = this.getId(t);
            this.idNodeMap.delete(o),
                t.childNodes &&
                    t.childNodes.forEach(function (n) {
                        return r.removeNodeFromMap(n);
                    });
        }),
        (e.prototype.has = function (t) {
            return this.idNodeMap.has(t);
        }),
        (e.prototype.hasNode = function (t) {
            return this.nodeMetaMap.has(t);
        }),
        (e.prototype.add = function (t, r) {
            var o = r.id;
            this.idNodeMap.set(o, t), this.nodeMetaMap.set(t, r);
        }),
        (e.prototype.replace = function (t, r) {
            var o = this.getNode(t);
            if (o) {
                var n = this.nodeMetaMap.get(o);
                n && this.nodeMetaMap.set(r, n);
            }
            this.idNodeMap.set(t, r);
        }),
        (e.prototype.reset = function () {
            (this.idNodeMap = new Map()), (this.nodeMetaMap = new WeakMap());
        }),
        e
    );
})();
function kt() {
    return new Lt();
}
function Le(e) {
    var t = e.maskInputOptions,
        r = e.tagName,
        o = e.type,
        n = e.value,
        i = e.maskInputFn,
        l = n || '';
    return (
        (t[r.toLowerCase()] || t[o]) &&
            (i ? (l = i(l)) : (l = '*'.repeat(l.length))),
        l
    );
}
var Tt = '__rrweb_original__';
function Er(e) {
    var t = e.getContext('2d');
    if (!t) return !0;
    for (var r = 50, o = 0; o < e.width; o += r)
        for (var n = 0; n < e.height; n += r) {
            var i = t.getImageData,
                l = Tt in i ? i[Tt] : i,
                a = new Uint32Array(
                    l.call(
                        t,
                        o,
                        n,
                        Math.min(r, e.width - o),
                        Math.min(r, e.height - n)
                    ).data.buffer
                );
            if (
                a.some(function (s) {
                    return s !== 0;
                })
            )
                return !1;
        }
    return !0;
}
var Ar = 1,
    Tr = new RegExp('[^a-z0-9-_:]'),
    he = -2;
function nt() {
    return Ar++;
}
function wr(e) {
    if (e instanceof HTMLFormElement) return 'form';
    var t = e.tagName.toLowerCase().trim();
    return Tr.test(t) ? 'div' : t;
}
function Lr(e) {
    return e.cssRules
        ? Array.from(e.cssRules)
              .map(function (t) {
                  return t.cssText || '';
              })
              .join('')
        : '';
}
function kr(e) {
    var t = '';
    return (
        e.indexOf('//') > -1
            ? (t = e.split('/').slice(0, 3).join('/'))
            : (t = e.split('/')[0]),
        (t = t.split('?')[0]),
        t
    );
}
var Se,
    wt,
    Nr = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
    Mr = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
    Rr = /^(data:)([^,]*),(.*)/i;
function xe(e, t) {
    return (e || '').replace(Nr, function (r, o, n, i, l, a) {
        var s = n || l || a,
            c = o || i || '';
        if (!s) return r;
        if (!Mr.test(s) || Rr.test(s))
            return 'url('.concat(c).concat(s).concat(c, ')');
        if (s[0] === '/')
            return 'url('
                .concat(c)
                .concat(kr(t) + s)
                .concat(c, ')');
        var d = t.split('/'),
            f = s.split('/');
        d.pop();
        for (var m = 0, g = f; m < g.length; m++) {
            var p = g[m];
            p !== '.' && (p === '..' ? d.pop() : d.push(p));
        }
        return 'url('.concat(c).concat(d.join('/')).concat(c, ')');
    });
}
var Or = /^[^ \t\n\r\u000c]+/,
    xr = /^[, \t\n\r\u000c]+/;
function Dr(e, t) {
    if (t.trim() === '') return t;
    var r = 0;
    function o(c) {
        var d,
            f = c.exec(t.substring(r));
        return f ? ((d = f[0]), (r += d.length), d) : '';
    }
    for (var n = []; o(xr), !(r >= t.length); ) {
        var i = o(Or);
        if (i.slice(-1) === ',')
            (i = be(e, i.substring(0, i.length - 1))), n.push(i);
        else {
            var l = '';
            i = be(e, i);
            for (var a = !1; ; ) {
                var s = t.charAt(r);
                if (s === '') {
                    n.push((i + l).trim());
                    break;
                } else if (a) s === ')' && (a = !1);
                else if (s === ',') {
                    (r += 1), n.push((i + l).trim());
                    break;
                } else s === '(' && (a = !0);
                (l += s), (r += 1);
            }
        }
    }
    return n.join(', ');
}
function be(e, t) {
    if (!t || t.trim() === '') return t;
    var r = e.createElement('a');
    return (r.href = t), r.href;
}
function Fr(e) {
    return !!(e.tagName === 'svg' || e.ownerSVGElement);
}
function it() {
    var e = document.createElement('a');
    return (e.href = ''), e.href;
}
function st(e, t, r, o) {
    return r === 'src' ||
        (r === 'href' && o && !(t === 'use' && o[0] === '#')) ||
        (r === 'xlink:href' && o && o[0] !== '#') ||
        (r === 'background' && o && (t === 'table' || t === 'td' || t === 'th'))
        ? be(e, o)
        : r === 'srcset' && o
        ? Dr(e, o)
        : r === 'style' && o
        ? xe(o, it())
        : t === 'object' && r === 'data' && o
        ? be(e, o)
        : o;
}
function _r(e, t, r) {
    if (typeof t == 'string') {
        if (e.classList.contains(t)) return !0;
    } else
        for (var o = e.classList.length; o--; ) {
            var n = e.classList[o];
            if (t.test(n)) return !0;
        }
    return r ? e.matches(r) : !1;
}
function we(e, t, r) {
    if (!e) return !1;
    if (e.nodeType !== e.ELEMENT_NODE) return r ? we(e.parentNode, t, r) : !1;
    for (var o = e.classList.length; o--; ) {
        var n = e.classList[o];
        if (t.test(n)) return !0;
    }
    return r ? we(e.parentNode, t, r) : !1;
}
function at(e, t, r) {
    var o = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
    if (o === null) return !1;
    if (typeof t == 'string') {
        if (o.classList.contains(t) || o.closest('.'.concat(t))) return !0;
    } else if (we(o, t, !0)) return !0;
    return !!(r && (o.matches(r) || o.closest(r)));
}
function Wr(e, t, r) {
    var o = e.contentWindow;
    if (o) {
        var n = !1,
            i;
        try {
            i = o.document.readyState;
        } catch {
            return;
        }
        if (i !== 'complete') {
            var l = setTimeout(function () {
                n || (t(), (n = !0));
            }, r);
            e.addEventListener('load', function () {
                clearTimeout(l), (n = !0), t();
            });
            return;
        }
        var a = 'about:blank';
        if (o.location.href !== a || e.src === a || e.src === '')
            return setTimeout(t, 0), e.addEventListener('load', t);
        e.addEventListener('load', t);
    }
}
function Br(e, t, r) {
    var o = !1,
        n;
    try {
        n = e.sheet;
    } catch {
        return;
    }
    if (!n) {
        var i = setTimeout(function () {
            o || (t(), (o = !0));
        }, r);
        e.addEventListener('load', function () {
            clearTimeout(i), (o = !0), t();
        });
    }
}
function Gr(e, t) {
    var r = t.doc,
        o = t.mirror,
        n = t.blockClass,
        i = t.blockSelector,
        l = t.maskTextClass,
        a = t.maskTextSelector,
        s = t.inlineStylesheet,
        c = t.maskInputOptions,
        d = c === void 0 ? {} : c,
        f = t.maskTextFn,
        m = t.maskInputFn,
        g = t.dataURLOptions,
        p = g === void 0 ? {} : g,
        S = t.inlineImages,
        k = t.recordCanvas,
        T = t.keepIframeSrcFn,
        I = t.newlyAddedElement,
        y = I === void 0 ? !1 : I,
        R = Hr(r, o);
    switch (e.nodeType) {
        case e.DOCUMENT_NODE:
            return e.compatMode !== 'CSS1Compat'
                ? { type: Y.Document, childNodes: [], compatMode: e.compatMode }
                : { type: Y.Document, childNodes: [] };
        case e.DOCUMENT_TYPE_NODE:
            return {
                type: Y.DocumentType,
                name: e.name,
                publicId: e.publicId,
                systemId: e.systemId,
                rootId: R,
            };
        case e.ELEMENT_NODE:
            return Ur(e, {
                doc: r,
                blockClass: n,
                blockSelector: i,
                inlineStylesheet: s,
                maskInputOptions: d,
                maskInputFn: m,
                dataURLOptions: p,
                inlineImages: S,
                recordCanvas: k,
                keepIframeSrcFn: T,
                newlyAddedElement: y,
                rootId: R,
            });
        case e.TEXT_NODE:
            return Pr(e, {
                maskTextClass: l,
                maskTextSelector: a,
                maskTextFn: f,
                rootId: R,
            });
        case e.CDATA_SECTION_NODE:
            return { type: Y.CDATA, textContent: '', rootId: R };
        case e.COMMENT_NODE:
            return {
                type: Y.Comment,
                textContent: e.textContent || '',
                rootId: R,
            };
        default:
            return !1;
    }
}
function Hr(e, t) {
    if (t.hasNode(e)) {
        var r = t.getId(e);
        return r === 1 ? void 0 : r;
    }
}
function Pr(e, t) {
    var r,
        o = t.maskTextClass,
        n = t.maskTextSelector,
        i = t.maskTextFn,
        l = t.rootId,
        a = e.parentNode && e.parentNode.tagName,
        s = e.textContent,
        c = a === 'STYLE' ? !0 : void 0,
        d = a === 'SCRIPT' ? !0 : void 0;
    if (c && s) {
        try {
            e.nextSibling ||
                e.previousSibling ||
                (!((r = e.parentNode.sheet) === null || r === void 0) &&
                    r.cssRules &&
                    (s = Lr(e.parentNode.sheet)));
        } catch (f) {
            console.warn(
                "Cannot get CSS styles from text's parentNode. Error: ".concat(
                    f
                ),
                e
            );
        }
        s = xe(s, it());
    }
    return (
        d && (s = 'SCRIPT_PLACEHOLDER'),
        !c &&
            !d &&
            s &&
            at(e, o, n) &&
            (s = i ? i(s) : s.replace(/[\S]/g, '*')),
        { type: Y.Text, textContent: s || '', isStyle: c, rootId: l }
    );
}
function Ur(e, t) {
    for (
        var r = t.doc,
            o = t.blockClass,
            n = t.blockSelector,
            i = t.inlineStylesheet,
            l = t.maskInputOptions,
            a = l === void 0 ? {} : l,
            s = t.maskInputFn,
            c = t.dataURLOptions,
            d = c === void 0 ? {} : c,
            f = t.inlineImages,
            m = t.recordCanvas,
            g = t.keepIframeSrcFn,
            p = t.newlyAddedElement,
            S = p === void 0 ? !1 : p,
            k = t.rootId,
            T = _r(e, o, n),
            I = wr(e),
            y = {},
            R = e.attributes.length,
            J = 0;
        J < R;
        J++
    ) {
        var U = e.attributes[J];
        y[U.name] = st(r, I, U.name, U.value);
    }
    if (I === 'link' && i) {
        var K = Array.from(r.styleSheets).find(function (re) {
                return re.href === e.href;
            }),
            x = null;
        K && (x = rt(K)),
            x && (delete y.rel, delete y.href, (y._cssText = xe(x, K.href)));
    }
    if (
        I === 'style' &&
        e.sheet &&
        !(e.innerText || e.textContent || '').trim().length
    ) {
        var x = rt(e.sheet);
        x && (y._cssText = xe(x, it()));
    }
    if (I === 'input' || I === 'textarea' || I === 'select') {
        var j = e.value,
            u = e.checked;
        y.type !== 'radio' &&
        y.type !== 'checkbox' &&
        y.type !== 'submit' &&
        y.type !== 'button' &&
        j
            ? (y.value = Le({
                  type: y.type,
                  tagName: I,
                  value: j,
                  maskInputOptions: a,
                  maskInputFn: s,
              }))
            : u && (y.checked = u);
    }
    if (
        (I === 'option' &&
            (e.selected && !a.select ? (y.selected = !0) : delete y.selected),
        I === 'canvas' && m)
    ) {
        if (e.__context === '2d')
            Er(e) || (y.rr_dataURL = e.toDataURL(d.type, d.quality));
        else if (!('__context' in e)) {
            var C = e.toDataURL(d.type, d.quality),
                v = document.createElement('canvas');
            (v.width = e.width), (v.height = e.height);
            var h = v.toDataURL(d.type, d.quality);
            C !== h && (y.rr_dataURL = C);
        }
    }
    if (I === 'img' && f) {
        Se || ((Se = r.createElement('canvas')), (wt = Se.getContext('2d')));
        var E = e,
            A = E.crossOrigin;
        E.crossOrigin = 'anonymous';
        var L = function () {
            try {
                (Se.width = E.naturalWidth),
                    (Se.height = E.naturalHeight),
                    wt.drawImage(E, 0, 0),
                    (y.rr_dataURL = Se.toDataURL(d.type, d.quality));
            } catch (re) {
                console.warn(
                    'Cannot inline img src='
                        .concat(E.currentSrc, '! Error: ')
                        .concat(re)
                );
            }
            A ? (y.crossOrigin = A) : E.removeAttribute('crossorigin');
        };
        E.complete && E.naturalWidth !== 0 ? L() : (E.onload = L);
    }
    if (
        ((I === 'audio' || I === 'video') &&
            ((y.rr_mediaState = e.paused ? 'paused' : 'played'),
            (y.rr_mediaCurrentTime = e.currentTime)),
        S ||
            (e.scrollLeft && (y.rr_scrollLeft = e.scrollLeft),
            e.scrollTop && (y.rr_scrollTop = e.scrollTop)),
        T)
    ) {
        var W = e.getBoundingClientRect(),
            V = W.width,
            z = W.height;
        y = {
            class: y.class,
            rr_width: ''.concat(V, 'px'),
            rr_height: ''.concat(z, 'px'),
        };
    }
    return (
        I === 'iframe' &&
            !g(y.src) &&
            (e.contentDocument || (y.rr_src = y.src), delete y.src),
        {
            type: Y.Element,
            tagName: I,
            attributes: y,
            childNodes: [],
            isSVG: Fr(e) || void 0,
            needBlock: T,
            rootId: k,
        }
    );
}
function F(e) {
    return e === void 0 ? '' : e.toLowerCase();
}
function Vr(e, t) {
    if (t.comment && e.type === Y.Comment) return !0;
    if (e.type === Y.Element) {
        if (
            t.script &&
            (e.tagName === 'script' ||
                (e.tagName === 'link' &&
                    e.attributes.rel === 'preload' &&
                    e.attributes.as === 'script') ||
                (e.tagName === 'link' &&
                    e.attributes.rel === 'prefetch' &&
                    typeof e.attributes.href == 'string' &&
                    e.attributes.href.endsWith('.js')))
        )
            return !0;
        if (
            t.headFavicon &&
            ((e.tagName === 'link' && e.attributes.rel === 'shortcut icon') ||
                (e.tagName === 'meta' &&
                    (F(e.attributes.name).match(
                        /^msapplication-tile(image|color)$/
                    ) ||
                        F(e.attributes.name) === 'application-name' ||
                        F(e.attributes.rel) === 'icon' ||
                        F(e.attributes.rel) === 'apple-touch-icon' ||
                        F(e.attributes.rel) === 'shortcut icon')))
        )
            return !0;
        if (e.tagName === 'meta') {
            if (
                t.headMetaDescKeywords &&
                F(e.attributes.name).match(/^description|keywords$/)
            )
                return !0;
            if (
                t.headMetaSocial &&
                (F(e.attributes.property).match(/^(og|twitter|fb):/) ||
                    F(e.attributes.name).match(/^(og|twitter):/) ||
                    F(e.attributes.name) === 'pinterest')
            )
                return !0;
            if (
                t.headMetaRobots &&
                (F(e.attributes.name) === 'robots' ||
                    F(e.attributes.name) === 'googlebot' ||
                    F(e.attributes.name) === 'bingbot')
            )
                return !0;
            if (t.headMetaHttpEquiv && e.attributes['http-equiv'] !== void 0)
                return !0;
            if (
                t.headMetaAuthorship &&
                (F(e.attributes.name) === 'author' ||
                    F(e.attributes.name) === 'generator' ||
                    F(e.attributes.name) === 'framework' ||
                    F(e.attributes.name) === 'publisher' ||
                    F(e.attributes.name) === 'progid' ||
                    F(e.attributes.property).match(/^article:/) ||
                    F(e.attributes.property).match(/^product:/))
            )
                return !0;
            if (
                t.headMetaVerification &&
                (F(e.attributes.name) === 'google-site-verification' ||
                    F(e.attributes.name) === 'yandex-verification' ||
                    F(e.attributes.name) === 'csrf-token' ||
                    F(e.attributes.name) === 'p:domain_verify' ||
                    F(e.attributes.name) === 'verify-v1' ||
                    F(e.attributes.name) === 'verification' ||
                    F(e.attributes.name) === 'shopify-checkout-api-token')
            )
                return !0;
        }
    }
    return !1;
}
function pe(e, t) {
    var r = t.doc,
        o = t.mirror,
        n = t.blockClass,
        i = t.blockSelector,
        l = t.maskTextClass,
        a = t.maskTextSelector,
        s = t.skipChild,
        c = s === void 0 ? !1 : s,
        d = t.inlineStylesheet,
        f = d === void 0 ? !0 : d,
        m = t.maskInputOptions,
        g = m === void 0 ? {} : m,
        p = t.maskTextFn,
        S = t.maskInputFn,
        k = t.slimDOMOptions,
        T = t.dataURLOptions,
        I = T === void 0 ? {} : T,
        y = t.inlineImages,
        R = y === void 0 ? !1 : y,
        J = t.recordCanvas,
        U = J === void 0 ? !1 : J,
        K = t.onSerialize,
        x = t.onIframeLoad,
        j = t.iframeLoadTimeout,
        u = j === void 0 ? 5e3 : j,
        C = t.onStylesheetLoad,
        v = t.stylesheetLoadTimeout,
        h = v === void 0 ? 5e3 : v,
        E = t.keepIframeSrcFn,
        A =
            E === void 0
                ? function () {
                      return !1;
                  }
                : E,
        L = t.newlyAddedElement,
        W = L === void 0 ? !1 : L,
        V = t.preserveWhiteSpace,
        z = V === void 0 ? !0 : V,
        re = Gr(e, {
            doc: r,
            mirror: o,
            blockClass: n,
            blockSelector: i,
            maskTextClass: l,
            maskTextSelector: a,
            inlineStylesheet: f,
            maskInputOptions: g,
            maskTextFn: p,
            maskInputFn: S,
            dataURLOptions: I,
            inlineImages: R,
            recordCanvas: U,
            keepIframeSrcFn: A,
            newlyAddedElement: W,
        });
    if (!re) return console.warn(e, 'not serialized'), null;
    var de;
    o.hasNode(e)
        ? (de = o.getId(e))
        : Vr(re, k) ||
          (!z &&
              re.type === Y.Text &&
              !re.isStyle &&
              !re.textContent.replace(/^\s+|\s+$/gm, '').length)
        ? (de = he)
        : (de = nt());
    var H = Object.assign(re, { id: de });
    if ((o.add(e, H), de === he)) return null;
    K && K(e);
    var ne = !c;
    if (H.type === Y.Element) {
        (ne = ne && !H.needBlock), delete H.needBlock;
        var ae = e.shadowRoot;
        ae && me(ae) && (H.isShadowHost = !0);
    }
    if ((H.type === Y.Document || H.type === Y.Element) && ne) {
        k.headWhitespace &&
            H.type === Y.Element &&
            H.tagName === 'head' &&
            (z = !1);
        for (
            var Ce = {
                    doc: r,
                    mirror: o,
                    blockClass: n,
                    blockSelector: i,
                    maskTextClass: l,
                    maskTextSelector: a,
                    skipChild: c,
                    inlineStylesheet: f,
                    maskInputOptions: g,
                    maskTextFn: p,
                    maskInputFn: S,
                    slimDOMOptions: k,
                    dataURLOptions: I,
                    inlineImages: R,
                    recordCanvas: U,
                    preserveWhiteSpace: z,
                    onSerialize: K,
                    onIframeLoad: x,
                    iframeLoadTimeout: u,
                    onStylesheetLoad: C,
                    stylesheetLoadTimeout: h,
                    keepIframeSrcFn: A,
                },
                w = 0,
                q = Array.from(e.childNodes);
            w < q.length;
            w++
        ) {
            var $ = q[w],
                _ = pe($, Ce);
            _ && H.childNodes.push(_);
        }
        if (Sr(e) && e.shadowRoot)
            for (
                var oe = 0, O = Array.from(e.shadowRoot.childNodes);
                oe < O.length;
                oe++
            ) {
                var $ = O[oe],
                    _ = pe($, Ce);
                _ &&
                    (me(e.shadowRoot) && (_.isShadow = !0),
                    H.childNodes.push(_));
            }
    }
    return (
        e.parentNode &&
            ge(e.parentNode) &&
            me(e.parentNode) &&
            (H.isShadow = !0),
        H.type === Y.Element &&
            H.tagName === 'iframe' &&
            Wr(
                e,
                function () {
                    var ee = e.contentDocument;
                    if (ee && x) {
                        var Te = pe(ee, {
                            doc: ee,
                            mirror: o,
                            blockClass: n,
                            blockSelector: i,
                            maskTextClass: l,
                            maskTextSelector: a,
                            skipChild: !1,
                            inlineStylesheet: f,
                            maskInputOptions: g,
                            maskTextFn: p,
                            maskInputFn: S,
                            slimDOMOptions: k,
                            dataURLOptions: I,
                            inlineImages: R,
                            recordCanvas: U,
                            preserveWhiteSpace: z,
                            onSerialize: K,
                            onIframeLoad: x,
                            iframeLoadTimeout: u,
                            onStylesheetLoad: C,
                            stylesheetLoadTimeout: h,
                            keepIframeSrcFn: A,
                        });
                        Te && x(e, Te);
                    }
                },
                u
            ),
        H.type === Y.Element &&
            H.tagName === 'link' &&
            H.attributes.rel === 'stylesheet' &&
            Br(
                e,
                function () {
                    if (C) {
                        var ee = pe(e, {
                            doc: r,
                            mirror: o,
                            blockClass: n,
                            blockSelector: i,
                            maskTextClass: l,
                            maskTextSelector: a,
                            skipChild: !1,
                            inlineStylesheet: f,
                            maskInputOptions: g,
                            maskTextFn: p,
                            maskInputFn: S,
                            slimDOMOptions: k,
                            dataURLOptions: I,
                            inlineImages: R,
                            recordCanvas: U,
                            preserveWhiteSpace: z,
                            onSerialize: K,
                            onIframeLoad: x,
                            iframeLoadTimeout: u,
                            onStylesheetLoad: C,
                            stylesheetLoadTimeout: h,
                            keepIframeSrcFn: A,
                        });
                        ee && C(e, ee);
                    }
                },
                h
            ),
        H
    );
}
function Nt(e, t) {
    var r = t || {},
        o = r.mirror,
        n = o === void 0 ? new Lt() : o,
        i = r.blockClass,
        l = i === void 0 ? 'rr-block' : i,
        a = r.blockSelector,
        s = a === void 0 ? null : a,
        c = r.maskTextClass,
        d = c === void 0 ? 'rr-mask' : c,
        f = r.maskTextSelector,
        m = f === void 0 ? null : f,
        g = r.inlineStylesheet,
        p = g === void 0 ? !0 : g,
        S = r.inlineImages,
        k = S === void 0 ? !1 : S,
        T = r.recordCanvas,
        I = T === void 0 ? !1 : T,
        y = r.maskAllInputs,
        R = y === void 0 ? !1 : y,
        J = r.maskTextFn,
        U = r.maskInputFn,
        K = r.slimDOM,
        x = K === void 0 ? !1 : K,
        j = r.dataURLOptions,
        u = r.preserveWhiteSpace,
        C = r.onSerialize,
        v = r.onIframeLoad,
        h = r.iframeLoadTimeout,
        E = r.onStylesheetLoad,
        A = r.stylesheetLoadTimeout,
        L = r.keepIframeSrcFn,
        W =
            L === void 0
                ? function () {
                      return !1;
                  }
                : L,
        V =
            R === !0
                ? {
                      color: !0,
                      date: !0,
                      'datetime-local': !0,
                      email: !0,
                      month: !0,
                      number: !0,
                      range: !0,
                      search: !0,
                      tel: !0,
                      text: !0,
                      time: !0,
                      url: !0,
                      week: !0,
                      textarea: !0,
                      select: !0,
                      password: !0,
                  }
                : R === !1
                ? { password: !0 }
                : R,
        z =
            x === !0 || x === 'all'
                ? {
                      script: !0,
                      comment: !0,
                      headFavicon: !0,
                      headWhitespace: !0,
                      headMetaDescKeywords: x === 'all',
                      headMetaSocial: !0,
                      headMetaRobots: !0,
                      headMetaHttpEquiv: !0,
                      headMetaAuthorship: !0,
                      headMetaVerification: !0,
                  }
                : x === !1
                ? {}
                : x;
    return pe(e, {
        doc: e,
        mirror: n,
        blockClass: l,
        blockSelector: s,
        maskTextClass: d,
        maskTextSelector: m,
        skipChild: !1,
        inlineStylesheet: p,
        maskInputOptions: V,
        maskTextFn: J,
        maskInputFn: U,
        slimDOMOptions: z,
        dataURLOptions: j,
        inlineImages: k,
        recordCanvas: I,
        preserveWhiteSpace: u,
        onSerialize: C,
        onIframeLoad: v,
        iframeLoadTimeout: h,
        onStylesheetLoad: E,
        stylesheetLoadTimeout: A,
        keepIframeSrcFn: W,
        newlyAddedElement: !1,
    });
}
var Zr = /([^\\]):hover/,
    Eo = new RegExp(Zr.source, 'g');
function Q(e, t, r = document) {
    let o = { capture: !0, passive: !0 };
    return r.addEventListener(e, t, o), () => r.removeEventListener(e, t, o);
}
var ve = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`,
    Mt = {
        map: {},
        getId() {
            return console.error(ve), -1;
        },
        getNode() {
            return console.error(ve), null;
        },
        removeNodeFromMap() {
            console.error(ve);
        },
        has() {
            return console.error(ve), !1;
        },
        reset() {
            console.error(ve);
        },
    };
typeof window < 'u' &&
    window.Proxy &&
    window.Reflect &&
    (Mt = new Proxy(Mt, {
        get(e, t, r) {
            return t === 'map' && console.error(ve), Reflect.get(e, t, r);
        },
    }));
function Ee(e, t, r = {}) {
    let o = null,
        n = 0;
    return function (...i) {
        let l = Date.now();
        !n && r.leading === !1 && (n = l);
        let a = t - (l - n),
            s = this;
        a <= 0 || a > t
            ? (o && (clearTimeout(o), (o = null)), (n = l), e.apply(s, i))
            : !o &&
              r.trailing !== !1 &&
              (o = setTimeout(() => {
                  (n = r.leading === !1 ? 0 : Date.now()),
                      (o = null),
                      e.apply(s, i);
              }, a));
    };
}
function ye(e, t, r, o, n = window) {
    let i = n.Object.getOwnPropertyDescriptor(e, t);
    return (
        n.Object.defineProperty(
            e,
            t,
            o
                ? r
                : {
                      set(l) {
                          setTimeout(() => {
                              r.set.call(this, l);
                          }, 0),
                              i && i.set && i.set.call(this, l);
                      },
                  }
        ),
        () => ye(e, t, i || {}, !0)
    );
}
function ie(e, t, r) {
    try {
        if (!(t in e)) return () => {};
        let o = e[t],
            n = r(o);
        return (
            typeof n == 'function' &&
                ((n.prototype = n.prototype || {}),
                Object.defineProperties(n, {
                    __rrweb_original__: { enumerable: !1, value: o },
                })),
            (e[t] = n),
            () => {
                e[t] = o;
            }
        );
    } catch {
        return () => {};
    }
}
function Fe() {
    return (
        window.innerHeight ||
        (document.documentElement && document.documentElement.clientHeight) ||
        (document.body && document.body.clientHeight)
    );
}
function _e() {
    return (
        window.innerWidth ||
        (document.documentElement && document.documentElement.clientWidth) ||
        (document.body && document.body.clientWidth)
    );
}
function B(e, t, r, o) {
    if (!e) return !1;
    let n = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
    if (!n) return !1;
    if (typeof t == 'string') {
        if (n.classList.contains(t) || (o && n.closest('.' + t) !== null))
            return !0;
    } else if (we(n, t, o)) return !0;
    return !!(r && (e.matches(r) || (o && n.closest(r) !== null)));
}
function Rt(e, t) {
    return t.getId(e) !== -1;
}
function We(e, t) {
    return t.getId(e) === he;
}
function lt(e, t) {
    if (ge(e)) return !1;
    let r = t.getId(e);
    return t.has(r)
        ? e.parentNode && e.parentNode.nodeType === e.DOCUMENT_NODE
            ? !1
            : e.parentNode
            ? lt(e.parentNode, t)
            : !0
        : !0;
}
function ct(e) {
    return !!e.changedTouches;
}
function Ot(e = window) {
    'NodeList' in e &&
        !e.NodeList.prototype.forEach &&
        (e.NodeList.prototype.forEach = Array.prototype.forEach),
        'DOMTokenList' in e &&
            !e.DOMTokenList.prototype.forEach &&
            (e.DOMTokenList.prototype.forEach = Array.prototype.forEach),
        Node.prototype.contains ||
            (Node.prototype.contains = (...t) => {
                let r = t[0];
                if (!(0 in t)) throw new TypeError('1 argument is required');
                do if (this === r) return !0;
                while ((r = r && r.parentNode));
                return !1;
            });
}
function Be(e, t) {
    return !!(e.nodeName === 'IFRAME' && t.getMeta(e));
}
function Ge(e, t) {
    return !!(
        e.nodeName === 'LINK' &&
        e.nodeType === e.ELEMENT_NODE &&
        e.getAttribute &&
        e.getAttribute('rel') === 'stylesheet' &&
        t.getMeta(e)
    );
}
function He(e) {
    return !!e?.shadowRoot;
}
var De = class {
    constructor() {
        (this.id = 1),
            (this.styleIDMap = new WeakMap()),
            (this.idStyleMap = new Map());
    }
    getId(t) {
        var r;
        return (r = this.styleIDMap.get(t)) !== null && r !== void 0 ? r : -1;
    }
    has(t) {
        return this.styleIDMap.has(t);
    }
    add(t, r) {
        if (this.has(t)) return this.getId(t);
        let o;
        return (
            r === void 0 ? (o = this.id++) : (o = r),
            this.styleIDMap.set(t, o),
            this.idStyleMap.set(o, t),
            o
        );
    }
    getStyle(t) {
        return this.idStyleMap.get(t) || null;
    }
    reset() {
        (this.styleIDMap = new WeakMap()),
            (this.idStyleMap = new Map()),
            (this.id = 1);
    }
    generateId() {
        return this.id++;
    }
};
var M = ((e) => (
        (e[(e.DomContentLoaded = 0)] = 'DomContentLoaded'),
        (e[(e.Load = 1)] = 'Load'),
        (e[(e.FullSnapshot = 2)] = 'FullSnapshot'),
        (e[(e.IncrementalSnapshot = 3)] = 'IncrementalSnapshot'),
        (e[(e.Meta = 4)] = 'Meta'),
        (e[(e.Custom = 5)] = 'Custom'),
        (e[(e.Plugin = 6)] = 'Plugin'),
        e
    ))(M || {}),
    N = ((e) => (
        (e[(e.Mutation = 0)] = 'Mutation'),
        (e[(e.MouseMove = 1)] = 'MouseMove'),
        (e[(e.MouseInteraction = 2)] = 'MouseInteraction'),
        (e[(e.Scroll = 3)] = 'Scroll'),
        (e[(e.ViewportResize = 4)] = 'ViewportResize'),
        (e[(e.Input = 5)] = 'Input'),
        (e[(e.TouchMove = 6)] = 'TouchMove'),
        (e[(e.MediaInteraction = 7)] = 'MediaInteraction'),
        (e[(e.StyleSheetRule = 8)] = 'StyleSheetRule'),
        (e[(e.CanvasMutation = 9)] = 'CanvasMutation'),
        (e[(e.Font = 10)] = 'Font'),
        (e[(e.Log = 11)] = 'Log'),
        (e[(e.Drag = 12)] = 'Drag'),
        (e[(e.StyleDeclaration = 13)] = 'StyleDeclaration'),
        (e[(e.Selection = 14)] = 'Selection'),
        (e[(e.AdoptedStyleSheet = 15)] = 'AdoptedStyleSheet'),
        e
    ))(N || {}),
    Pe = ((e) => (
        (e[(e.MouseUp = 0)] = 'MouseUp'),
        (e[(e.MouseDown = 1)] = 'MouseDown'),
        (e[(e.Click = 2)] = 'Click'),
        (e[(e.ContextMenu = 3)] = 'ContextMenu'),
        (e[(e.DblClick = 4)] = 'DblClick'),
        (e[(e.Focus = 5)] = 'Focus'),
        (e[(e.Blur = 6)] = 'Blur'),
        (e[(e.TouchStart = 7)] = 'TouchStart'),
        (e[(e.TouchMove_Departed = 8)] = 'TouchMove_Departed'),
        (e[(e.TouchEnd = 9)] = 'TouchEnd'),
        (e[(e.TouchCancel = 10)] = 'TouchCancel'),
        e
    ))(Pe || {}),
    ce = ((e) => (
        (e[(e['2D'] = 0)] = '2D'),
        (e[(e.WebGL = 1)] = 'WebGL'),
        (e[(e.WebGL2 = 2)] = 'WebGL2'),
        e
    ))(ce || {});
function xt(e) {
    return '__ln' in e;
}
var dt = class {
        constructor() {
            (this.length = 0), (this.head = null);
        }
        get(t) {
            if (t >= this.length)
                throw new Error('Position outside of list range');
            let r = this.head;
            for (let o = 0; o < t; o++) r = r?.next || null;
            return r;
        }
        addNode(t) {
            let r = { value: t, previous: null, next: null };
            if (((t.__ln = r), t.previousSibling && xt(t.previousSibling))) {
                let o = t.previousSibling.__ln.next;
                (r.next = o),
                    (r.previous = t.previousSibling.__ln),
                    (t.previousSibling.__ln.next = r),
                    o && (o.previous = r);
            } else if (
                t.nextSibling &&
                xt(t.nextSibling) &&
                t.nextSibling.__ln.previous
            ) {
                let o = t.nextSibling.__ln.previous;
                (r.previous = o),
                    (r.next = t.nextSibling.__ln),
                    (t.nextSibling.__ln.previous = r),
                    o && (o.next = r);
            } else
                this.head && (this.head.previous = r),
                    (r.next = this.head),
                    (this.head = r);
            this.length++;
        }
        removeNode(t) {
            let r = t.__ln;
            this.head &&
                (r.previous
                    ? ((r.previous.next = r.next),
                      r.next && (r.next.previous = r.previous))
                    : ((this.head = r.next),
                      this.head && (this.head.previous = null)),
                t.__ln && delete t.__ln,
                this.length--);
        }
    },
    Dt = (e, t) => `${e}@${t}`,
    Ue = class {
        constructor() {
            (this.frozen = !1),
                (this.locked = !1),
                (this.texts = []),
                (this.attributes = []),
                (this.removes = []),
                (this.mapRemoves = []),
                (this.movedMap = {}),
                (this.addedSet = new Set()),
                (this.movedSet = new Set()),
                (this.droppedSet = new Set()),
                (this.processMutations = (t) => {
                    t.forEach(this.processMutation), this.emit();
                }),
                (this.emit = () => {
                    if (this.frozen || this.locked) return;
                    let t = [],
                        r = new dt(),
                        o = (a) => {
                            let s = a,
                                c = he;
                            for (; c === he; )
                                (s = s && s.nextSibling),
                                    (c = s && this.mirror.getId(s));
                            return c;
                        },
                        n = (a) => {
                            var s, c, d, f;
                            let m = null;
                            ((c =
                                (s = a.getRootNode) === null || s === void 0
                                    ? void 0
                                    : s.call(a)) === null || c === void 0
                                ? void 0
                                : c.nodeType) === Node.DOCUMENT_FRAGMENT_NODE &&
                                a.getRootNode().host &&
                                (m = a.getRootNode().host);
                            let g = m;
                            for (
                                ;
                                ((f =
                                    (d = g?.getRootNode) === null ||
                                    d === void 0
                                        ? void 0
                                        : d.call(g)) === null || f === void 0
                                    ? void 0
                                    : f.nodeType) ===
                                    Node.DOCUMENT_FRAGMENT_NODE &&
                                g.getRootNode().host;

                            )
                                g = g.getRootNode().host;
                            let p =
                                !this.doc.contains(a) &&
                                (!g || !this.doc.contains(g));
                            if (!a.parentNode || p) return;
                            let S = ge(a.parentNode)
                                    ? this.mirror.getId(m)
                                    : this.mirror.getId(a.parentNode),
                                k = o(a);
                            if (S === -1 || k === -1) return r.addNode(a);
                            let T = pe(a, {
                                doc: this.doc,
                                mirror: this.mirror,
                                blockClass: this.blockClass,
                                blockSelector: this.blockSelector,
                                maskTextClass: this.maskTextClass,
                                maskTextSelector: this.maskTextSelector,
                                skipChild: !0,
                                newlyAddedElement: !0,
                                inlineStylesheet: this.inlineStylesheet,
                                maskInputOptions: this.maskInputOptions,
                                maskTextFn: this.maskTextFn,
                                maskInputFn: this.maskInputFn,
                                slimDOMOptions: this.slimDOMOptions,
                                dataURLOptions: this.dataURLOptions,
                                recordCanvas: this.recordCanvas,
                                inlineImages: this.inlineImages,
                                onSerialize: (I) => {
                                    Be(I, this.mirror) &&
                                        this.iframeManager.addIframe(I),
                                        Ge(I, this.mirror) &&
                                            this.stylesheetManager.trackLinkElement(
                                                I
                                            ),
                                        He(a) &&
                                            this.shadowDomManager.addShadowRoot(
                                                a.shadowRoot,
                                                this.doc
                                            );
                                },
                                onIframeLoad: (I, y) => {
                                    this.iframeManager.attachIframe(I, y),
                                        this.shadowDomManager.observeAttachShadow(
                                            I
                                        );
                                },
                                onStylesheetLoad: (I, y) => {
                                    this.stylesheetManager.attachLinkElement(
                                        I,
                                        y
                                    );
                                },
                            });
                            T && t.push({ parentId: S, nextId: k, node: T });
                        };
                    for (; this.mapRemoves.length; )
                        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                    for (let a of Array.from(this.movedSet.values()))
                        (Ft(this.removes, a, this.mirror) &&
                            !this.movedSet.has(a.parentNode)) ||
                            n(a);
                    for (let a of Array.from(this.addedSet.values()))
                        (!_t(this.droppedSet, a) &&
                            !Ft(this.removes, a, this.mirror)) ||
                        _t(this.movedSet, a)
                            ? n(a)
                            : this.droppedSet.add(a);
                    let i = null;
                    for (; r.length; ) {
                        let a = null;
                        if (i) {
                            let s = this.mirror.getId(i.value.parentNode),
                                c = o(i.value);
                            s !== -1 && c !== -1 && (a = i);
                        }
                        if (!a)
                            for (let s = r.length - 1; s >= 0; s--) {
                                let c = r.get(s);
                                if (c) {
                                    let d = this.mirror.getId(
                                        c.value.parentNode
                                    );
                                    if (o(c.value) === -1) continue;
                                    if (d !== -1) {
                                        a = c;
                                        break;
                                    } else {
                                        let m = c.value;
                                        if (
                                            m.parentNode &&
                                            m.parentNode.nodeType ===
                                                Node.DOCUMENT_FRAGMENT_NODE
                                        ) {
                                            let g = m.parentNode.host;
                                            if (this.mirror.getId(g) !== -1) {
                                                a = c;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        if (!a) {
                            for (; r.head; ) r.removeNode(r.head.value);
                            break;
                        }
                        (i = a.previous), r.removeNode(a.value), n(a.value);
                    }
                    let l = {
                        texts: this.texts
                            .map((a) => ({
                                id: this.mirror.getId(a.node),
                                value: a.value,
                            }))
                            .filter((a) => this.mirror.has(a.id)),
                        attributes: this.attributes
                            .map((a) => ({
                                id: this.mirror.getId(a.node),
                                attributes: a.attributes,
                            }))
                            .filter((a) => this.mirror.has(a.id)),
                        removes: this.removes,
                        adds: t,
                    };
                    (!l.texts.length &&
                        !l.attributes.length &&
                        !l.removes.length &&
                        !l.adds.length) ||
                        ((this.texts = []),
                        (this.attributes = []),
                        (this.removes = []),
                        (this.addedSet = new Set()),
                        (this.movedSet = new Set()),
                        (this.droppedSet = new Set()),
                        (this.movedMap = {}),
                        this.mutationCb(l));
                }),
                (this.processMutation = (t) => {
                    if (!We(t.target, this.mirror))
                        switch (t.type) {
                            case 'characterData': {
                                let r = t.target.textContent;
                                !B(
                                    t.target,
                                    this.blockClass,
                                    this.blockSelector,
                                    !1
                                ) &&
                                    r !== t.oldValue &&
                                    this.texts.push({
                                        value:
                                            at(
                                                t.target,
                                                this.maskTextClass,
                                                this.maskTextSelector
                                            ) && r
                                                ? this.maskTextFn
                                                    ? this.maskTextFn(r)
                                                    : r.replace(/[\S]/g, '*')
                                                : r,
                                        node: t.target,
                                    });
                                break;
                            }
                            case 'attributes': {
                                let r = t.target,
                                    o = t.target.getAttribute(t.attributeName);
                                if (
                                    (t.attributeName === 'value' &&
                                        (o = Le({
                                            maskInputOptions:
                                                this.maskInputOptions,
                                            tagName: t.target.tagName,
                                            type: t.target.getAttribute('type'),
                                            value: o,
                                            maskInputFn: this.maskInputFn,
                                        })),
                                    B(
                                        t.target,
                                        this.blockClass,
                                        this.blockSelector,
                                        !1
                                    ) || o === t.oldValue)
                                )
                                    return;
                                let n = this.attributes.find(
                                    (i) => i.node === t.target
                                );
                                if (
                                    r.tagName === 'IFRAME' &&
                                    t.attributeName === 'src' &&
                                    !this.keepIframeSrcFn(o)
                                )
                                    if (!r.contentDocument)
                                        t.attributeName = 'rr_src';
                                    else return;
                                if (
                                    (n ||
                                        ((n = {
                                            node: t.target,
                                            attributes: {},
                                        }),
                                        this.attributes.push(n)),
                                    t.attributeName === 'style')
                                ) {
                                    let i = this.doc.createElement('span');
                                    t.oldValue &&
                                        i.setAttribute('style', t.oldValue),
                                        (n.attributes.style === void 0 ||
                                            n.attributes.style === null) &&
                                            (n.attributes.style = {});
                                    let l = n.attributes.style;
                                    for (let a of Array.from(r.style)) {
                                        let s = r.style.getPropertyValue(a),
                                            c = r.style.getPropertyPriority(a);
                                        (s !== i.style.getPropertyValue(a) ||
                                            c !==
                                                i.style.getPropertyPriority(
                                                    a
                                                )) &&
                                            (c === ''
                                                ? (l[a] = s)
                                                : (l[a] = [s, c]));
                                    }
                                    for (let a of Array.from(i.style))
                                        r.style.getPropertyValue(a) === '' &&
                                            (l[a] = !1);
                                } else
                                    n.attributes[t.attributeName] = st(
                                        this.doc,
                                        r.tagName,
                                        t.attributeName,
                                        o
                                    );
                                break;
                            }
                            case 'childList': {
                                if (
                                    B(
                                        t.target,
                                        this.blockClass,
                                        this.blockSelector,
                                        !0
                                    )
                                )
                                    return;
                                t.addedNodes.forEach((r) =>
                                    this.genAdds(r, t.target)
                                ),
                                    t.removedNodes.forEach((r) => {
                                        let o = this.mirror.getId(r),
                                            n = ge(t.target)
                                                ? this.mirror.getId(
                                                      t.target.host
                                                  )
                                                : this.mirror.getId(t.target);
                                        B(
                                            t.target,
                                            this.blockClass,
                                            this.blockSelector,
                                            !1
                                        ) ||
                                            We(r, this.mirror) ||
                                            !Rt(r, this.mirror) ||
                                            (this.addedSet.has(r)
                                                ? (ut(this.addedSet, r),
                                                  this.droppedSet.add(r))
                                                : (this.addedSet.has(
                                                      t.target
                                                  ) &&
                                                      o === -1) ||
                                                  lt(t.target, this.mirror) ||
                                                  (this.movedSet.has(r) &&
                                                  this.movedMap[Dt(o, n)]
                                                      ? ut(this.movedSet, r)
                                                      : this.removes.push({
                                                            parentId: n,
                                                            id: o,
                                                            isShadow:
                                                                ge(t.target) &&
                                                                me(t.target)
                                                                    ? !0
                                                                    : void 0,
                                                        })),
                                            this.mapRemoves.push(r));
                                    });
                                break;
                            }
                        }
                }),
                (this.genAdds = (t, r) => {
                    if (this.mirror.hasNode(t)) {
                        if (We(t, this.mirror)) return;
                        this.movedSet.add(t);
                        let o = null;
                        r &&
                            this.mirror.hasNode(r) &&
                            (o = this.mirror.getId(r)),
                            o &&
                                o !== -1 &&
                                (this.movedMap[Dt(this.mirror.getId(t), o)] =
                                    !0);
                    } else this.addedSet.add(t), this.droppedSet.delete(t);
                    B(t, this.blockClass, this.blockSelector, !1) ||
                        t.childNodes.forEach((o) => this.genAdds(o));
                });
        }
        init(t) {
            [
                'mutationCb',
                'blockClass',
                'blockSelector',
                'maskTextClass',
                'maskTextSelector',
                'inlineStylesheet',
                'maskInputOptions',
                'maskTextFn',
                'maskInputFn',
                'keepIframeSrcFn',
                'recordCanvas',
                'inlineImages',
                'slimDOMOptions',
                'dataURLOptions',
                'doc',
                'mirror',
                'iframeManager',
                'stylesheetManager',
                'shadowDomManager',
                'canvasManager',
            ].forEach((r) => {
                this[r] = t[r];
            });
        }
        freeze() {
            (this.frozen = !0), this.canvasManager.freeze();
        }
        unfreeze() {
            (this.frozen = !1), this.canvasManager.unfreeze(), this.emit();
        }
        isFrozen() {
            return this.frozen;
        }
        lock() {
            (this.locked = !0), this.canvasManager.lock();
        }
        unlock() {
            (this.locked = !1), this.canvasManager.unlock(), this.emit();
        }
        reset() {
            this.shadowDomManager.reset(), this.canvasManager.reset();
        }
    };
function ut(e, t) {
    e.delete(t), t.childNodes.forEach((r) => ut(e, r));
}
function Ft(e, t, r) {
    return e.length === 0 ? !1 : Wt(e, t, r);
}
function Wt(e, t, r) {
    let { parentNode: o } = t;
    if (!o) return !1;
    let n = r.getId(o);
    return e.some((i) => i.id === n) ? !0 : Wt(e, o, r);
}
function _t(e, t) {
    return e.size === 0 ? !1 : Bt(e, t);
}
function Bt(e, t) {
    let { parentNode: r } = t;
    return r ? (e.has(r) ? !0 : Bt(e, r)) : !1;
}
var fe = [],
    Pt = typeof CSSGroupingRule < 'u',
    Ut = typeof CSSMediaRule < 'u',
    Vt = typeof CSSSupportsRule < 'u',
    Zt = typeof CSSConditionRule < 'u';
function ke(e) {
    try {
        if ('composedPath' in e) {
            let t = e.composedPath();
            if (t.length) return t[0];
        } else if ('path' in e && e.path.length) return e.path[0];
        return e.target;
    } catch {
        return e.target;
    }
}
function ft(e, t) {
    var r, o;
    let n = new Ue();
    fe.push(n), n.init(e);
    let i = window.MutationObserver || window.__rrMutationObserver,
        l =
            (o =
                (r = window?.Zone) === null || r === void 0
                    ? void 0
                    : r.__symbol__) === null || o === void 0
                ? void 0
                : o.call(r, 'MutationObserver');
    l && window[l] && (i = window[l]);
    let a = new i(n.processMutations.bind(n));
    return (
        a.observe(t, {
            attributes: !0,
            attributeOldValue: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0,
        }),
        a
    );
}
function Kr({ mousemoveCb: e, sampling: t, doc: r, mirror: o }) {
    if (t.mousemove === !1) return () => {};
    let n = typeof t.mousemove == 'number' ? t.mousemove : 50,
        i = typeof t.mousemoveCallback == 'number' ? t.mousemoveCallback : 500,
        l = [],
        a,
        s = Ee((f) => {
            let m = Date.now() - a;
            e(
                l.map((g) => ((g.timeOffset -= m), g)),
                f
            ),
                (l = []),
                (a = null);
        }, i),
        c = Ee(
            (f) => {
                let m = ke(f),
                    { clientX: g, clientY: p } = ct(f)
                        ? f.changedTouches[0]
                        : f;
                a || (a = Date.now()),
                    l.push({
                        x: g,
                        y: p,
                        id: o.getId(m),
                        timeOffset: Date.now() - a,
                    }),
                    s(
                        typeof DragEvent < 'u' && f instanceof DragEvent
                            ? N.Drag
                            : f instanceof MouseEvent
                            ? N.MouseMove
                            : N.TouchMove
                    );
            },
            n,
            { trailing: !1 }
        ),
        d = [Q('mousemove', c, r), Q('touchmove', c, r), Q('drag', c, r)];
    return () => {
        d.forEach((f) => f());
    };
}
function zr({
    mouseInteractionCb: e,
    doc: t,
    mirror: r,
    blockClass: o,
    blockSelector: n,
    sampling: i,
}) {
    if (i.mouseInteraction === !1) return () => {};
    let l =
            i.mouseInteraction === !0 || i.mouseInteraction === void 0
                ? {}
                : i.mouseInteraction,
        a = [],
        s = (c) => (d) => {
            let f = ke(d);
            if (B(f, o, n, !0)) return;
            let m = ct(d) ? d.changedTouches[0] : d;
            if (!m) return;
            let g = r.getId(f),
                { clientX: p, clientY: S } = m;
            e({ type: Pe[c], id: g, x: p, y: S });
        };
    return (
        Object.keys(Pe)
            .filter(
                (c) =>
                    Number.isNaN(Number(c)) &&
                    !c.endsWith('_Departed') &&
                    l[c] !== !1
            )
            .forEach((c) => {
                let d = c.toLowerCase(),
                    f = s(c);
                a.push(Q(d, f, t));
            }),
        () => {
            a.forEach((c) => c());
        }
    );
}
function pt({
    scrollCb: e,
    doc: t,
    mirror: r,
    blockClass: o,
    blockSelector: n,
    sampling: i,
}) {
    let l = Ee((a) => {
        let s = ke(a);
        if (!s || B(s, o, n, !0)) return;
        let c = r.getId(s);
        if (s === t) {
            let d = t.scrollingElement || t.documentElement;
            e({ id: c, x: d.scrollLeft, y: d.scrollTop });
        } else e({ id: c, x: s.scrollLeft, y: s.scrollTop });
    }, i.scroll || 100);
    return Q('scroll', l, t);
}
function Yr({ viewportResizeCb: e }) {
    let t = -1,
        r = -1,
        o = Ee(() => {
            let n = Fe(),
                i = _e();
            (t !== n || r !== i) &&
                (e({ width: Number(i), height: Number(n) }), (t = n), (r = i));
        }, 200);
    return Q('resize', o, window);
}
function Gt(e, t) {
    let r = Object.assign({}, e);
    return t || delete r.userTriggered, r;
}
var Jr = ['INPUT', 'TEXTAREA', 'SELECT'],
    Ht = new WeakMap();
function Qr({
    inputCb: e,
    doc: t,
    mirror: r,
    blockClass: o,
    blockSelector: n,
    ignoreClass: i,
    maskInputOptions: l,
    maskInputFn: a,
    sampling: s,
    userTriggeredOnInput: c,
}) {
    function d(T) {
        let I = ke(T),
            y = T.isTrusted;
        if (
            (I && I.tagName === 'OPTION' && (I = I.parentElement),
            !I || !I.tagName || Jr.indexOf(I.tagName) < 0 || B(I, o, n, !0))
        )
            return;
        let R = I.type;
        if (I.classList.contains(i)) return;
        let J = I.value,
            U = !1;
        R === 'radio' || R === 'checkbox'
            ? (U = I.checked)
            : (l[I.tagName.toLowerCase()] || l[R]) &&
              (J = Le({
                  maskInputOptions: l,
                  tagName: I.tagName,
                  type: R,
                  value: J,
                  maskInputFn: a,
              })),
            f(I, Gt({ text: J, isChecked: U, userTriggered: y }, c));
        let K = I.name;
        R === 'radio' &&
            K &&
            U &&
            t
                .querySelectorAll(`input[type="radio"][name="${K}"]`)
                .forEach((x) => {
                    x !== I &&
                        f(
                            x,
                            Gt(
                                {
                                    text: x.value,
                                    isChecked: !U,
                                    userTriggered: !1,
                                },
                                c
                            )
                        );
                });
    }
    function f(T, I) {
        let y = Ht.get(T);
        if (!y || y.text !== I.text || y.isChecked !== I.isChecked) {
            Ht.set(T, I);
            let R = r.getId(T);
            e(Object.assign(Object.assign({}, I), { id: R }));
        }
    }
    let g = (s.input === 'last' ? ['change'] : ['input', 'change']).map((T) =>
            Q(T, d, t)
        ),
        p = t.defaultView;
    if (!p)
        return () => {
            g.forEach((T) => T());
        };
    let S = p.Object.getOwnPropertyDescriptor(
            p.HTMLInputElement.prototype,
            'value'
        ),
        k = [
            [p.HTMLInputElement.prototype, 'value'],
            [p.HTMLInputElement.prototype, 'checked'],
            [p.HTMLSelectElement.prototype, 'value'],
            [p.HTMLTextAreaElement.prototype, 'value'],
            [p.HTMLSelectElement.prototype, 'selectedIndex'],
            [p.HTMLOptionElement.prototype, 'selected'],
        ];
    return (
        S &&
            S.set &&
            g.push(
                ...k.map((T) =>
                    ye(
                        T[0],
                        T[1],
                        {
                            set() {
                                d({ target: this });
                            },
                        },
                        !1,
                        p
                    )
                )
            ),
        () => {
            g.forEach((T) => T());
        }
    );
}
function Ve(e) {
    let t = [];
    function r(o, n) {
        if (
            (Pt && o.parentRule instanceof CSSGroupingRule) ||
            (Ut && o.parentRule instanceof CSSMediaRule) ||
            (Vt && o.parentRule instanceof CSSSupportsRule) ||
            (Zt && o.parentRule instanceof CSSConditionRule)
        ) {
            let l = Array.from(o.parentRule.cssRules).indexOf(o);
            n.unshift(l);
        } else if (o.parentStyleSheet) {
            let l = Array.from(o.parentStyleSheet.cssRules).indexOf(o);
            n.unshift(l);
        }
        return n;
    }
    return r(e, t);
}
function ue(e, t, r) {
    let o, n;
    return e
        ? (e.ownerNode ? (o = t.getId(e.ownerNode)) : (n = r.getId(e)),
          { styleId: n, id: o })
        : {};
}
function jr(
    { styleSheetRuleCb: e, mirror: t, stylesheetManager: r },
    { win: o }
) {
    let n = o.CSSStyleSheet.prototype.insertRule;
    o.CSSStyleSheet.prototype.insertRule = function (d, f) {
        let { id: m, styleId: g } = ue(this, t, r.styleMirror);
        return (
            ((m && m !== -1) || (g && g !== -1)) &&
                e({ id: m, styleId: g, adds: [{ rule: d, index: f }] }),
            n.apply(this, [d, f])
        );
    };
    let i = o.CSSStyleSheet.prototype.deleteRule;
    o.CSSStyleSheet.prototype.deleteRule = function (d) {
        let { id: f, styleId: m } = ue(this, t, r.styleMirror);
        return (
            ((f && f !== -1) || (m && m !== -1)) &&
                e({ id: f, styleId: m, removes: [{ index: d }] }),
            i.apply(this, [d])
        );
    };
    let l;
    o.CSSStyleSheet.prototype.replace &&
        ((l = o.CSSStyleSheet.prototype.replace),
        (o.CSSStyleSheet.prototype.replace = function (d) {
            let { id: f, styleId: m } = ue(this, t, r.styleMirror);
            return (
                ((f && f !== -1) || (m && m !== -1)) &&
                    e({ id: f, styleId: m, replace: d }),
                l.apply(this, [d])
            );
        }));
    let a;
    o.CSSStyleSheet.prototype.replaceSync &&
        ((a = o.CSSStyleSheet.prototype.replaceSync),
        (o.CSSStyleSheet.prototype.replaceSync = function (d) {
            let { id: f, styleId: m } = ue(this, t, r.styleMirror);
            return (
                ((f && f !== -1) || (m && m !== -1)) &&
                    e({ id: f, styleId: m, replaceSync: d }),
                a.apply(this, [d])
            );
        }));
    let s = {};
    Pt
        ? (s.CSSGroupingRule = o.CSSGroupingRule)
        : (Ut && (s.CSSMediaRule = o.CSSMediaRule),
          Zt && (s.CSSConditionRule = o.CSSConditionRule),
          Vt && (s.CSSSupportsRule = o.CSSSupportsRule));
    let c = {};
    return (
        Object.entries(s).forEach(([d, f]) => {
            (c[d] = {
                insertRule: f.prototype.insertRule,
                deleteRule: f.prototype.deleteRule,
            }),
                (f.prototype.insertRule = function (m, g) {
                    let { id: p, styleId: S } = ue(
                        this.parentStyleSheet,
                        t,
                        r.styleMirror
                    );
                    return (
                        ((p && p !== -1) || (S && S !== -1)) &&
                            e({
                                id: p,
                                styleId: S,
                                adds: [
                                    { rule: m, index: [...Ve(this), g || 0] },
                                ],
                            }),
                        c[d].insertRule.apply(this, [m, g])
                    );
                }),
                (f.prototype.deleteRule = function (m) {
                    let { id: g, styleId: p } = ue(
                        this.parentStyleSheet,
                        t,
                        r.styleMirror
                    );
                    return (
                        ((g && g !== -1) || (p && p !== -1)) &&
                            e({
                                id: g,
                                styleId: p,
                                removes: [{ index: [...Ve(this), m] }],
                            }),
                        c[d].deleteRule.apply(this, [m])
                    );
                });
        }),
        () => {
            (o.CSSStyleSheet.prototype.insertRule = n),
                (o.CSSStyleSheet.prototype.deleteRule = i),
                l && (o.CSSStyleSheet.prototype.replace = l),
                a && (o.CSSStyleSheet.prototype.replaceSync = a),
                Object.entries(s).forEach(([d, f]) => {
                    (f.prototype.insertRule = c[d].insertRule),
                        (f.prototype.deleteRule = c[d].deleteRule);
                });
        }
    );
}
function mt({ mirror: e, stylesheetManager: t }, r) {
    var o, n, i;
    let l = null;
    r.nodeName === '#document' ? (l = e.getId(r)) : (l = e.getId(r.host));
    let a =
            r.nodeName === '#document'
                ? (o = r.defaultView) === null || o === void 0
                    ? void 0
                    : o.Document
                : (i =
                      (n = r.ownerDocument) === null || n === void 0
                          ? void 0
                          : n.defaultView) === null || i === void 0
                ? void 0
                : i.ShadowRoot,
        s = Object.getOwnPropertyDescriptor(a?.prototype, 'adoptedStyleSheets');
    return l === null || l === -1 || !a || !s
        ? () => {}
        : (Object.defineProperty(r, 'adoptedStyleSheets', {
              configurable: s.configurable,
              enumerable: s.enumerable,
              get() {
                  var c;
                  return (c = s.get) === null || c === void 0
                      ? void 0
                      : c.call(this);
              },
              set(c) {
                  var d;
                  let f =
                      (d = s.set) === null || d === void 0
                          ? void 0
                          : d.call(this, c);
                  if (l !== null && l !== -1)
                      try {
                          t.adoptStyleSheets(c, l);
                      } catch {}
                  return f;
              },
          }),
          () => {
              Object.defineProperty(r, 'adoptedStyleSheets', {
                  configurable: s.configurable,
                  enumerable: s.enumerable,
                  get: s.get,
                  set: s.set,
              });
          });
}
function qr(
    {
        styleDeclarationCb: e,
        mirror: t,
        ignoreCSSAttributes: r,
        stylesheetManager: o,
    },
    { win: n }
) {
    let i = n.CSSStyleDeclaration.prototype.setProperty;
    n.CSSStyleDeclaration.prototype.setProperty = function (a, s, c) {
        var d;
        if (r.has(a)) return i.apply(this, [a, s, c]);
        let { id: f, styleId: m } = ue(
            (d = this.parentRule) === null || d === void 0
                ? void 0
                : d.parentStyleSheet,
            t,
            o.styleMirror
        );
        return (
            ((f && f !== -1) || (m && m !== -1)) &&
                e({
                    id: f,
                    styleId: m,
                    set: { property: a, value: s, priority: c },
                    index: Ve(this.parentRule),
                }),
            i.apply(this, [a, s, c])
        );
    };
    let l = n.CSSStyleDeclaration.prototype.removeProperty;
    return (
        (n.CSSStyleDeclaration.prototype.removeProperty = function (a) {
            var s;
            if (r.has(a)) return l.apply(this, [a]);
            let { id: c, styleId: d } = ue(
                (s = this.parentRule) === null || s === void 0
                    ? void 0
                    : s.parentStyleSheet,
                t,
                o.styleMirror
            );
            return (
                ((c && c !== -1) || (d && d !== -1)) &&
                    e({
                        id: c,
                        styleId: d,
                        remove: { property: a },
                        index: Ve(this.parentRule),
                    }),
                l.apply(this, [a])
            );
        }),
        () => {
            (n.CSSStyleDeclaration.prototype.setProperty = i),
                (n.CSSStyleDeclaration.prototype.removeProperty = l);
        }
    );
}
function Xr({
    mediaInteractionCb: e,
    blockClass: t,
    blockSelector: r,
    mirror: o,
    sampling: n,
}) {
    let i = (a) =>
            Ee((s) => {
                let c = ke(s);
                if (!c || B(c, t, r, !0)) return;
                let {
                    currentTime: d,
                    volume: f,
                    muted: m,
                    playbackRate: g,
                } = c;
                e({
                    type: a,
                    id: o.getId(c),
                    currentTime: d,
                    volume: f,
                    muted: m,
                    playbackRate: g,
                });
            }, n.media || 500),
        l = [
            Q('play', i(0)),
            Q('pause', i(1)),
            Q('seeked', i(2)),
            Q('volumechange', i(3)),
            Q('ratechange', i(4)),
        ];
    return () => {
        l.forEach((a) => a());
    };
}
function $r({ fontCb: e, doc: t }) {
    let r = t.defaultView;
    if (!r) return () => {};
    let o = [],
        n = new WeakMap(),
        i = r.FontFace;
    r.FontFace = function (s, c, d) {
        let f = new i(s, c, d);
        return (
            n.set(f, {
                family: s,
                buffer: typeof c != 'string',
                descriptors: d,
                fontSource:
                    typeof c == 'string'
                        ? c
                        : JSON.stringify(Array.from(new Uint8Array(c))),
            }),
            f
        );
    };
    let l = ie(t.fonts, 'add', function (a) {
        return function (s) {
            return (
                setTimeout(() => {
                    let c = n.get(s);
                    c && (e(c), n.delete(s));
                }, 0),
                a.apply(this, [s])
            );
        };
    });
    return (
        o.push(() => {
            r.FontFace = i;
        }),
        o.push(l),
        () => {
            o.forEach((a) => a());
        }
    );
}
function eo(e) {
    let {
            doc: t,
            mirror: r,
            blockClass: o,
            blockSelector: n,
            selectionCb: i,
        } = e,
        l = !0,
        a = () => {
            let s = t.getSelection();
            if (!s || (l && s?.isCollapsed)) return;
            l = s.isCollapsed || !1;
            let c = [],
                d = s.rangeCount || 0;
            for (let f = 0; f < d; f++) {
                let m = s.getRangeAt(f),
                    {
                        startContainer: g,
                        startOffset: p,
                        endContainer: S,
                        endOffset: k,
                    } = m;
                B(g, o, n, !0) ||
                    B(S, o, n, !0) ||
                    c.push({
                        start: r.getId(g),
                        startOffset: p,
                        end: r.getId(S),
                        endOffset: k,
                    });
            }
            i({ ranges: c });
        };
    return a(), Q('selectionchange', a);
}
function to(e, t) {
    let {
        mutationCb: r,
        mousemoveCb: o,
        mouseInteractionCb: n,
        scrollCb: i,
        viewportResizeCb: l,
        inputCb: a,
        mediaInteractionCb: s,
        styleSheetRuleCb: c,
        styleDeclarationCb: d,
        canvasMutationCb: f,
        fontCb: m,
        selectionCb: g,
    } = e;
    (e.mutationCb = (...p) => {
        t.mutation && t.mutation(...p), r(...p);
    }),
        (e.mousemoveCb = (...p) => {
            t.mousemove && t.mousemove(...p), o(...p);
        }),
        (e.mouseInteractionCb = (...p) => {
            t.mouseInteraction && t.mouseInteraction(...p), n(...p);
        }),
        (e.scrollCb = (...p) => {
            t.scroll && t.scroll(...p), i(...p);
        }),
        (e.viewportResizeCb = (...p) => {
            t.viewportResize && t.viewportResize(...p), l(...p);
        }),
        (e.inputCb = (...p) => {
            t.input && t.input(...p), a(...p);
        }),
        (e.mediaInteractionCb = (...p) => {
            t.mediaInteaction && t.mediaInteaction(...p), s(...p);
        }),
        (e.styleSheetRuleCb = (...p) => {
            t.styleSheetRule && t.styleSheetRule(...p), c(...p);
        }),
        (e.styleDeclarationCb = (...p) => {
            t.styleDeclaration && t.styleDeclaration(...p), d(...p);
        }),
        (e.canvasMutationCb = (...p) => {
            t.canvasMutation && t.canvasMutation(...p), f(...p);
        }),
        (e.fontCb = (...p) => {
            t.font && t.font(...p), m(...p);
        }),
        (e.selectionCb = (...p) => {
            t.selection && t.selection(...p), g(...p);
        });
}
function Kt(e, t = {}) {
    let r = e.doc.defaultView;
    if (!r) return () => {};
    to(e, t);
    let o = ft(e, e.doc),
        n = Kr(e),
        i = zr(e),
        l = pt(e),
        a = Yr(e),
        s = Qr(e),
        c = Xr(e),
        d = jr(e, { win: r }),
        f = mt(e, e.doc),
        m = qr(e, { win: r }),
        g = e.collectFonts ? $r(e) : () => {},
        p = eo(e),
        S = [];
    for (let k of e.plugins) S.push(k.observer(k.callback, r, k.options));
    return () => {
        fe.forEach((k) => k.reset()),
            o.disconnect(),
            n(),
            i(),
            l(),
            a(),
            s(),
            c(),
            d(),
            f(),
            m(),
            g(),
            p(),
            S.forEach((k) => k());
    };
}
var Ne = class {
    constructor(t) {
        (this.generateIdFn = t),
            (this.iframeIdToRemoteIdMap = new WeakMap()),
            (this.iframeRemoteIdToIdMap = new WeakMap());
    }
    getId(t, r, o, n) {
        let i = o || this.getIdToRemoteIdMap(t),
            l = n || this.getRemoteIdToIdMap(t),
            a = i.get(r);
        return a || ((a = this.generateIdFn()), i.set(r, a), l.set(a, r)), a;
    }
    getIds(t, r) {
        let o = this.getIdToRemoteIdMap(t),
            n = this.getRemoteIdToIdMap(t);
        return r.map((i) => this.getId(t, i, o, n));
    }
    getRemoteId(t, r, o) {
        let n = o || this.getRemoteIdToIdMap(t);
        if (typeof r != 'number') return r;
        let i = n.get(r);
        return i || -1;
    }
    getRemoteIds(t, r) {
        let o = this.getRemoteIdToIdMap(t);
        return r.map((n) => this.getRemoteId(t, n, o));
    }
    reset(t) {
        if (!t) {
            (this.iframeIdToRemoteIdMap = new WeakMap()),
                (this.iframeRemoteIdToIdMap = new WeakMap());
            return;
        }
        this.iframeIdToRemoteIdMap.delete(t),
            this.iframeRemoteIdToIdMap.delete(t);
    }
    getIdToRemoteIdMap(t) {
        let r = this.iframeIdToRemoteIdMap.get(t);
        return r || ((r = new Map()), this.iframeIdToRemoteIdMap.set(t, r)), r;
    }
    getRemoteIdToIdMap(t) {
        let r = this.iframeRemoteIdToIdMap.get(t);
        return r || ((r = new Map()), this.iframeRemoteIdToIdMap.set(t, r)), r;
    }
};
var Ze = class {
    constructor(t) {
        (this.iframes = new WeakMap()),
            (this.crossOriginIframeMap = new WeakMap()),
            (this.crossOriginIframeMirror = new Ne(nt)),
            (this.mutationCb = t.mutationCb),
            (this.wrappedEmit = t.wrappedEmit),
            (this.stylesheetManager = t.stylesheetManager),
            (this.recordCrossOriginIframes = t.recordCrossOriginIframes),
            (this.crossOriginIframeStyleMirror = new Ne(
                this.stylesheetManager.styleMirror.generateId.bind(
                    this.stylesheetManager.styleMirror
                )
            )),
            (this.mirror = t.mirror),
            this.recordCrossOriginIframes &&
                window.addEventListener(
                    'message',
                    this.handleMessage.bind(this)
                );
    }
    addIframe(t) {
        this.iframes.set(t, !0),
            t.contentWindow &&
                this.crossOriginIframeMap.set(t.contentWindow, t);
    }
    addLoadListener(t) {
        this.loadListener = t;
    }
    attachIframe(t, r) {
        var o;
        this.mutationCb({
            adds: [{ parentId: this.mirror.getId(t), nextId: null, node: r }],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0,
        }),
            (o = this.loadListener) === null || o === void 0 || o.call(this, t),
            t.contentDocument &&
                t.contentDocument.adoptedStyleSheets &&
                t.contentDocument.adoptedStyleSheets.length > 0 &&
                this.stylesheetManager.adoptStyleSheets(
                    t.contentDocument.adoptedStyleSheets,
                    this.mirror.getId(t.contentDocument)
                );
    }
    handleMessage(t) {
        if (t.data.type === 'rrweb') {
            if (!t.source) return;
            let o = this.crossOriginIframeMap.get(t.source);
            if (!o) return;
            let n = this.transformCrossOriginEvent(o, t.data.event);
            n && this.wrappedEmit(n, t.data.isCheckout);
        }
    }
    transformCrossOriginEvent(t, r) {
        var o;
        switch (r.type) {
            case M.FullSnapshot:
                return (
                    this.crossOriginIframeMirror.reset(t),
                    this.crossOriginIframeStyleMirror.reset(t),
                    this.replaceIdOnNode(r.data.node, t),
                    {
                        timestamp: r.timestamp,
                        type: M.IncrementalSnapshot,
                        data: {
                            source: N.Mutation,
                            adds: [
                                {
                                    parentId: this.mirror.getId(t),
                                    nextId: null,
                                    node: r.data.node,
                                },
                            ],
                            removes: [],
                            texts: [],
                            attributes: [],
                            isAttachIframe: !0,
                        },
                    }
                );
            case M.Meta:
            case M.Load:
            case M.DomContentLoaded:
                return !1;
            case M.Plugin:
                return r;
            case M.Custom:
                return (
                    this.replaceIds(r.data.payload, t, [
                        'id',
                        'parentId',
                        'previousId',
                        'nextId',
                    ]),
                    r
                );
            case M.IncrementalSnapshot:
                switch (r.data.source) {
                    case N.Mutation:
                        return (
                            r.data.adds.forEach((n) => {
                                this.replaceIds(n, t, [
                                    'parentId',
                                    'nextId',
                                    'previousId',
                                ]),
                                    this.replaceIdOnNode(n.node, t);
                            }),
                            r.data.removes.forEach((n) => {
                                this.replaceIds(n, t, ['parentId', 'id']);
                            }),
                            r.data.attributes.forEach((n) => {
                                this.replaceIds(n, t, ['id']);
                            }),
                            r.data.texts.forEach((n) => {
                                this.replaceIds(n, t, ['id']);
                            }),
                            r
                        );
                    case N.Drag:
                    case N.TouchMove:
                    case N.MouseMove:
                        return (
                            r.data.positions.forEach((n) => {
                                this.replaceIds(n, t, ['id']);
                            }),
                            r
                        );
                    case N.ViewportResize:
                        return !1;
                    case N.MediaInteraction:
                    case N.MouseInteraction:
                    case N.Scroll:
                    case N.CanvasMutation:
                    case N.Input:
                        return this.replaceIds(r.data, t, ['id']), r;
                    case N.StyleSheetRule:
                    case N.StyleDeclaration:
                        return (
                            this.replaceIds(r.data, t, ['id']),
                            this.replaceStyleIds(r.data, t, ['styleId']),
                            r
                        );
                    case N.Font:
                        return r;
                    case N.Selection:
                        return (
                            r.data.ranges.forEach((n) => {
                                this.replaceIds(n, t, ['start', 'end']);
                            }),
                            r
                        );
                    case N.AdoptedStyleSheet:
                        return (
                            this.replaceIds(r.data, t, ['id']),
                            this.replaceStyleIds(r.data, t, ['styleIds']),
                            (o = r.data.styles) === null ||
                                o === void 0 ||
                                o.forEach((n) => {
                                    this.replaceStyleIds(n, t, ['styleId']);
                                }),
                            r
                        );
                }
        }
    }
    replace(t, r, o, n) {
        for (let i of n)
            (!Array.isArray(r[i]) && typeof r[i] != 'number') ||
                (Array.isArray(r[i])
                    ? (r[i] = t.getIds(o, r[i]))
                    : (r[i] = t.getId(o, r[i])));
        return r;
    }
    replaceIds(t, r, o) {
        return this.replace(this.crossOriginIframeMirror, t, r, o);
    }
    replaceStyleIds(t, r, o) {
        return this.replace(this.crossOriginIframeStyleMirror, t, r, o);
    }
    replaceIdOnNode(t, r) {
        this.replaceIds(t, r, ['id']),
            'childNodes' in t &&
                t.childNodes.forEach((o) => {
                    this.replaceIdOnNode(o, r);
                });
    }
};
var Ke = class {
    constructor(t) {
        (this.shadowDoms = new WeakSet()),
            (this.restorePatches = []),
            (this.mutationCb = t.mutationCb),
            (this.scrollCb = t.scrollCb),
            (this.bypassOptions = t.bypassOptions),
            (this.mirror = t.mirror);
        let r = this;
        this.restorePatches.push(
            ie(Element.prototype, 'attachShadow', function (o) {
                return function (n) {
                    let i = o.call(this, n);
                    return (
                        this.shadowRoot &&
                            r.addShadowRoot(
                                this.shadowRoot,
                                this.ownerDocument
                            ),
                        i
                    );
                };
            })
        );
    }
    addShadowRoot(t, r) {
        me(t) &&
            (this.shadowDoms.has(t) ||
                (this.shadowDoms.add(t),
                ft(
                    Object.assign(Object.assign({}, this.bypassOptions), {
                        doc: r,
                        mutationCb: this.mutationCb,
                        mirror: this.mirror,
                        shadowDomManager: this,
                    }),
                    t
                ),
                pt(
                    Object.assign(Object.assign({}, this.bypassOptions), {
                        scrollCb: this.scrollCb,
                        doc: t,
                        mirror: this.mirror,
                    })
                ),
                setTimeout(() => {
                    t.adoptedStyleSheets &&
                        t.adoptedStyleSheets.length > 0 &&
                        this.bypassOptions.stylesheetManager.adoptStyleSheets(
                            t.adoptedStyleSheets,
                            this.mirror.getId(t.host)
                        ),
                        mt(
                            {
                                mirror: this.mirror,
                                stylesheetManager:
                                    this.bypassOptions.stylesheetManager,
                            },
                            t
                        );
                }, 0)));
    }
    observeAttachShadow(t) {
        if (t.contentWindow) {
            let r = this;
            this.restorePatches.push(
                ie(
                    t.contentWindow.HTMLElement.prototype,
                    'attachShadow',
                    function (o) {
                        return function (n) {
                            let i = o.call(this, n);
                            return (
                                this.shadowRoot &&
                                    r.addShadowRoot(
                                        this.shadowRoot,
                                        t.contentDocument
                                    ),
                                i
                            );
                        };
                    }
                )
            );
        }
    }
    reset() {
        this.restorePatches.forEach((t) => t()),
            (this.shadowDoms = new WeakSet());
    }
};
function zt(e, t) {
    var r = {};
    for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) &&
            t.indexOf(o) < 0 &&
            (r[o] = e[o]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var n = 0, o = Object.getOwnPropertySymbols(e); n < o.length; n++)
            t.indexOf(o[n]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, o[n]) &&
                (r[o[n]] = e[o[n]]);
    return r;
}
function Yt(e, t, r, o) {
    function n(i) {
        return i instanceof r
            ? i
            : new r(function (l) {
                  l(i);
              });
    }
    return new (r || (r = Promise))(function (i, l) {
        function a(d) {
            try {
                c(o.next(d));
            } catch (f) {
                l(f);
            }
        }
        function s(d) {
            try {
                c(o.throw(d));
            } catch (f) {
                l(f);
            }
        }
        function c(d) {
            d.done ? i(d.value) : n(d.value).then(a, s);
        }
        c((o = o.apply(e, t || [])).next());
    });
}
var Ae = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    ro = typeof Uint8Array > 'u' ? [] : new Uint8Array(256);
for (Me = 0; Me < Ae.length; Me++) ro[Ae.charCodeAt(Me)] = Me;
var Me,
    Jt = function (e) {
        var t = new Uint8Array(e),
            r,
            o = t.length,
            n = '';
        for (r = 0; r < o; r += 3)
            (n += Ae[t[r] >> 2]),
                (n += Ae[((t[r] & 3) << 4) | (t[r + 1] >> 4)]),
                (n += Ae[((t[r + 1] & 15) << 2) | (t[r + 2] >> 6)]),
                (n += Ae[t[r + 2] & 63]);
        return (
            o % 3 === 2
                ? (n = n.substring(0, n.length - 1) + '=')
                : o % 3 === 1 && (n = n.substring(0, n.length - 2) + '=='),
            n
        );
    };
var Qt = new Map();
function oo(e, t) {
    let r = Qt.get(e);
    return (
        r || ((r = new Map()), Qt.set(e, r)), r.has(t) || r.set(t, []), r.get(t)
    );
}
var ht = (e, t, r) => {
    if (!e || !(jt(e, t) || typeof e == 'object')) return;
    let o = e.constructor.name,
        n = oo(r, o),
        i = n.indexOf(e);
    return i === -1 && ((i = n.length), n.push(e)), i;
};
function ze(e, t, r) {
    if (e instanceof Array) return e.map((o) => ze(o, t, r));
    if (e === null) return e;
    if (
        e instanceof Float32Array ||
        e instanceof Float64Array ||
        e instanceof Int32Array ||
        e instanceof Uint32Array ||
        e instanceof Uint8Array ||
        e instanceof Uint16Array ||
        e instanceof Int16Array ||
        e instanceof Int8Array ||
        e instanceof Uint8ClampedArray
    )
        return { rr_type: e.constructor.name, args: [Object.values(e)] };
    if (e instanceof ArrayBuffer) {
        let o = e.constructor.name,
            n = Jt(e);
        return { rr_type: o, base64: n };
    } else {
        if (e instanceof DataView)
            return {
                rr_type: e.constructor.name,
                args: [ze(e.buffer, t, r), e.byteOffset, e.byteLength],
            };
        if (e instanceof HTMLImageElement) {
            let o = e.constructor.name,
                { src: n } = e;
            return { rr_type: o, src: n };
        } else if (e instanceof HTMLCanvasElement) {
            let o = 'HTMLImageElement',
                n = e.toDataURL();
            return { rr_type: o, src: n };
        } else {
            if (e instanceof ImageData)
                return {
                    rr_type: e.constructor.name,
                    args: [ze(e.data, t, r), e.width, e.height],
                };
            if (jt(e, t) || typeof e == 'object') {
                let o = e.constructor.name,
                    n = ht(e, t, r);
                return { rr_type: o, index: n };
            }
        }
    }
    return e;
}
var Ye = (e, t, r) => [...e].map((o) => ze(o, t, r)),
    jt = (e, t) =>
        !![
            'WebGLActiveInfo',
            'WebGLBuffer',
            'WebGLFramebuffer',
            'WebGLProgram',
            'WebGLRenderbuffer',
            'WebGLShader',
            'WebGLShaderPrecisionFormat',
            'WebGLTexture',
            'WebGLUniformLocation',
            'WebGLVertexArrayObject',
            'WebGLVertexArrayObjectOES',
        ]
            .filter((n) => typeof t[n] == 'function')
            .find((n) => e instanceof t[n]);
function qt(e, t, r, o) {
    let n = [],
        i = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
    for (let l of i)
        try {
            if (typeof t.CanvasRenderingContext2D.prototype[l] != 'function')
                continue;
            let a = ie(t.CanvasRenderingContext2D.prototype, l, function (s) {
                return function (...c) {
                    return (
                        B(this.canvas, r, o, !0) ||
                            setTimeout(() => {
                                let d = Ye([...c], t, this);
                                e(this.canvas, {
                                    type: ce['2D'],
                                    property: l,
                                    args: d,
                                });
                            }, 0),
                        s.apply(this, c)
                    );
                };
            });
            n.push(a);
        } catch {
            let s = ye(t.CanvasRenderingContext2D.prototype, l, {
                set(c) {
                    e(this.canvas, {
                        type: ce['2D'],
                        property: l,
                        args: [c],
                        setter: !0,
                    });
                },
            });
            n.push(s);
        }
    return () => {
        n.forEach((l) => l());
    };
}
function gt(e, t, r) {
    let o = [];
    try {
        let n = ie(e.HTMLCanvasElement.prototype, 'getContext', function (i) {
            return function (l, ...a) {
                return (
                    B(this, t, r, !0) ||
                        '__context' in this ||
                        (this.__context = l),
                    i.apply(this, [l, ...a])
                );
            };
        });
        o.push(n);
    } catch {
        console.error('failed to patch HTMLCanvasElement.prototype.getContext');
    }
    return () => {
        o.forEach((n) => n());
    };
}
function Xt(e, t, r, o, n, i, l) {
    let a = [],
        s = Object.getOwnPropertyNames(e);
    for (let c of s)
        if (
            ![
                'isContextLost',
                'canvas',
                'drawingBufferWidth',
                'drawingBufferHeight',
            ].includes(c)
        )
            try {
                if (typeof e[c] != 'function') continue;
                let d = ie(e, c, function (f) {
                    return function (...m) {
                        let g = f.apply(this, m);
                        if ((ht(g, l, this), !B(this.canvas, o, n, !0))) {
                            let p = Ye([...m], l, this),
                                S = { type: t, property: c, args: p };
                            r(this.canvas, S);
                        }
                        return g;
                    };
                });
                a.push(d);
            } catch {
                let f = ye(e, c, {
                    set(m) {
                        r(this.canvas, {
                            type: t,
                            property: c,
                            args: [m],
                            setter: !0,
                        });
                    },
                });
                a.push(f);
            }
    return a;
}
function $t(e, t, r, o, n) {
    let i = [];
    return (
        i.push(
            ...Xt(t.WebGLRenderingContext.prototype, ce.WebGL, e, r, o, n, t)
        ),
        typeof t.WebGL2RenderingContext < 'u' &&
            i.push(
                ...Xt(
                    t.WebGL2RenderingContext.prototype,
                    ce.WebGL2,
                    e,
                    r,
                    o,
                    n,
                    t
                )
            ),
        () => {
            i.forEach((l) => l());
        }
    );
}
var yt = null;
try {
    (er =
        (typeof module < 'u' &&
            typeof module.require == 'function' &&
            module.require('worker_threads')) ||
        (typeof __non_webpack_require__ == 'function' &&
            __non_webpack_require__('worker_threads')) ||
        (typeof $e == 'function' && $e('worker_threads'))),
        (yt = er.Worker);
} catch {}
var er;
function no(e, t) {
    return Buffer.from(e, 'base64').toString(t ? 'utf16' : 'utf8');
}
function tr(e, t, r) {
    var o = t === void 0 ? null : t,
        n = r === void 0 ? !1 : r,
        i = no(e, n),
        l =
            i.indexOf(
                `
`,
                10
            ) + 1,
        a = i.substring(l) + (o ? '//# sourceMappingURL=' + o : '');
    return function (c) {
        return new yt(a, Object.assign({}, c, { eval: !0 }));
    };
}
function io(e, t) {
    var r = atob(e);
    if (t) {
        for (var o = new Uint8Array(r.length), n = 0, i = r.length; n < i; ++n)
            o[n] = r.charCodeAt(n);
        return String.fromCharCode.apply(null, new Uint16Array(o.buffer));
    }
    return r;
}
function so(e, t, r) {
    var o = t === void 0 ? null : t,
        n = r === void 0 ? !1 : r,
        i = io(e, n),
        l =
            i.indexOf(
                `
`,
                10
            ) + 1,
        a = i.substring(l) + (o ? '//# sourceMappingURL=' + o : ''),
        s = new Blob([a], { type: 'application/javascript' });
    return URL.createObjectURL(s);
}
function rr(e, t, r) {
    var o;
    return function (i) {
        return (o = o || so(e, t, r)), new Worker(o, i);
    };
}
var ao =
    Object.prototype.toString.call(typeof process < 'u' ? process : 0) ===
    '[object process]';
function or() {
    return ao;
}
function nr(e, t, r) {
    return or() ? tr(e, t, r) : rr(e, t, r);
}
var ir = nr(
    'Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55DQogICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLg0KDQogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkNCiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsDQogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1INCiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SDQogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqLw0KDQogICAgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikgew0KICAgICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7DQogICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfQ0KICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpOw0KICAgICAgICB9KTsNCiAgICB9CgogICAgLyoKICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj4KICAgICAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+CiAgICAgKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZQogICAgICovCiAgICB2YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7CiAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguCiAgICB2YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpOwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykgewogICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7CiAgICB9CiAgICB2YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7CiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykgewogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JzsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGJhc2U2NDsKICAgIH07CgogICAgY29uc3QgbGFzdEJsb2JNYXAgPSBuZXcgTWFwKCk7DQogICAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGZ1bmN0aW9uIGdldFRyYW5zcGFyZW50QmxvYkZvcih3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucykgew0KICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgICAgICAgICAgY29uc3QgaWQgPSBgJHt3aWR0aH0tJHtoZWlnaHR9YDsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50QmxvYk1hcC5oYXMoaWQpKQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwYXJlbnRCbG9iTWFwLmdldChpZCk7DQogICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsNCiAgICAgICAgICAgICAgICBvZmZzY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0geWllbGQgYmxvYi5hcnJheUJ1ZmZlcigpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7DQogICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZTY0Ow0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICcnOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgY29uc3Qgd29ya2VyID0gc2VsZjsNCiAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgYml0bWFwLCB3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucyB9ID0gZS5kYXRhOw0KICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IG9mZnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpOw0KICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYml0bWFwLCAwLCAwKTsNCiAgICAgICAgICAgICAgICBiaXRtYXAuY2xvc2UoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9iLnR5cGU7DQogICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSB5aWVsZCBibG9iLmFycmF5QnVmZmVyKCk7DQogICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZW5jb2RlKGFycmF5QnVmZmVyKTsNCiAgICAgICAgICAgICAgICBpZiAoIWxhc3RCbG9iTWFwLmhhcyhpZCkgJiYgKHlpZWxkIHRyYW5zcGFyZW50QmFzZTY0KSA9PT0gYmFzZTY0KSB7DQogICAgICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkIH0pOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgaWQsDQogICAgICAgICAgICAgICAgICAgIHR5cGUsDQogICAgICAgICAgICAgICAgICAgIGJhc2U2NCwNCiAgICAgICAgICAgICAgICAgICAgd2lkdGgsDQogICAgICAgICAgICAgICAgICAgIGhlaWdodCwNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfTsKCn0pKCk7Cgo=',
    null,
    !1
);
var Je = class {
    constructor(t) {
        (this.pendingCanvasMutations = new Map()),
            (this.rafStamps = { latestId: 0, invokeId: null }),
            (this.frozen = !1),
            (this.locked = !1),
            (this.processMutation = (s, c) => {
                ((this.rafStamps.invokeId &&
                    this.rafStamps.latestId !== this.rafStamps.invokeId) ||
                    !this.rafStamps.invokeId) &&
                    (this.rafStamps.invokeId = this.rafStamps.latestId),
                    this.pendingCanvasMutations.has(s) ||
                        this.pendingCanvasMutations.set(s, []),
                    this.pendingCanvasMutations.get(s).push(c);
            });
        let {
            sampling: r = 'all',
            win: o,
            blockClass: n,
            blockSelector: i,
            recordCanvas: l,
            dataURLOptions: a,
        } = t;
        (this.mutationCb = t.mutationCb),
            (this.mirror = t.mirror),
            l && r === 'all' && this.initCanvasMutationObserver(o, n, i),
            l &&
                typeof r == 'number' &&
                this.initCanvasFPSObserver(r, o, n, i, { dataURLOptions: a });
    }
    reset() {
        this.pendingCanvasMutations.clear(),
            this.resetObservers && this.resetObservers();
    }
    freeze() {
        this.frozen = !0;
    }
    unfreeze() {
        this.frozen = !1;
    }
    lock() {
        this.locked = !0;
    }
    unlock() {
        this.locked = !1;
    }
    initCanvasFPSObserver(t, r, o, n, i) {
        let l = gt(r, o, n),
            a = new Map(),
            s = new ir();
        s.onmessage = (p) => {
            let { id: S } = p.data;
            if ((a.set(S, !1), !('base64' in p.data))) return;
            let { base64: k, type: T, width: I, height: y } = p.data;
            this.mutationCb({
                id: S,
                type: ce['2D'],
                commands: [
                    { property: 'clearRect', args: [0, 0, I, y] },
                    {
                        property: 'drawImage',
                        args: [
                            {
                                rr_type: 'ImageBitmap',
                                args: [
                                    {
                                        rr_type: 'Blob',
                                        data: [
                                            {
                                                rr_type: 'ArrayBuffer',
                                                base64: k,
                                            },
                                        ],
                                        type: T,
                                    },
                                ],
                            },
                            0,
                            0,
                        ],
                    },
                ],
            });
        };
        let c = 1e3 / t,
            d = 0,
            f,
            m = () => {
                let p = [];
                return (
                    r.document.querySelectorAll('canvas').forEach((S) => {
                        B(S, o, n, !0) || p.push(S);
                    }),
                    p
                );
            },
            g = (p) => {
                if (d && p - d < c) {
                    f = requestAnimationFrame(g);
                    return;
                }
                (d = p),
                    m().forEach((S) =>
                        Yt(this, void 0, void 0, function* () {
                            var k;
                            let T = this.mirror.getId(S);
                            if (a.get(T)) return;
                            if (
                                (a.set(T, !0),
                                ['webgl', 'webgl2'].includes(S.__context))
                            ) {
                                let y = S.getContext(S.__context);
                                ((k = y?.getContextAttributes()) === null ||
                                k === void 0
                                    ? void 0
                                    : k.preserveDrawingBuffer) === !1 &&
                                    y?.clear(y.COLOR_BUFFER_BIT);
                            }
                            let I = yield createImageBitmap(S);
                            s.postMessage(
                                {
                                    id: T,
                                    bitmap: I,
                                    width: S.width,
                                    height: S.height,
                                    dataURLOptions: i.dataURLOptions,
                                },
                                [I]
                            );
                        })
                    ),
                    (f = requestAnimationFrame(g));
            };
        (f = requestAnimationFrame(g)),
            (this.resetObservers = () => {
                l(), cancelAnimationFrame(f);
            });
    }
    initCanvasMutationObserver(t, r, o) {
        this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
        let n = gt(t, r, o),
            i = qt(this.processMutation.bind(this), t, r, o),
            l = $t(this.processMutation.bind(this), t, r, o, this.mirror);
        this.resetObservers = () => {
            n(), i(), l();
        };
    }
    startPendingCanvasMutationFlusher() {
        requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    startRAFTimestamping() {
        let t = (r) => {
            (this.rafStamps.latestId = r), requestAnimationFrame(t);
        };
        requestAnimationFrame(t);
    }
    flushPendingCanvasMutations() {
        this.pendingCanvasMutations.forEach((t, r) => {
            let o = this.mirror.getId(r);
            this.flushPendingCanvasMutationFor(r, o);
        }),
            requestAnimationFrame(() => this.flushPendingCanvasMutations());
    }
    flushPendingCanvasMutationFor(t, r) {
        if (this.frozen || this.locked) return;
        let o = this.pendingCanvasMutations.get(t);
        if (!o || r === -1) return;
        let n = o.map((l) => zt(l, ['type'])),
            { type: i } = o[0];
        this.mutationCb({ id: r, type: i, commands: n }),
            this.pendingCanvasMutations.delete(t);
    }
};
var Qe = class {
    constructor(t) {
        (this.trackedLinkElements = new WeakSet()),
            (this.styleMirror = new De()),
            (this.mutationCb = t.mutationCb),
            (this.adoptedStyleSheetCb = t.adoptedStyleSheetCb);
    }
    attachLinkElement(t, r) {
        '_cssText' in r.attributes &&
            this.mutationCb({
                adds: [],
                removes: [],
                texts: [],
                attributes: [{ id: r.id, attributes: r.attributes }],
            }),
            this.trackLinkElement(t);
    }
    trackLinkElement(t) {
        this.trackedLinkElements.has(t) ||
            (this.trackedLinkElements.add(t),
            this.trackStylesheetInLinkElement(t));
    }
    adoptStyleSheets(t, r) {
        if (t.length === 0) return;
        let o = { id: r, styleIds: [] },
            n = [];
        for (let i of t) {
            let l;
            if (this.styleMirror.has(i)) l = this.styleMirror.getId(i);
            else {
                l = this.styleMirror.add(i);
                let a = Array.from(i.rules || CSSRule);
                n.push({
                    styleId: l,
                    rules: a.map((s, c) => ({ rule: ot(s), index: c })),
                });
            }
            o.styleIds.push(l);
        }
        n.length > 0 && (o.styles = n), this.adoptedStyleSheetCb(o);
    }
    reset() {
        this.styleMirror.reset(), (this.trackedLinkElements = new WeakSet());
    }
    trackStylesheetInLinkElement(t) {}
};
function Z(e) {
    return Object.assign(Object.assign({}, e), { timestamp: Date.now() });
}
var G,
    je,
    It,
    qe = !1,
    se = kt();
function Ie(e = {}) {
    let {
            emit: t,
            checkoutEveryNms: r,
            checkoutEveryNth: o,
            blockClass: n = 'rr-block',
            blockSelector: i = null,
            ignoreClass: l = 'rr-ignore',
            maskTextClass: a = 'rr-mask',
            maskTextSelector: s = null,
            inlineStylesheet: c = !0,
            maskAllInputs: d,
            maskInputOptions: f,
            slimDOMOptions: m,
            maskInputFn: g,
            maskTextFn: p,
            hooks: S,
            packFn: k,
            sampling: T = {},
            dataURLOptions: I = {},
            mousemoveWait: y,
            recordCanvas: R = !1,
            recordCrossOriginIframes: J = !1,
            userTriggeredOnInput: U = !1,
            collectFonts: K = !1,
            inlineImages: x = !1,
            plugins: j,
            keepIframeSrcFn: u = () => !1,
            ignoreCSSAttributes: C = new Set([]),
        } = e,
        v = J ? window.parent === window : !0,
        h = !1;
    if (!v)
        try {
            window.parent.document, (h = !1);
        } catch {
            h = !0;
        }
    if (v && !t) throw new Error('emit function is required');
    y !== void 0 && T.mousemove === void 0 && (T.mousemove = y), se.reset();
    let E =
            d === !0
                ? {
                      color: !0,
                      date: !0,
                      'datetime-local': !0,
                      email: !0,
                      month: !0,
                      number: !0,
                      range: !0,
                      search: !0,
                      tel: !0,
                      text: !0,
                      time: !0,
                      url: !0,
                      week: !0,
                      textarea: !0,
                      select: !0,
                      password: !0,
                  }
                : f !== void 0
                ? f
                : { password: !0 },
        A =
            m === !0 || m === 'all'
                ? {
                      script: !0,
                      comment: !0,
                      headFavicon: !0,
                      headWhitespace: !0,
                      headMetaSocial: !0,
                      headMetaRobots: !0,
                      headMetaHttpEquiv: !0,
                      headMetaVerification: !0,
                      headMetaAuthorship: m === 'all',
                      headMetaDescKeywords: m === 'all',
                  }
                : m || {};
    Ot();
    let L,
        W = 0,
        V = (w) => {
            for (let q of j || [])
                q.eventProcessor && (w = q.eventProcessor(w));
            return k && (w = k(w)), w;
        };
    G = (w, q) => {
        var $;
        if (
            (!(($ = fe[0]) === null || $ === void 0) &&
                $.isFrozen() &&
                w.type !== M.FullSnapshot &&
                !(
                    w.type === M.IncrementalSnapshot &&
                    w.data.source === N.Mutation
                ) &&
                fe.forEach((_) => _.unfreeze()),
            v)
        )
            t?.(V(w), q);
        else if (h) {
            let _ = { type: 'rrweb', event: V(w), isCheckout: q };
            window.parent.postMessage(_, '*');
        }
        if (w.type === M.FullSnapshot) (L = w), (W = 0);
        else if (w.type === M.IncrementalSnapshot) {
            if (w.data.source === N.Mutation && w.data.isAttachIframe) return;
            W++;
            let _ = o && W >= o,
                oe = r && w.timestamp - L.timestamp > r;
            (_ || oe) && je(!0);
        }
    };
    let z = (w) => {
            G(
                Z({
                    type: M.IncrementalSnapshot,
                    data: Object.assign({ source: N.Mutation }, w),
                })
            );
        },
        re = (w) =>
            G(
                Z({
                    type: M.IncrementalSnapshot,
                    data: Object.assign({ source: N.Scroll }, w),
                })
            ),
        de = (w) =>
            G(
                Z({
                    type: M.IncrementalSnapshot,
                    data: Object.assign({ source: N.CanvasMutation }, w),
                })
            ),
        H = (w) =>
            G(
                Z({
                    type: M.IncrementalSnapshot,
                    data: Object.assign({ source: N.AdoptedStyleSheet }, w),
                })
            ),
        ne = new Qe({ mutationCb: z, adoptedStyleSheetCb: H }),
        ae = new Ze({
            mirror: se,
            mutationCb: z,
            stylesheetManager: ne,
            recordCrossOriginIframes: J,
            wrappedEmit: G,
        });
    for (let w of j || [])
        w.getMirror &&
            w.getMirror({
                nodeMirror: se,
                crossOriginIframeMirror: ae.crossOriginIframeMirror,
                crossOriginIframeStyleMirror: ae.crossOriginIframeStyleMirror,
            });
    It = new Je({
        recordCanvas: R,
        mutationCb: de,
        win: window,
        blockClass: n,
        blockSelector: i,
        mirror: se,
        sampling: T.canvas,
        dataURLOptions: I,
    });
    let Ce = new Ke({
        mutationCb: z,
        scrollCb: re,
        bypassOptions: {
            blockClass: n,
            blockSelector: i,
            maskTextClass: a,
            maskTextSelector: s,
            inlineStylesheet: c,
            maskInputOptions: E,
            dataURLOptions: I,
            maskTextFn: p,
            maskInputFn: g,
            recordCanvas: R,
            inlineImages: x,
            sampling: T,
            slimDOMOptions: A,
            iframeManager: ae,
            stylesheetManager: ne,
            canvasManager: It,
            keepIframeSrcFn: u,
        },
        mirror: se,
    });
    je = (w = !1) => {
        var q, $, _, oe, O, ee;
        G(
            Z({
                type: M.Meta,
                data: { href: window.location.href, width: _e(), height: Fe() },
            }),
            w
        ),
            ne.reset(),
            fe.forEach((X) => X.lock());
        let Te = Nt(document, {
            mirror: se,
            blockClass: n,
            blockSelector: i,
            maskTextClass: a,
            maskTextSelector: s,
            inlineStylesheet: c,
            maskAllInputs: E,
            maskTextFn: p,
            slimDOM: A,
            dataURLOptions: I,
            recordCanvas: R,
            inlineImages: x,
            onSerialize: (X) => {
                Be(X, se) && ae.addIframe(X),
                    Ge(X, se) && ne.trackLinkElement(X),
                    He(X) && Ce.addShadowRoot(X.shadowRoot, document);
            },
            onIframeLoad: (X, Xe) => {
                ae.attachIframe(X, Xe), Ce.observeAttachShadow(X);
            },
            onStylesheetLoad: (X, Xe) => {
                ne.attachLinkElement(X, Xe);
            },
            keepIframeSrcFn: u,
        });
        if (!Te) return console.warn('Failed to snapshot the document');
        G(
            Z({
                type: M.FullSnapshot,
                data: {
                    node: Te,
                    initialOffset: {
                        left:
                            window.pageXOffset !== void 0
                                ? window.pageXOffset
                                : document?.documentElement.scrollLeft ||
                                  (($ =
                                      (q = document?.body) === null ||
                                      q === void 0
                                          ? void 0
                                          : q.parentElement) === null ||
                                  $ === void 0
                                      ? void 0
                                      : $.scrollLeft) ||
                                  ((_ = document?.body) === null || _ === void 0
                                      ? void 0
                                      : _.scrollLeft) ||
                                  0,
                        top:
                            window.pageYOffset !== void 0
                                ? window.pageYOffset
                                : document?.documentElement.scrollTop ||
                                  ((O =
                                      (oe = document?.body) === null ||
                                      oe === void 0
                                          ? void 0
                                          : oe.parentElement) === null ||
                                  O === void 0
                                      ? void 0
                                      : O.scrollTop) ||
                                  ((ee = document?.body) === null ||
                                  ee === void 0
                                      ? void 0
                                      : ee.scrollTop) ||
                                  0,
                    },
                },
            })
        ),
            fe.forEach((X) => X.unlock()),
            document.adoptedStyleSheets &&
                document.adoptedStyleSheets.length > 0 &&
                ne.adoptStyleSheets(
                    document.adoptedStyleSheets,
                    se.getId(document)
                );
    };
    try {
        let w = [];
        w.push(
            Q('DOMContentLoaded', () => {
                G(Z({ type: M.DomContentLoaded, data: {} }));
            })
        );
        let q = (_) => {
            var oe;
            return Kt(
                {
                    mutationCb: z,
                    mousemoveCb: (O, ee) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: { source: ee, positions: O },
                            })
                        ),
                    mouseInteractionCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign(
                                    { source: N.MouseInteraction },
                                    O
                                ),
                            })
                        ),
                    scrollCb: re,
                    viewportResizeCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign(
                                    { source: N.ViewportResize },
                                    O
                                ),
                            })
                        ),
                    inputCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign({ source: N.Input }, O),
                            })
                        ),
                    mediaInteractionCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign(
                                    { source: N.MediaInteraction },
                                    O
                                ),
                            })
                        ),
                    styleSheetRuleCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign(
                                    { source: N.StyleSheetRule },
                                    O
                                ),
                            })
                        ),
                    styleDeclarationCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign(
                                    { source: N.StyleDeclaration },
                                    O
                                ),
                            })
                        ),
                    canvasMutationCb: de,
                    fontCb: (O) =>
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign({ source: N.Font }, O),
                            })
                        ),
                    selectionCb: (O) => {
                        G(
                            Z({
                                type: M.IncrementalSnapshot,
                                data: Object.assign({ source: N.Selection }, O),
                            })
                        );
                    },
                    blockClass: n,
                    ignoreClass: l,
                    maskTextClass: a,
                    maskTextSelector: s,
                    maskInputOptions: E,
                    inlineStylesheet: c,
                    sampling: T,
                    recordCanvas: R,
                    inlineImages: x,
                    userTriggeredOnInput: U,
                    collectFonts: K,
                    doc: _,
                    maskInputFn: g,
                    maskTextFn: p,
                    keepIframeSrcFn: u,
                    blockSelector: i,
                    slimDOMOptions: A,
                    dataURLOptions: I,
                    mirror: se,
                    iframeManager: ae,
                    stylesheetManager: ne,
                    shadowDomManager: Ce,
                    canvasManager: It,
                    ignoreCSSAttributes: C,
                    plugins:
                        ((oe = j?.filter((O) => O.observer)) === null ||
                        oe === void 0
                            ? void 0
                            : oe.map((O) => ({
                                  observer: O.observer,
                                  options: O.options,
                                  callback: (ee) =>
                                      G(
                                          Z({
                                              type: M.Plugin,
                                              data: {
                                                  plugin: O.name,
                                                  payload: ee,
                                              },
                                          })
                                      ),
                              }))) || [],
                },
                S
            );
        };
        ae.addLoadListener((_) => {
            w.push(q(_.contentDocument));
        });
        let $ = () => {
            je(), w.push(q(document)), (qe = !0);
        };
        return (
            document.readyState === 'interactive' ||
            document.readyState === 'complete'
                ? $()
                : w.push(
                      Q(
                          'load',
                          () => {
                              G(Z({ type: M.Load, data: {} })), $();
                          },
                          window
                      )
                  ),
            () => {
                w.forEach((_) => _()), (qe = !1);
            }
        );
    } catch (w) {
        console.warn(w);
    }
}
Ie.addCustomEvent = (e, t) => {
    if (!qe) throw new Error('please add custom event after start recording');
    G(Z({ type: M.Custom, data: { tag: e, payload: t } }));
};
Ie.freezePage = () => {
    fe.forEach((e) => e.freeze());
};
Ie.takeFullSnapshot = (e) => {
    if (!qe) throw new Error('please take full snapshot after start recording');
    je(e);
};
Ie.mirror = se;
var sr = [],
    ar = () => {
        let e = Ie({
            emit(t) {
                sr.push(t), D({ type: 'RRWEB_EVENT', event: t });
            },
            maskInputOptions: { password: !0 },
            maskTextSelector: 'input, textarea',
            ignoreClass: 'rrweb-ignore',
        });
        return (
            setInterval(() => {
                sr = [];
            }, 6e4),
            e
        );
    };
var lr = () => {
        let e = !1,
            t = () => {
                D({
                    type: 'SCROLL_POSITION',
                    payload: {
                        scrollY: window.scrollY,
                        scrollHeight: document.documentElement.scrollHeight,
                        clientHeight: window.innerHeight,
                        timestamp: Date.now(),
                    },
                }),
                    (e = !1);
            },
            r = () => {
                e || (requestAnimationFrame(t), (e = !0));
            };
        window.addEventListener('scroll', r);
    },
    cr = () => {
        let e = !1;
        function t() {
            return (
                document.documentElement.scrollHeight >
                document.documentElement.clientHeight
            );
        }
        function r() {
            e || (t() && ((e = !0), D({ type: 'SCROLLABLE' })));
        }
        r(),
            document.readyState === 'loading' &&
                document.addEventListener('DOMContentLoaded', r),
            window.addEventListener('load', r),
            setTimeout(r, 500);
    };
var co = (e) => {
        let t = (r) => {
            let n = {
                type: 'node',
                children: [],
                attrs: [...r.attributes].reduce(
                    (i, l) => ((i[l.name] = l.value), i),
                    {}
                ),
                tagName: r.tagName,
                data: Oe(r),
            };
            return (
                [...r.childNodes].forEach((i) => {
                    i instanceof HTMLElement
                        ? n.children.push(t(i))
                        : i instanceof Text &&
                          n.children.push({
                              type: 'text',
                              textContent: i.textContent || '',
                          });
                }),
                n
            );
        };
        return t(e);
    },
    dr = async () => {
        await St();
        let e = co(document.querySelector('#root'));
        D({ type: 'COMPONENT_TREE', payload: { tree: e } });
    };
var ur = () => {
    window.addEventListener(
        'keydown',
        (e) => {
            let t = [];
            e.metaKey && t.push('Meta'),
                e.ctrlKey && t.push('Ctrl'),
                e.altKey && t.push('Alt'),
                e.shiftKey && t.push('Shift');
            let r =
                    e.key !== 'Meta' &&
                    e.key !== 'Control' &&
                    e.key !== 'Alt' &&
                    e.key !== 'Shift'
                        ? e.key
                        : '',
                o = [...t, r].filter(Boolean).join('+');
            ['Meta+z', 'Meta+Backspace', 'Meta+d'].includes(o) &&
                e.preventDefault(),
                o &&
                    D({
                        type: 'KEYBIND',
                        payload: {
                            compositeKey: o,
                            rawEvent: {
                                key: e.key,
                                code: e.code,
                                metaKey: e.metaKey,
                                ctrlKey: e.ctrlKey,
                                altKey: e.altKey,
                                shiftKey: e.shiftKey,
                            },
                            timestamp: Date.now(),
                        },
                    });
        },
        { passive: !0 }
    );
};
window.LOV_SELECTOR_SCRIPT_VERSION = '1.0.6';
var Re = (e) =>
        e.hasAttribute('data-lov-id') || e.hasAttribute('data-component-path'),
    Ct = ({ filePath: e, lineNumber: t, col: r }) => `${e}:${t}:${r || 0}`,
    fr = (e) => {
        if (!e) return {};
        let [t, r, o] = e.split(':');
        return {
            filePath: t,
            lineNumber: parseInt(r || '0', 10),
            col: parseInt(o || '0', 10),
        };
    },
    te = (e) => {
        let t = e.getAttribute('data-lov-id') || '';
        if (t) {
            let { filePath: n, lineNumber: i, col: l } = fr(t);
            return { filePath: n || '', lineNumber: i || 0, col: l || 0 };
        }
        let r = e.getAttribute('data-component-path') || '',
            o = e.getAttribute('data-component-line') || '';
        return { filePath: r || '', lineNumber: parseInt(o, 10) || 0, col: 0 };
    },
    Oe = (e) => {
        let t = e.getAttribute('data-lov-id') || '',
            { filePath: r, lineNumber: o, col: n } = fr(t),
            i = e.tagName.toLowerCase(),
            l = e.getAttribute('data-component-content') || null,
            a = Array.from(e.children)
                .filter((s) => Re(s) && te(s).filePath !== r)
                .filter(
                    (s, c, d) =>
                        c ===
                        d.findIndex((f) => te(f).filePath === te(s).filePath)
                )
                .map((s) => ({
                    id: s.getAttribute('data-lov-id') || '',
                    filePath: te(s).filePath,
                    fileName: te(s).filePath?.split?.('/').pop() || '',
                    lineNumber: te(s).lineNumber,
                    col: te(s).col,
                    elementType: s.tagName.toLowerCase(),
                    content: s.getAttribute('data-component-content') || '',
                    className: s.getAttribute('class') || '',
                    textContent: s.innerText,
                    attrs: { src: s.getAttribute('src') || '' },
                }));
        return {
            id: e.getAttribute('data-lov-id') || '',
            filePath: te(e).filePath,
            fileName: te(e).filePath?.split?.('/').pop() || '',
            lineNumber: te(e).lineNumber,
            col: te(e).col,
            elementType: i,
            content: l || '',
            children: a,
            className: e.getAttribute('class') || '',
            textContent: e.innerText,
            attrs: { src: e.getAttribute('src') || '' },
        };
    },
    pr = () => {
        class e {
            constructor() {
                (this.hoveredElement = null),
                    (this.isActive = !1),
                    (this.tooltip = null),
                    (this.selectedTooltips = new Map()),
                    (this.clickedElementMap = new Map()),
                    (this.scrollTimeout = null),
                    (this.mouseX = 0),
                    (this.mouseY = 0),
                    (this.styleElement = null);
            }
            reset() {
                (this.hoveredElement = null),
                    (this.scrollTimeout = null),
                    this.selectedTooltips.forEach((C) => C.remove()),
                    this.selectedTooltips.clear();
            }
        }
        let t = new e(),
            r = (u, C) => {
                let v = null;
                return (...h) => {
                    v && clearTimeout(v), (v = setTimeout(() => u(...h), C));
                };
            };
        ur();
        let o = () => {
                (t.tooltip = document.createElement('div')),
                    (t.tooltip.className = 'gpt-selector-tooltip'),
                    t.tooltip.setAttribute('role', 'tooltip'),
                    document.body.appendChild(t.tooltip);
                let u = document.createElement('style');
                (u.textContent = `
        .gpt-selector-tooltip {
          position: fixed;
          z-index: ${b.Z_INDEX};
          pointer-events: none;
          background-color: ${b.HIGHLIGHT_COLOR};
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: bold;
          line-height: 1;
          white-space: nowrap;
          display: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: opacity 0.2s ease-in-out;
          margin: 0;
        }
        .gpt-selected-tooltip {
          position: fixed;
          z-index: ${b.Z_INDEX};
          pointer-events: none;
          background-color: ${b.HIGHLIGHT_COLOR};
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: bold;
          line-height: 1;
          white-space: nowrap;
          display: block;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          opacity: 0.8;
          margin: 0;
          border: 1px solid rgba(255,255,255,0.3);
        }
        [${b.HOVERED_ATTR}] {
          position: relative;
        }
        [${b.HOVERED_ATTR}]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          outline: 1px dashed ${b.HIGHLIGHT_COLOR} !important;
          outline-offset: ${b.HIGHLIGHT_STYLE.NORMAL.OFFSET} !important;
          background-color: ${b.HIGHLIGHT_BG} !important;
          z-index: ${b.Z_INDEX};
          pointer-events: none;
        }

        [${b.SELECTED_ATTR}] {
          position: relative;
        }
        [${b.SELECTED_ATTR}]::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          outline: 1px dashed ${b.HIGHLIGHT_COLOR} !important;
          outline-offset: 3px !important;
          transition: outline-offset 0.2s ease-in-out;
          z-index: ${b.Z_INDEX};
          pointer-events: none;
        }

        [${b.SELECTED_ATTR}][contenteditable] {
          outline: none !important;
        }

        [${b.HOVERED_ATTR}][data-full-width]::before,
        [${b.SELECTED_ATTR}][data-full-width]::before {
          outline-offset: ${b.HIGHLIGHT_STYLE.FULL_WIDTH.OFFSET} !important;
        }
      `),
                    document.head.appendChild(u);
            },
            n = (u, C) => {
                let v = document.createElement('div');
                return (
                    (v.className = 'gpt-selected-tooltip'),
                    v.setAttribute('role', 'tooltip'),
                    document.body.appendChild(v),
                    i(v, u),
                    t.selectedTooltips.set(C, v),
                    v
                );
            },
            i = (u, C) => {
                if (!(!u || !C))
                    try {
                        let v = C.getBoundingClientRect(),
                            h = C.tagName.toLowerCase(),
                            E = Math.abs(v.width - window.innerWidth) < 5;
                        if (
                            ((u.style.maxWidth = `${b.MAX_TOOLTIP_WIDTH}px`), E)
                        )
                            (u.style.left = b.FULL_WIDTH_TOOLTIP_OFFSET),
                                (u.style.top = b.FULL_WIDTH_TOOLTIP_OFFSET);
                        else {
                            let A = Math.max(0, v.top - b.TOOLTIP_OFFSET);
                            (u.style.left = `${Math.max(0, v.left)}px`),
                                (u.style.top = `${A}px`);
                        }
                        u.textContent = h;
                    } catch (v) {
                        console.error('Error updating selected tooltip:', v),
                            u.remove();
                    }
            },
            l = (u) => {
                if (!(!t.tooltip || !u))
                    try {
                        let C = u.getBoundingClientRect(),
                            v = u.tagName.toLowerCase(),
                            h = Math.abs(C.width - window.innerWidth) < 5;
                        if (
                            ((t.tooltip.style.maxWidth = `${b.MAX_TOOLTIP_WIDTH}px`),
                            h)
                        )
                            (t.tooltip.style.left =
                                b.FULL_WIDTH_TOOLTIP_OFFSET),
                                (t.tooltip.style.top =
                                    b.FULL_WIDTH_TOOLTIP_OFFSET);
                        else {
                            let E = Math.max(0, C.top - b.TOOLTIP_OFFSET);
                            (t.tooltip.style.left = `${Math.max(0, C.left)}px`),
                                (t.tooltip.style.top = `${E}px`);
                        }
                        t.tooltip.textContent = v;
                    } catch (C) {
                        console.error('Error updating tooltip:', C), m();
                    }
            },
            a = (u) => {
                let C =
                    Math.abs(
                        u.getBoundingClientRect().width - window.innerWidth
                    ) < 5;
                u.setAttribute(b.HOVERED_ATTR, 'true'),
                    C && u.setAttribute('data-full-width', 'true');
            },
            s = (u) => {
                u.removeAttribute(b.HOVERED_ATTR),
                    u.removeAttribute('data-full-width'),
                    (u.style.cursor = '');
            },
            c = (u) => {
                let C = u.tagName.toLowerCase() === 'svg',
                    v = u.closest('svg') !== null;
                return !C && v;
            },
            d = r((u) => {
                if (
                    !t.isActive ||
                    !Re(u.target) ||
                    u.target.tagName.toLowerCase() === 'html' ||
                    c(u.target)
                )
                    return;
                t.hoveredElement &&
                    y(te(t.hoveredElement)).forEach((h) => {
                        h.classList.contains('gpt-selected-element') || s(h);
                    }),
                    (t.hoveredElement = u.target),
                    (t.hoveredElement && y(te(t.hoveredElement)))?.forEach(
                        (v) => {
                            v.classList.contains('gpt-selected-element') ||
                                a(v);
                        }
                    ),
                    l(t.hoveredElement),
                    t.tooltip &&
                        ((t.tooltip.style.display = 'block'),
                        (t.tooltip.style.opacity = '1'));
            }, b.DEBOUNCE_DELAY),
            f = r(() => {
                t.isActive &&
                    (t.hoveredElement &&
                        ((t.hoveredElement && y(te(t.hoveredElement)))?.forEach(
                            (C) => {
                                C.removeAttribute(b.HOVERED_ATTR),
                                    C.hasAttribute(b.SELECTED_ATTR) || s(C);
                            }
                        ),
                        (t.hoveredElement = null)),
                    m());
            }, b.DEBOUNCE_DELAY),
            m = () => {
                t.tooltip &&
                    ((t.tooltip.style.opacity = '0'),
                    (t.tooltip.style.display = 'none'));
            },
            g = () => {
                t.scrollTimeout && clearTimeout(t.scrollTimeout),
                    m(),
                    t.isActive && D({ type: 'SCROLL_HAPPENED', payload: {} }),
                    t.selectedTooltips.forEach((u, C) => {
                        let v = t.clickedElementMap.get(C);
                        if (v && document.contains(v)) i(u, v);
                        else {
                            let [h, E, A] = C.split(':'),
                                L = y({
                                    filePath: h,
                                    lineNumber: parseInt(E),
                                    col: parseInt(A) || 0,
                                });
                            L.length > 0 && i(u, L[0]);
                        }
                    }),
                    t.hoveredElement &&
                        !t.hoveredElement.classList.contains(
                            'gpt-selected-element'
                        ) &&
                        s(t.hoveredElement),
                    (t.scrollTimeout = setTimeout(() => {
                        t.scrollTimeout = null;
                        let u = document.elementFromPoint(t.mouseX, t.mouseY);
                        u && t.isActive && d({ target: u });
                    }, b.SCROLL_DEBOUNCE));
            },
            p = (u) => {
                t.isActive &&
                    u.target &&
                    u.target instanceof HTMLElement &&
                    ['input', 'textarea', 'select'].includes(
                        u.target.tagName.toLowerCase()
                    ) &&
                    u.preventDefault();
            },
            S = (u) => {
                if (t.isActive)
                    return u.preventDefault(), u.stopPropagation(), !1;
            },
            k = () => {
                document.addEventListener('mouseover', d),
                    document.addEventListener('mouseout', f),
                    document.addEventListener('click', x, !0),
                    document.addEventListener('dblclick', j, !0),
                    window.addEventListener('scroll', g, { passive: !0 }),
                    window.addEventListener('resize', T, { passive: !0 }),
                    document.addEventListener('mousedown', p, !0);
                let u = document.createElement('style');
                (u.textContent = `
        * {
          scroll-behavior: auto !important;
        }
      `),
                    document.head.appendChild(u),
                    (t.styleElement = u),
                    document.addEventListener('click', S, !0),
                    document.addEventListener('submit', S, !0),
                    document.addEventListener('touchstart', S, !0),
                    document.addEventListener('touchend', S, !0);
            },
            T = () => {
                t.selectedTooltips.forEach((u, C) => {
                    let v = t.clickedElementMap.get(C);
                    if (v && document.contains(v)) i(u, v);
                    else {
                        let [h, E, A] = C.split(':'),
                            L = y({
                                filePath: h,
                                lineNumber: parseInt(E),
                                col: parseInt(A) || 0,
                            });
                        L.length > 0 && i(u, L[0]);
                    }
                });
            },
            I = () => {
                document.removeEventListener('mouseover', d),
                    document.removeEventListener('mouseout', f),
                    document.removeEventListener('click', x),
                    window.removeEventListener('scroll', g),
                    window.removeEventListener('resize', T),
                    document.removeEventListener('mousedown', p, !0),
                    document.removeEventListener('click', S, !0),
                    document.removeEventListener('submit', S, !0),
                    document.removeEventListener('touchstart', S, !0),
                    document.removeEventListener('touchend', S, !0),
                    t.styleElement &&
                        (t.styleElement.remove(), (t.styleElement = null)),
                    t.selectedTooltips.forEach((u) => u.remove()),
                    t.selectedTooltips.clear(),
                    (document.body.style.cursor = ''),
                    (document.body.style.userSelect = ''),
                    (document.body.style.msUserSelect = ''),
                    (document.body.style.mozUserSelect = ''),
                    t.hoveredElement &&
                        (t.hoveredElement.hasAttribute(b.SELECTED_ATTR) ||
                            s(t.hoveredElement),
                        (t.hoveredElement = null)),
                    m();
            },
            y = (u) => {
                let C = `[data-lov-id="${u.filePath}:${u.lineNumber}:${
                        u.col || '0'
                    }"]`,
                    v = document.querySelectorAll(C);
                if (v.length > 0) return v;
                let h = `[data-component-path="${u.filePath}"][data-component-line="${u.lineNumber}"]`;
                return document.querySelectorAll(h);
            },
            R = (u) => {
                try {
                    if (
                        !u?.origin ||
                        !u?.data?.type ||
                        !b.ALLOWED_ORIGINS.includes(u.origin)
                    )
                        return;
                    switch (u.data.type) {
                        case 'TOGGLE_SELECTOR':
                            let C = !!u.data.payload.isActive;
                            t.isActive !== C &&
                                ((t.isActive = C),
                                t.isActive
                                    ? (k(),
                                      et().then(() => {
                                          document
                                              .querySelectorAll(
                                                  'button[disabled]'
                                              )
                                              .forEach((h) => {
                                                  h.removeAttribute('disabled'),
                                                      h.setAttribute(
                                                          'data-lov-disabled',
                                                          ''
                                                      );
                                              });
                                      }))
                                    : (I(),
                                      document
                                          .querySelectorAll(
                                              '[data-lov-disabled]'
                                          )
                                          .forEach((E) => {
                                              E.removeAttribute(
                                                  'data-lov-disabled'
                                              ),
                                                  E.setAttribute(
                                                      'disabled',
                                                      ''
                                                  );
                                          }),
                                      document
                                          .querySelectorAll(
                                              `[${b.HOVERED_ATTR}], [data-full-width]`
                                          )
                                          .forEach((E) => {
                                              E.hasAttribute(b.SELECTED_ATTR) ||
                                                  (s(E),
                                                  E instanceof HTMLElement &&
                                                      (E.style.cursor = ''));
                                          }),
                                      t.reset()));
                            break;
                        case 'UPDATE_SELECTED_ELEMENTS':
                            if (!Array.isArray(u.data.payload)) {
                                console.error(
                                    'Invalid payload for UPDATE_SELECTED_ELEMENTS'
                                );
                                return;
                            }
                            t.selectedTooltips.forEach((h) => h.remove()),
                                t.selectedTooltips.clear(),
                                document
                                    .querySelectorAll(
                                        `[${b.SELECTED_ATTR}], [${b.HOVERED_ATTR}]`
                                    )
                                    .forEach((h) => {
                                        h.removeAttribute(b.SELECTED_ATTR),
                                            h.removeAttribute(b.HOVERED_ATTR),
                                            h.removeAttribute(
                                                'data-full-width'
                                            );
                                    }),
                                u.data.payload.forEach((h) => {
                                    if (!h?.filePath || !h?.lineNumber) {
                                        console.error(
                                            'Invalid element data:',
                                            h
                                        );
                                        return;
                                    }
                                    let E = Ct({
                                            filePath: h.filePath,
                                            lineNumber: h.lineNumber,
                                            col: h.col,
                                        }),
                                        A = y({
                                            filePath: h.filePath,
                                            lineNumber: h.lineNumber,
                                            col: h.col,
                                        });
                                    A.forEach((V) => {
                                        V.setAttribute(b.SELECTED_ATTR, 'true'),
                                            Math.abs(
                                                V.getBoundingClientRect()
                                                    .width - window.innerWidth
                                            ) < 5 &&
                                                V.setAttribute(
                                                    'data-full-width',
                                                    'true'
                                                );
                                    });
                                    let L = t.clickedElementMap.get(E),
                                        W;
                                    if (L && document.contains(L)) W = L;
                                    else if (A.length > 0) W = A[0];
                                    else return;
                                    n(W, E);
                                });
                            break;
                        case 'GET_SELECTOR_STATE':
                            D({
                                type: 'SELECTOR_STATE_RESPONSE',
                                payload: { isActive: t.isActive },
                            });
                            break;
                        case 'SET_ELEMENT_CONTENT':
                            {
                                let { id: h, content: E } = u.data.payload;
                                y({
                                    filePath: h.filePath,
                                    lineNumber: h.lineNumber,
                                    col: h.col,
                                }).forEach((L) => {
                                    L.innerHTML = E;
                                });
                            }
                            break;
                        case 'SET_ELEMENT_ATTRS':
                            {
                                let { id: h, attrs: E } = u.data.payload,
                                    A = y({
                                        filePath: h.filePath,
                                        lineNumber: h.lineNumber,
                                        col: h.col,
                                    });
                                A.forEach((V) => {
                                    Object.keys(E).forEach((z) => {
                                        V.setAttribute(z, E[z]);
                                    });
                                });
                                let L = Ct({
                                        filePath: h.filePath,
                                        lineNumber: h.lineNumber,
                                        col: h.col,
                                    }),
                                    W = t.selectedTooltips.get(L);
                                if (W) {
                                    let V = t.clickedElementMap.get(L);
                                    V && document.contains(V)
                                        ? i(W, V)
                                        : A.length > 0 && i(W, A[0]);
                                }
                            }
                            break;
                        case 'DUPLICATE_ELEMENT_REQUESTED': {
                            let { id: h } = u.data.payload;
                            y({
                                filePath: h.filePath,
                                lineNumber: h.lineNumber,
                                col: h.col,
                            }).forEach((A) => {
                                let L = A.cloneNode(!0);
                                L.setAttribute('data-lov-id', 'x'),
                                    L.setAttribute('data-lov-tmp', 'true'),
                                    A.parentElement?.appendChild(L);
                            });
                            break;
                        }
                        case 'SET_STYLESHEET': {
                            let { stylesheet: h } = u.data.payload,
                                E = document.getElementById(
                                    b.OVERRIDE_STYLESHEET_ID
                                );
                            if (E) E.innerHTML = h;
                            else {
                                let A =
                                        document.getElementsByTagName(
                                            'head'
                                        )[0],
                                    L = document.createElement('style');
                                (L.id = b.OVERRIDE_STYLESHEET_ID),
                                    (L.innerHTML = h),
                                    A.appendChild(L);
                            }
                            break;
                        }
                        case 'EDIT_TEXT_REQUESTED': {
                            let { id: h } = u.data.payload;
                            y({
                                filePath: h.filePath,
                                lineNumber: h.lineNumber,
                                col: h.col,
                            }).forEach((A) => {
                                if (!(A instanceof HTMLElement)) return;
                                A.setAttribute('contenteditable', 'true'),
                                    A.focus();
                                let L = () => {
                                        D({
                                            type: 'ELEMENT_TEXT_UPDATED',
                                            payload: {
                                                id: h,
                                                content: A.innerText,
                                            },
                                        });
                                    },
                                    W = () => {
                                        A.removeAttribute('contenteditable'),
                                            A.removeEventListener('input', L),
                                            A.removeEventListener('blur', W);
                                    };
                                A.addEventListener('input', L),
                                    A.addEventListener('blur', W);
                            });
                            break;
                        }
                        case 'HOVER_ELEMENT_REQUESTED': {
                            let { id: h } = u.data.payload;
                            document
                                .querySelectorAll(`[${b.HOVERED_ATTR}]`)
                                .forEach((A) => {
                                    A.removeAttribute(b.HOVERED_ATTR);
                                }),
                                y({
                                    filePath: h.filePath,
                                    lineNumber: h.lineNumber,
                                    col: h.col,
                                }).forEach((A) => {
                                    A.setAttribute(b.HOVERED_ATTR, 'true');
                                });
                            break;
                        }
                        case 'UNHOVER_ELEMENT_REQUESTED': {
                            let { id: h } = u.data.payload;
                            y({
                                filePath: h.filePath,
                                lineNumber: h.lineNumber,
                                col: h.col,
                            }).forEach((A) => {
                                A.removeAttribute(b.HOVERED_ATTR);
                            });
                            break;
                        }
                        case 'GET_PARENT_ELEMENT': {
                            let { id: h } = u.data.payload,
                                L = y({
                                    filePath: h.filePath,
                                    lineNumber: h.lineNumber,
                                    col: h.col,
                                })[0].parentElement;
                            !L ||
                            L.id === 'root' ||
                            ['HTML', 'BODY'].includes(L.tagName)
                                ? D({ type: 'PARENT_ELEMENT', payload: null })
                                : D({ type: 'PARENT_ELEMENT', payload: Oe(L) });
                            break;
                        }
                        case 'REQUEST_COMPONENT_TREE':
                            dr();
                            break;
                        default:
                            console.warn('Unknown message type:', u.data.type);
                    }
                } catch (C) {
                    console.error('Error handling message:', C), I(), t.reset();
                }
            },
            J = (u) => {
                (t.mouseX = u.clientX), (t.mouseY = u.clientY);
            },
            U = () => {
                D({ type: 'REQUEST_PICKER_STATE' }),
                    D({ type: 'REQUEST_SELECTED_ELEMENTS' });
            };
        (() => {
            try {
                o(),
                    window.addEventListener('message', R),
                    document.addEventListener('mousemove', J),
                    D({
                        type: 'SELECTOR_SCRIPT_LOADED',
                        payload: {
                            version: window.LOV_SELECTOR_SCRIPT_VERSION,
                        },
                    }),
                    et().then(() => {
                        U();
                    });
            } catch (u) {
                console.error('Failed to initialize selector script:', u);
            }
        })();
        let x = (u) => {
                if (
                    t.isActive &&
                    !(
                        !Re(u.target) ||
                        u.target.tagName.toLowerCase() === 'html' ||
                        c(u.target)
                    ) &&
                    (u.preventDefault(), u.stopPropagation(), t.hoveredElement)
                ) {
                    let C = Oe(t.hoveredElement),
                        v = t.hoveredElement.getBoundingClientRect(),
                        h = Ct({
                            filePath: C.filePath,
                            lineNumber: C.lineNumber,
                            col: C.col,
                        });
                    t.clickedElementMap.set(h, t.hoveredElement),
                        t.hoveredElement.setAttribute(b.SELECTED_ATTR, 'true'),
                        Math.abs(v.width - window.innerWidth) < 5 &&
                            t.hoveredElement.setAttribute(
                                'data-full-width',
                                'true'
                            ),
                        D({
                            type: 'ELEMENT_CLICKED',
                            rect: v,
                            payload: C,
                            isMultiSelect: u.metaKey || u.ctrlKey,
                        });
                }
            },
            j = (u) => {
                if (
                    !t.isActive ||
                    !Re(u.target) ||
                    u.target.tagName.toLowerCase() === 'html' ||
                    c(u.target)
                )
                    return;
                u.preventDefault(), u.stopPropagation();
                let C = Oe(u.target);
                D({ type: 'ELEMENT_DOUBLE_CLICKED', payload: C });
            };
    };
var uo = () => {
    if (window.location.search.includes('lov-override-script')) {
        let t = 'http://localhost:8001/lovable.js';
        console.log('Overriding lovable.js script with:', t);
        let r = document.createElement('script');
        (r.type = 'module'), (r.src = t), document.body.appendChild(r);
        return;
    }
    if (window.top === window.self) return;
    At(), Et(), lr(), cr(), bt(), vt(), pr();
    let e = ar();
    window.addEventListener('unload', () => {
        e && e();
    });
};
uo();
/*! Bundled license information:

rrweb/es/rrweb/ext/tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
