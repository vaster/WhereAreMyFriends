/// <reference path="../cordova.android.js" />
/// <reference path="../cordova.ios.js" />
/// <reference path="../kendo/js/kendo.all.min.js" />
/// <reference path="../kendo/js/jquery.min.js" />
var app = new kendo.mobile.Application(document.body, { transition: "slide" });

(function () {
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        //// find all contacts with 'Bob' in any name field
        //var options = new ContactFindOptions();
        //options.filter = "Bob";
        //var fields = ["displayName", "name"];
        //navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Get a snapshot of the current contacts

    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            console.log("Display Name = " + contacts[i].displayName);
        }
    }

    // onError: Failed to get the contacts

    function onError(contactError) {
        alert('onError!');
    }

})();