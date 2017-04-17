;(function (window, document, undefined) {
    function Slavunya() {
        var debug = false,
            logs = {},
            Cookies = new function Cookies() {
                this.__proto__ = {
                    __init: function () {
                        var ca = document.cookie.split(';'),
                            re = /^[\s]*([^\s]+?)$/i,
                            i, l;

                        for (i = 0, l = ca.length; i < l; i++) {
                            var c = ca[i].split('=');
                            if (c.length == 2) {
                                this[c[0].match(re)[1]] = unescape(c[1].match(re) ? c[1].match(re)[1] : '');
                            }
                        }
                    },
                    __get: function (name) {
                        this.__init();
                        return name ? this[name] || null : this;
                    },
                    __set: function (name, value, days, secure) {
                        var expires,
                            domain,
                            locProtocol;

                        expires = '';
                        if (days) {
                            var date = new Date();
                            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1e3));
                            expires = '; expires=' + date.toGMTString();
                        }
                        domain = window.location.hostname;
                        locProtocol = window.location.protocol;

                        document.cookie = (''
                            + name + '=' + escape(value)
                            + expires
                            + '; path=/' + (domain ? '; domain=.' + domain : '') + (secure && locProtocol == 'https:' ? '; secure' : '')
                        );
                    }
                };
            },
            Math = function Math(number) {
                if (!(this instanceof Math)) {
                    return new Math(number);
                }

                var number = number;

                this.__proto__ = {
                    "in": function (array) {
                        var arr;

                        if (Array.isArray(array)) {
                            arr = array;
                        } else {
                            arr = Array.from(arguments);
                        }

                        return arr.indexOf(number) !== -1;
                    },

                    "between": function (a, b) {
                        return a < number && number < b;
                    },

                    "right": function (right) {
                        var wMath = window.Math,
                            e = wMath.pow(10, right || 1),
                            res;

                        res = number / e;
                        res = res - wMath.floor(res);
                        res *= e;

                        return wMath.round(res);
                    },

                    "declination": function (words) {
                        var a = this.right(1),
                            b = this.right(2);

                        if (a == 1 && !Math(b).between(10, 20)) {
                            return words[0];
                        } else if (Math(a).in(2, 3, 4) && !Math(b).between(10, 20)) {
                            return words[1];
                        } else {
                            return words[2];
                        }
                    }
                }
            };

        this.__proto__ = {
            cookie: function (name, value, days, secure) {
                return Cookies["__" + (value !== undefined ? "set" : "get")].apply(Cookies, arguments);
            },

            math: Math,

            urlParams: function (name) {
                var res = {},
                    loc = location.href,
                    startPos = loc.indexOf('?') != -1 ? loc.indexOf('?') : loc.indexOf('#') != -1 ? loc.indexOf('#') : false;

                if (startPos !== false) {
                    loc
                        .slice(startPos + 1)
                        .replace(/[?#]/, "&")
                        .split("&")
                        .forEach(function (elem) {
                            elem = elem.split("=");

                            res[elem[0]] = elem[1] || true;
                        });
                }

                return name ? res[name] || null : res;
            },

            defaults: function (obj, def) {
                function req(obj, def) {
                    for (var key in def) {
                        if (obj[key] !== undefined) {
                            if (typeof obj[key] == "object") {
                                req(obj[key], def[key]);
                            }
                        } else {
                            obj[key] = def[key];
                        }
                    }
                }

                req(obj, def);

                return obj;
            },

            getRGB: function (color) {
                var result,
                    returns = {
                        "rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)": function (result) {
                            return [
                                parseInt(result[1]),
                                parseInt(result[2]),
                                parseInt(result[3])
                            ];
                        },

                        "rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)": function (result) {
                            return [
                                parseFloat(result[1]) * 2.55,
                                parseFloat(result[2]) * 2.55,
                                parseFloat(result[3]) * 2.55
                            ];
                        },

                        "#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})": function (result) {
                            return [
                                parseInt(result[1], 16),
                                parseInt(result[2], 16),
                                parseInt(result[3], 16)
                            ];
                        },

                        "#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])": function (result) {
                            return [
                                parseInt(result[1] + result[1], 16),
                                parseInt(result[2] + result[2], 16),
                                parseInt(result[3] + result[3], 16)
                            ];
                        }
                    },
                    regExp;

                if (color && Array.isArray(color) && color.length == 3) {
                    return color;
                }


                for (regExp in returns) {
                    if (result = new RegExp(regExp).exec(color)) {
                        return returns[regExp](result);
                    }
                }
            },

            toCamelCase: function toCamelCase(str, strict) {
                if (strict) {
                    str = str.toLocaleLowerCase();
                }

                return str
                    .split('-')
                    .map(function (word, index) {
                        if (index) {
                            return word
                                .split('')
                                .map(function (char, index) {
                                    if (!index) {
                                        return char
                                            .toLocaleUpperCase();
                                    }
                                    return char;
                                })
                                .join('');
                        }
                        return word;
                    })
                    .join('');
            },

            get logs() {
                return logs;
            },

            get debug() {
                if (!debug) {
                    debug = true;
                    this.log("Slavunya debug mode enabled.")
                }
            },

            log: function () {
                if (debug) {
                    console.log.apply(console, arguments);
                }
                var index = 0;
                while (logs[+(new Date) + " " + index]) {
                    index++;
                }
                logs[+(new Date) + " " + index] = arguments;
            }
        };
    }

    window.Slavunya = new Slavunya;
})(window, document, undefined);
