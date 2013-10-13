/// <reference path="../libs/rsvp.min.js" />
/// <reference path="../kendo/js/jquery.min.js" />

// api consumer
app.httpRequester = (function () {
    function get(url) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                timeout: 5000,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                },
            })
        });

        return promise;
    }
    function post(url, data) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: data,
                timeout: 5000,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                },
            })
        });

        return promise;
    }
    function put(url, data) {
        var promise = new RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "PUT",
                dataType: "json",
                contentType: "application/json",
                // "{username:" + 'a' + "," + "cryptpass:" + 'b' + "}";
                data: data,
                timeout: 5000,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            })
        });

        return promise;
    }

    return {
        get: get,
        post: post,
        put: put,
    };
})();