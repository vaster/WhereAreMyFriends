/// <reference path="../scripts/app.js" />
/// <reference path="../kendo/js/jquery.min.js" />
/// <reference path="../kendo/js/kendo.all.min.js" />
/// <reference path="../kendo/js/kendo.mobile.min.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../scripts/app.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../google-manager/map.js" />

// friends location view model
(function () {
    var viewModel = kendo.observable({
        data: [],
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel)

        app.httpRequester.get("http://localhost:28975/api/users/getFriends?sessionKey=" + app.event.sessionKey)
            .then(function (friendsList) {
                // success
                var position = {
                    coords: {
                        latitude: '',
                        longitude: '',
                    },
                };

                position.coords.latitude = friendsList[0].Location.Lathitude;
                position.coords.longitude = friendsList[0].Location.Longitude;

                app.googleMap.initMap(position, "FrLoc", 12);

                navigator.geolocation.getCurrentPosition(function (position) {
                    app.googleMap.placeMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        "http://maps.google.com/mapfiles/ms/icons/blue-dot.png","You're here");
                })

                for (var i = 0; i < friendsList.length; i++) {
                    var currFriendPosition = {
                        coords: {
                            latitude: friendsList[i].Location.Lathitude,
                            longitude: friendsList[i].Location.Longitude,
                        },
                    };
                    var currContent = friendsList[i].Location.Description;
                    
                    app.googleMap.placeMarker(new google.maps.LatLng(currFriendPosition.coords.latitude, currFriendPosition.coords.longitude),
                        "http://maps.google.com/mapfiles/ms/icons/red-dot.png", currContent);
                }
            },
        function (err) {
            var er = err;
            // on error
        });
    }

    app.friends = {
        init: init,
    }
})();
