;(function (window, document, undefined) {

    "use strict";

    window.Slavunya = new function Slavunya() {

        /**
         * Private variables
         */
        var cookies = {};


        /**
         * Adding external tools
         *
         * @name initTool
         *
         * @param {string} name - Tool name
         * @param generator {function} - Generator function, must return function
         *
         * @returns Slavunya
         */
        this.__defineGetter__("initTool", function () {
            var self = this;

            function initTool(name, generator) {
                self.__defineGetter__.apply(self, arguments);

                return self;
            }

            return initTool;
        });


        this.__defineGetter__("regExp", function () {

            var regExps = {
                phone: [
                    /^((?:\+7|8)\s*(?:\((\d{3})\)|(\d{3})))?\s*(\d{3}[\s-]?\d{2}[\s-]?\d{2})$/
                ]
            };

            function regExp(type, testString) {

                var regExp, result = undefined;

                if (!type || !regExps[type]) {
                    return result;
                }


                if (testString) {
                    for (regExp in regExps[type]) {
                        if (result = testString.match(regExps[type][regExp])) {
                            return result;
                        }
                    }
                    return undefined;
                }


                return regExps[type];

            }

            return regExp;

        });

        this.__defineGetter__("getRGB", function () {

            function getRGB(color) {
                var result;

                if (color && isArray(color) && color.length == 3) {
                    return color;
                }

                if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
                    return [
                        parseInt(result[1]),
                        parseInt(result[2]),
                        parseInt(result[3])
                    ];
                }

                if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) {
                    return [
                        parseFloat(result[1]) * 2.55,
                        parseFloat(result[2]) * 2.55,
                        parseFloat(result[3]) * 2.55
                    ];
                }

                if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) {
                    return [
                        parseInt(result[1], 16),
                        parseInt(result[2], 16),
                        parseInt(result[3], 16)
                    ];
                }
                if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) {
                    return [
                        parseInt(result[1] + result[1], 16),
                        parseInt(result[2] + result[2], 16),
                        parseInt(result[3] + result[3], 16)
                    ];
                }
            }

            return getRGB;

        });

        this.__defineGetter__("cookies", function () {

            function parseCookies() {
                cookies = {};
                var ca  = document.cookie.split(";");
                var re  = /^[\s]*([^\s]+?)$/i;
                for (var i = 0, l = ca.length; i < l; i++) {
                    var c = ca[i].split("=");
                    if (c.length == 2) {
                        cookies[c[0].match(re)[1]] = unescape(c[1].match(re) ? c[1].match(re)[1] : "");
                    }
                }
            }

            function cookies(name, value, days, secure) {

                var expires,
                    domain;

                if (!value) {
                    parseCookies();

                    return name ? cookies[name] : cookies;
                }

                expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1e3));
                    expires = "; expires=" + date.toGMTString();
                }
                domain          = window.location.hostname;
                document.cookie = (""
                    + name + "=" + escape(value)
                    + expires
                    + "; path=/" + (domain ? "; domain=." + domain : "") + ((secure && locProtocol == "https:") ? "; secure" : "")
                );

            }

            return cookies;

        });


        this.__defineGetter__("math", function () {
            return function (number) {
                var math = this.math,
                    fn   = {
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
                            var e = Math.pow(10, right || 1),
                                res;

                            res = number / e;
                            res = res - Math.floor(res);
                            res *= e;

                            return Math.round(res);
                        },

                        "declination": function (words) {
                            var a = this.right(1),
                                b = this.right(2);

                            if (a == 1 && !math(b).between(10, 20)) {
                                return words[0];
                            } else if (math(a).in(2, 3, 4) && !math(b).between(10, 20)) {
                                return words[1];
                            } else {
                                return words[2];
                            }
                        }
                    };

                return fn;
            }
        });


        /**
         * Get url Search and Hash params
         *
         * @name urlParams
         *
         * @param {string} [name] - Parameter name
         *
         * @returns {string|boolean|number|object} - Parameter by name or object of all parameters
         */
        this.__defineGetter__("urlParams", function () {

            function urlParams(name) {
                var res = {},
                    loc = location.href;

                loc
                    .slice(loc.indexOf("?") + 1)
                    .replace(/[?#]/, "&")
                    .split("&")
                    .forEach(function (elem) {
                        elem = elem.split("=");

                        res[elem[0]] = elem[1] || true;
                    });

                return name ? res[name] || null : res;
            }

            return urlParams;

        });

    };

})(window, document, undefined);
