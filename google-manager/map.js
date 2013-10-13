// google map manager
app.googleMap = (function () {
    var map = {};

    // google map inti
    function initMap(position, idInditificator, zoom) {
        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas" + idInditificator),
            mapOptions);

        //var infowindow = new google.maps.InfoWindow();
    }
    
    // marker init
    function placeMarker(location, icon,content) {
        var marker = new google.maps.Marker({
            icon:icon,
            position: location,
            map: map,
        });
        var infowindow = new google.maps.InfoWindow();
        infowindow.open(map, marker);
        infowindow.setContent(content);
    }

    return {
        initMap: initMap,
        placeMarker: placeMarker,
    };
})();


