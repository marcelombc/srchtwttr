(function ($, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('jquery', factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory($);
    } else {
        // Browser globals (with support for web workers)
        var glob;
        try {
            glob = window;
        } catch (e) {
            glob = self;
        }

        glob.Srchtwttr = factory($);
    }
}(jQuery, function ($, undefined) {

    'use strict';

    // private variables
    var interval,
        req,
        url = 'http://search.twitter.com/search.json',
        query,
        callback,
        options = {
            refreshInterval: null
        };

    /**
     * @constructor Srchtwttr
     */
    var Srchtwttr = function (qry, clbk, opt) {
        query = qry;
        callback = clbk;
        options = $.extend({}, options, opt);

        search();
        if (options.refreshInterval) refresh();
    };

    // PUBLIC METHODS

    /**
     *
     */
    Srchtwttr.prototype.destroy = function () {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }

        if (req) {
            req.abort();
            req = null;
        }
    };

    // PRIVATE METHODS

    /**
     *
     */
    function search() {
        var self = this,
            results;

        req = request()
            .done(function (data) {
                results = data.results;
                callback.call(self, null, results);
            })
            .fail(function (error) {
                callback.call(self, error);
            });
    }

    /**
     *
     */
    function refresh() {
        interval = setInterval(function () {
            search();
        }, options.refreshInterval);
    }

    /**
     *
     */
    function request() {
        return $.ajax({
            url: url,
            data: { q: query },
            dataType: 'jsonp'
        });
    }

    return Srchtwttr;
}));
