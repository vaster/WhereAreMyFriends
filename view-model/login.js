/// <reference path="../kendo/js/jquery.min.js" />
/// <reference path="../kendo/js/kendo.all.min.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../scripts/app.js" />

// login view model
(function () {
    // observable object definition - expose all to the view from here
    var viewModel = kendo.observable({
        username: '',
        password: '',
        signUp: signUp,
        goToRegister: goToRegister
    });

    // init fuction to make the binding to the view
    function init(e) {
        kendo.bind(e.view.element, viewModel);
    }

    function signUp(e) {
        var usn = viewModel.username;
        var cryptpass = Crypto.SHA1(viewModel.password);
        var data = "{username:" + "'" + usn + "'" + "," + "cryptpass:" + "'" + cryptpass + "'" + "}";

        app.httpRequester.put("http://localhost:28975/api/users/login", data)
            .then(function (sessionKey) {
                app.event.sessionKey = sessionKey;
                app.navigate("view/events.html");
        });
    }

    function goToRegister(e) {
        app.navigate("view/register.html");
    }

    app.login = {
        init: init
    };
})();
