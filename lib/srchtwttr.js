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

    var url = 'http://search.twitter.com/search.json',
        defaultOptions = {
            refreshInterval: null
        };

    /**
     * @constructor Srchtwttr
     */
    var Srchtwttr = function (query, callback, options) {
        this._query = query;
        this._callback = callback;
        this._options = $.extend({}, defaultOptions, options);

        search.call(this);
        if (this._options.refreshInterval) refresh.call(this);
    };

    // PUBLIC METHODS

    /**
     *
     */
    Srchtwttr.prototype.destroy = function () {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }

        if (this._req) {
            this._req.abort();
            this._req = null;
        }
    };

    // PRIVATE METHODS

    /**
     *
     */
    function search() {
        var self = this,
            results;

        this._req = request.call(this)
            .done(function (data) {
                results = data.results;
                self._callback.call(self, null, results);
            })
            .fail(function (error) {
                self._callback.call(self, error);
            });
    }

    /**
     *
     */
    function refresh() {
        this._interval = setInterval(function () {
            search.call(this);
        }, this._options.refreshInterval);
    }

    /**
     *
     */
    function request() {
        return $.ajax({
            url: url,
            data: { q: this._query },
            dataType: 'jsonp'
        });
    }

    return Srchtwttr;
}));
