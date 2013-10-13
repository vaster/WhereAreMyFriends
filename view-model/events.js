/// <reference path="../kendo/js/jquery.min.js" />
/// <reference path="../kendo/js/kendo.all.min.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../kendo/js/kendo.mobile.min.js" />
/// <reference path="../scripts/app.js" />

// events view model
(function () {
    var sessionKey = '';
    var viewModel = kendo.observable({
        latestEvents: [],
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        app.httpRequester.get("http://localhost:28975/api/users/getFriends?sessionKey=" + app.event.sessionKey)
            .then(function (latestEvents) {
                viewModel.set("latestEvents", latestEvents);
                //console.log(latestEvents);
                //console.log(viewModel.latestEvents);
            });
    }

    app.event = {
        init: init,
        sessionKey: sessionKey,
    };
})();
