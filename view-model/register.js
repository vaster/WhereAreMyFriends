/// <reference path="../kendo/js/jquery.min.js" />
/// <reference path="../kendo/js/kendo.all.min.js" />
/// <reference path="../ajaxClient/httpRequester.js" />
/// <reference path="../scripts/app.js" />
/// <reference path="../libs/core-min.js" />
/// <reference path="../libs/hash.js" />
/// <reference path="../libs/sha1.js" />

// register view model
(function () {
    // definition of observbale fields to bind with the view
    var viewModel = kendo.observable({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        password: '',
        repeatPassword: '',
        register: register,
        goToSignIn: goToSignIn,
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
    }

    function register(e) {

        // TODO: validation of the data

        var cryptpass = Crypto.SHA1(viewModel.password);

        // hardcoded data -> no access to the contatcs api in simulator
        var contacts = "[" + "\"1" + "\"," + "\"1\"" + "]";


        var data = "{" +
            "firstName:" + "\"" + viewModel.firstName + "\"," +
            "lastName:" + "\"" + viewModel.lastName + "\"," +
            "userName:" + "\"" + viewModel.username + "\"," +
            "phonenumber:" + "\"" + viewModel.phoneNumber + "\"," +
            "cryptpass:" + "\"" + cryptpass + "\"," +
            "contacts:" + contacts + "}";


        app.httpRequester.post("http://localhost:28975/api/users/register", data);

    }

    function goToSignIn() {
        app.navigate("index.html");
    }

    app.register = {
        init: init
    };

})();
