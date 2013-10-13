/// <reference path="../scripts/app.js" />
/// <reference path="../kendo/js/jquery.min.js" />
/// <reference path="../kendo/js/kendo.all.min.js" />
/// <reference path="../kendo/js/kendo.mobile.min.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../scripts/app.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../google-manager/map.js" />

// my location view model
(function () {
    var viewModel = kendo.observable({
        description: '',
        shareLocation: shareLocation,

    });

    var _localPostition = {};

    function init(e) {
        kendo.bind(e.view.element, viewModel);

        // get the postion of this device
        navigator.geolocation.getCurrentPosition(function (position) {
            _localPostition = position;

            // success
            app.googleMap.initMap(position, "MyLoc", 16);
            app.googleMap.placeMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                "http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
        },
        function (error) {
            // err
        });
    }

    // share button functionality
    function shareLocation(e) {
        var data = "{" +
            "description:" + "\"" + viewModel.description + "\"," +
            "lathitude:" + "\"" + _localPostition.coords.latitude + "\"," +
            "longitude:" + "\"" + _localPostition.coords.longitude + "\"" +
        "}";
        app.httpRequester.post("http://localhost:28975/api/users/updateLoc?sessionKey=" + app.event.sessionKey, data);

    }

    app.myLocation = {
        init: init,
    };
})();
